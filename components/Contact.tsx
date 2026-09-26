'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { site, waLink } from '@/config/site';

const goals = [
  'Weight Loss',
  'Muscle Building',
  'Strength Training',
  'Personal Training',
  'General Fitness',
  'Diet & Nutrition',
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    goal: goals[0],
    message: '',
    website: '', // honeypot — hidden from real users
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const whatsappText = () =>
    `Hi ${site.name}, I'd like to enquire.\n\n` +
    `Name: ${form.name || '-'}\n` +
    `Phone: ${form.phone || '-'}\n` +
    `Email: ${form.email || '-'}\n` +
    `Goal: ${form.goal}\n` +
    `Message: ${form.message || '-'}`;

  /** Sends the enquiry to the gym's inbox via the /api/enquiry route. */
  // A ref, not state: it blocks re-entry on the very next click, without
  // waiting for React to re-render and disable the button. The send takes a
  // few seconds, which is long enough for an impatient second or third click.
  const sendingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current) return;
    sendingRef.current = true;
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('sent');
        setForm({ name: '', phone: '', email: '', goal: goals[0], message: '', website: '' });
        return;
      }
      setStatus('error');
      setError(data.error || 'Something went wrong. Please call or WhatsApp us instead.');
    } catch {
      setStatus('error');
      setError('Network problem. Please check your connection, or reach us on WhatsApp.');
    } finally {
      sendingRef.current = false;
    }
  };

  const field =
    'mt-2 w-full rounded-xl border border-line bg-sand px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold';
  const label = 'block text-xs font-semibold uppercase tracking-wider text-muted';

  const cards = [
    {
      icon: Phone,
      title: 'Call Us',
      value: site.phone,
      href: `tel:${site.phoneRaw}`,
      external: false,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: 'Chat with us',
      href: waLink(`Hi, I'd like to know more about ${site.name}.`),
      external: true,
    },
    {
      icon: Mail,
      title: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
  ];

  return (
    <section id="contact" className="section relative">
      <SectionBg src="/images/bg/rack.jpg" opacity="opacity-[0.14]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Visit Or"
          highlight="Message Us"
          subtitle="Walk in for a free tour of the floor, or send an enquiry and we'll reply on WhatsApp."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-panel/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-dark transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-ink">
                  <c.icon size={21} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                    {c.title}
                  </span>
                  <span className="block truncate text-sm font-medium text-ink">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          {/* Address card — sized to its content, not stretched to match the
              taller form column beside it. */}
          <Reveal>
            <div className="glass-card card-sheen overflow-hidden">
              <div className="p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-dark">
                    <MapPin size={21} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-wider text-ink">
                      Our Location
                    </h3>
                    <address className="mt-2 text-sm not-italic leading-relaxed text-muted">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.postalCode}
                    </address>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                      {site.address.landmark}
                    </p>
                  </div>
                </div>

                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-6 w-full text-xs"
                >
                  <Navigation size={15} aria-hidden /> Get Directions
                </a>
              </div>

              <div className="border-t border-line px-7 py-5">
                <a
                  href="#location"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark hover:underline"
                >
                  View map &amp; how to reach us →
                </a>
              </div>
            </div>


            {/* Photo filling the space beside the taller form column. */}
            <figure className="glass-card card-sheen mt-6 overflow-hidden">
              <div className="relative aspect-[3/2]">
                <Image
                  src="/images/contact-training.jpg"
                  alt="A trainer guiding a member through a treadmill session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>

          {/* Enquiry form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card card-sheen relative p-7">
              <h3 className="font-display text-xl uppercase tracking-wider text-ink">
                Send An Enquiry
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Fill this in and it lands straight in our inbox. We usually reply the same day.
              </p>

              {status === 'sent' ? (
                <div
                  className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center"
                  role="status"
                >
                  <CheckCircle2 size={38} className="mx-auto text-emerald-400" aria-hidden />
                  <p className="mt-4 font-display text-xl uppercase tracking-wider text-ink">
                    Enquiry Sent
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Thanks! We&apos;ve received your details and will get back to you shortly. For
                    anything urgent, call us on{' '}
                    <a href={`tel:${site.phoneRaw}`} className="font-semibold text-gold-dark hover:underline">
                      {site.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn-outline mt-6 px-5 py-2.5 text-[11px]"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="c-name" className={label}>
                      Name
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className={field}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-phone" className={label}>
                        Phone
                      </label>
                      <input
                        id="c-phone"
                        name="phone"
                        required
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        pattern="[0-9+\s()-]{8,20}"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className={field}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={label}>
                        Email <span className="normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className={field}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-goal" className={label}>
                      Your Goal
                    </label>
                    <select
                      id="c-goal"
                      name="goal"
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                      className={`${field} appearance-none`}
                    >
                      {goals.map((g) => (
                        <option key={g} value={g} className="bg-page">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-message" className={label}>
                      Message <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Anything you'd like us to know?"
                      className={`${field} resize-none`}
                    />
                  </div>

                  {/* Honeypot: hidden from people, tempting to bots. */}
                  <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
                    <label htmlFor="c-website">Website</label>
                    <input
                      id="c-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                    />
                  </div>

                  {status === 'error' && (
                    <div
                      className="flex gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4"
                      role="alert"
                    >
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
                      <div className="text-sm text-red-200">
                        <p>{error}</p>
                        <a
                          href={waLink(whatsappText())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-block font-semibold text-gold-dark hover:underline"
                        >
                          Send it on WhatsApp instead →
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold w-full text-xs disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" aria-hidden /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden /> Send Enquiry
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-line" aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted">or</span>
                    <span className="h-px flex-1 bg-line" aria-hidden />
                  </div>

                  <a
                    href={waLink(whatsappText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-xs"
                  >
                    <MessageCircle size={15} aria-hidden /> Send on WhatsApp
                  </a>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
