import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { site } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ── Simple in-memory rate limit (per server instance) ───────── */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

/* ── Duplicate suppression ───────────────────────────────────
   The send takes a few seconds, so an impatient visitor may click Send
   more than once, or refresh and resubmit. Identical enquiries from the
   same device inside this window are acknowledged but not re-sent, so the
   gym's inbox gets one email per real enquiry. */
const recent = new Map<string, number>();
const DEDUPE_MS = 5 * 60 * 1000;

function isDuplicate(fingerprint: string) {
  const now = Date.now();
  // Drop anything older than the window so the map can't grow forever.
  for (const [k, t] of recent) if (now - t > DEDUPE_MS) recent.delete(k);
  const seen = recent.get(fingerprint);
  recent.set(fingerprint, now);
  return seen !== undefined && now - seen < DEDUPE_MS;
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude cleanup
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this device. Please try again later.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body.name).slice(0, 100);
  const phone = str(body.phone).slice(0, 20);
  const email = str(body.email).slice(0, 120);
  const goal = str(body.goal).slice(0, 60);
  const message = str(body.message).slice(0, 2000);
  const website = str(body.website); // honeypot — real users never fill this

  if (website) {
    // Silently accept so bots don't learn they were caught.
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone || !goal) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in your name, phone number and goal.' },
      { status: 400 },
    );
  }
  if (!/^[\d+\s()-]{8,20}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid phone number.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // Same person, same details, within minutes: acknowledge without re-sending.
  if (isDuplicate(`${ip}|${name}|${phone}|${email}|${goal}|${message}`)) {
    console.info('[enquiry] duplicate suppressed for', ip);
    return NextResponse.json({ ok: true, deduped: true });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, ENQUIRY_TO, ENQUIRY_FROM } =
    process.env;

  // SMTP credentials are added later — until then tell the client to fall back to WhatsApp.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      {
        ok: false,
        code: 'smtp_not_configured',
        error: 'Email is not set up yet. Please send your enquiry on WhatsApp instead.',
      },
      { status: 503 },
    );
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // Port 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = ENQUIRY_TO || site.email;
  const from = ENQUIRY_FROM || SMTP_USER;
  const received = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date());

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '—'],
    ['Goal', goal],
    ['Message', message || '—'],
    ['Received', `${received} IST`],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const telHref = phone.replace(/[^\d+]/g, '');
  const e = escapeHtml;

  // Gold-on-charcoal enquiry card. Built as nested tables with inline styles —
  // Gmail, Outlook and most mobile clients strip <style> blocks and ignore
  // flex/grid, so tables are the only layout that renders reliably.
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Gym Enquiry</title></head>
<body style="margin:0;padding:0;background:#151515;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#151515;padding:40px 15px;">
<tr><td align="center">

