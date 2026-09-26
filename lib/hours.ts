import { hours, type DayHours } from '@/config/site';

const TZ = 'Asia/Kolkata';

/** Current {dayIndex, minutes} in Asia/Kolkata, regardless of the visitor's timezone. */
export function nowInIndia() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = Math.max(0, days.indexOf(get('weekday')));
  // "24" is returned for midnight by some engines.
  const hour = parseInt(get('hour'), 10) % 24;
  const minute = parseInt(get('minute'), 10);

  return { dayIndex, minutes: hour * 60 + minute };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatRange(d: DayHours) {
  return d.closed ? 'Closed' : `${formatTime(d.open)} – ${formatTime(d.close)}`;
}

export type OpenState = { open: boolean; todayIndex: number; message: string };

export function getOpenState(): OpenState {
  const { dayIndex, minutes } = nowInIndia();
  const today = hours[dayIndex];

  if (!today || today.closed) {
    return { open: false, todayIndex: dayIndex, message: 'Closed today' };
  }

  const open = toMinutes(today.open);
  const close = toMinutes(today.close);

  if (minutes < open) {
    return { open: false, todayIndex: dayIndex, message: `Opens at ${formatTime(today.open)}` };
  }
  if (minutes >= close) {
    return { open: false, todayIndex: dayIndex, message: 'Closed for today' };
  }
  return { open: true, todayIndex: dayIndex, message: `Open until ${formatTime(today.close)}` };
}

/** schema.org openingHoursSpecification built from the same config. */
export function openingHoursSpec() {
  const map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return hours
    .map((d, i) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${map[i]}`,
      opens: d.open,
      closes: d.close,
      closed: Boolean(d.closed),
    }))
    .filter((d) => !d.closed)
    .map(({ closed, ...rest }) => rest);
}

/** Groups consecutive days that share the same hours, e.g.
 *  "Mon – Tue: 5:00 AM – 11:00 PM". Keeps the chat answer short while
 *  staying generated from the config, so edits to `hours` still apply. */
export function groupedHours(): string[] {
  // Walk Monday..Sunday rather than the array's Sunday-first order.
  const order = [1, 2, 3, 4, 5, 6, 0];
  const out: string[] = [];
  let runStart = 0;

  for (let i = 0; i < order.length; i++) {
    const cur = hours[order[i]];
    const next = i + 1 < order.length ? hours[order[i + 1]] : null;
    const same =
      next && next.open === cur.open && next.close === cur.close && !!next.closed === !!cur.closed;

    if (!same) {
      const first = hours[order[runStart]];
      const label = runStart === i ? first.short : `${first.short} – ${cur.short}`;
      out.push(`${label}: ${formatRange(cur)}`);
      runStart = i + 1;
    }
  }
  return out;
}
