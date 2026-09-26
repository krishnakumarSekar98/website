'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import OpenBadge from './OpenBadge';
import { hours, site } from '@/config/site';
import { formatRange, nowInIndia } from '@/lib/hours';

export default function Timings() {
  // -1 until mounted so the server and client render the same markup.
  const [today, setToday] = useState(-1);

  useEffect(() => {
    const tick = () => setToday(nowInIndia().dayIndex);
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="timings" className="section section-alt edge-gold">
      <div className="container-x">
        <SectionHeading
          eyebrow="Opening Hours"
          title="Gym"
          highlight="Timings"
          subtitle="Early bird or night owl — the floor is open from 5 AM, seven days a week."
        />

        <Reveal className="mx-auto mt-10 flex justify-center">
          <OpenBadge />
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
          <div className="glass-card card-sheen overflow-hidden shadow-gold">
            <div className="flex items-center gap-2.5 border-b border-line bg-sand/60 px-6 py-4">
              <Clock size={17} className="text-gold-dark" aria-hidden />
              <h3 className="font-display text-lg uppercase tracking-[0.2em] text-ink">
                Weekly Schedule
              </h3>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-muted">
                IST · Asia/Kolkata
              </span>
            </div>

            <table className="w-full text-left">
              <caption className="sr-only">Opening hours for {site.name}</caption>
              <tbody>
                {hours.map((d, i) => {
                  const isToday = i === today;
                  return (
                    <tr
                      key={d.day}
                      className={`border-b border-line/70 last:border-none transition-colors ${
                        isToday ? 'bg-gold/10' : 'hover:bg-page/40'
                      }`}
                    >
                      <th
                        scope="row"
                        className={`px-6 py-4 text-sm font-semibold ${
                          isToday ? 'text-gold-dark' : 'text-ink/85'
                        }`}
                      >
                        {d.day}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-gold-gradient px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-page">
                            Today
                          </span>
                        )}
                      </th>
                      <td
                        className={`px-6 py-4 text-right text-sm tabular-nums ${
                          d.closed ? 'text-red-300' : isToday ? 'text-gold-dark' : 'text-muted'
                        }`}
                      >
                        {formatRange(d)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-center text-xs text-muted">
            Note: Wednesday closes early at 9:30 PM and Sunday is a short morning session
            (6:00 – 11:00 AM).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