<table width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#242424;border-radius:16px;overflow:hidden;">

  <tr><td style="height:5px;background:#d4af37;font-size:0;line-height:0;">&nbsp;</td></tr>

  <tr><td style="padding:30px 32px;background:#1c1c1c;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td>
        <div style="font-size:22px;font-weight:bold;color:#d4af37;letter-spacing:1px;">MUSCLE FITNESS</div>
        <div style="margin-top:6px;color:#999999;font-size:12px;letter-spacing:2px;">FITNESS &bull; STRENGTH &bull; TRANSFORMATION</div>
      </td>
      <td align="right">
        <div style="display:inline-block;padding:7px 12px;border:1px solid #d4af37;border-radius:20px;color:#d4af37;font-size:11px;font-weight:bold;">NEW ENQUIRY</div>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:35px 32px 20px;">
    <div style="color:#d4af37;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Website Lead</div>
    <h1 style="margin:8px 0 0;font-size:28px;line-height:36px;color:#ffffff;">You have a new enquiry</h1>
    <p style="margin:10px 0 0;color:#a5a5a5;font-size:14px;line-height:22px;">A new potential member has submitted an enquiry through your website.</p>
  </td></tr>

  <tr><td style="padding:10px 32px 25px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1b1b1b;border:1px solid #333333;border-radius:12px;">
      <tr><td style="padding:22px;">
        <div style="color:#777777;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Potential Member</div>
        <div style="margin-top:5px;color:#ffffff;font-size:22px;font-weight:bold;">${e(name)}</div>
        <div style="width:45px;height:2px;background:#d4af37;margin:15px 0;"></div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:8px 0;color:#777777;font-size:13px;">PHONE</td>
            <td align="right" style="padding:8px 0;font-size:14px;font-weight:bold;"><a href="tel:${e(telHref)}" style="color:#ffffff;text-decoration:none;">${e(phone)}</a></td>
          </tr>
          ${
            email
              ? `<tr>
            <td style="padding:8px 0;color:#777777;font-size:13px;">EMAIL</td>
            <td align="right" style="padding:8px 0;font-size:13px;font-weight:bold;"><a href="mailto:${e(email)}" style="color:#ffffff;text-decoration:none;">${e(email)}</a></td>
          </tr>`
              : ''
          }
        </table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 32px 25px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#302a18;border:1px solid #6b5820;border-radius:12px;">
      <tr><td style="padding:20px;">
        <div style="color:#a8904a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Fitness Goal</div>
        <div style="margin-top:7px;color:#f5d76e;font-size:20px;font-weight:bold;">${e(goal)}</div>
      </td></tr>
    </table>
  </td></tr>

  ${
    message
      ? `<tr><td style="padding:0 32px 30px;">
    <div style="color:#888888;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">Message</div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1b1b1b;border-left:3px solid #d4af37;border-radius:6px;">
      <tr><td style="padding:18px 20px;color:#dddddd;font-size:15px;line-height:24px;">${e(message).replace(/\n/g, '<br>')}</td></tr>
    </table>
  </td></tr>`
      : ''
  }

  <tr><td style="padding:0 32px 30px;">
    <div style="color:#777777;font-size:12px;">Received on</div>
    <div style="margin-top:5px;color:#cccccc;font-size:13px;">${e(received)} IST</div>
  </td></tr>

  <tr><td style="padding:25px 32px;background:#1c1c1c;border-top:1px solid #333333;text-align:center;">
    <a href="tel:${e(telHref)}" style="display:inline-block;background:#d4af37;color:#151515;text-decoration:none;font-size:14px;font-weight:bold;padding:14px 28px;border-radius:8px;margin:4px;">&#128222; Call Member</a>
    ${
      email
        ? `<a href="mailto:${e(email)}" style="display:inline-block;background:#292929;color:#d4af37;border:1px solid #66551f;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 28px;border-radius:8px;margin:4px;">&#9993; Email Member</a>`
        : ''
    }
  </td></tr>

  <tr><td style="background:#151515;padding:25px 32px;text-align:center;">
    <div style="color:#d4af37;font-size:15px;font-weight:bold;letter-spacing:1px;">MUSCLE FITNESS</div>
    <div style="margin-top:7px;color:#666666;font-size:11px;">Build strength. Build confidence. Build yourself.</div>
    <div style="margin-top:15px;color:#555555;font-size:10px;">&copy; ${new Date().getFullYear()} ${e(site.name)}</div>
    <div style="margin-top:8px;color:#777777;font-size:10px;font-weight:bold;">Powered by <span style="color:#d4af37;">${e(site.poweredBy.name)}</span></div>
  </td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${from}>`,
      to,
      replyTo: email || undefined,
      subject: `New enquiry — ${name} (${goal})`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enquiry] send failed:', err);
    return NextResponse.json(
      {
        ok: false,
        code: 'send_failed',
        error: 'We could not send your enquiry right now. Please try WhatsApp or call us.',
      },
      { status: 502 },
    );
  }
}
