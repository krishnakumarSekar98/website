'use client';

import { useState } from 'react';
import { Car, Clock, Copy, Check, Footprints, MapPin, Navigation, Phone } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { branches, site } from '@/config/site';

export default function Locator() {
  const [activeId, setActiveId] = useState(branches[0].id);
  const [copied, setCopied] = useState(false);
  const branch = branches.find((b) => b.id === activeId) ?? branches[0];
  const multi = branches.length > 1;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(branch.address.join(', '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is on screen anyway */
    }
  };

  return (
    <section id="location" className="section relative">
      <SectionBg src="/images/bg/cardio.jpg" opacity="opacity-[0.13]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Locate Us"
          title="Find Your"
          highlight="Nearest Studio"
          subtitle="Right in the heart of Saidapet, a short walk from the metro and bus terminus."
        />

        {/* Branch switcher — appears automatically once a second branch is added. */}
        {multi && (
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveId(b.id)}
                aria-pressed={b.id === activeId}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  b.id === activeId
                    ? 'border-gold bg-gold-gradient text-page shadow-gold'
                    : 'border-line bg-panel/70 text-ink/80 hover:border-gold/60 hover:text-gold-dark'
                }`}
              >
                {b.area}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Details */}
          <Reveal className="lg:col-span-2">
            <div className="glass-card card-sheen h-full p-7">
              <p className="eyebrow">{multi ? 'Selected Branch' : 'Our Studio'}</p>
              <h3 className="mt-2 font-display text-2xl uppercase leading-tight tracking-wider text-ink">
                {branch.name}
              </h3>

              <div className="mt-6 flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-dark">
                  <MapPin size={19} aria-hidden />
                </span>
                <div>
                  <address className="text-sm not-italic leading-relaxed text-muted">
                    {branch.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    {branch.landmark}
                  </p>
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink/70 transition-colors hover:text-gold-dark"
                  >
                    {copied ? (
                      <>
                        <Check size={13} aria-hidden /> Address copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden /> Copy address
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-dark">
                  <Clock size={19} aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Opening Hours
                  </p>
                  <p className="mt-1 text-sm text-ink/85">{branch.hoursSummary}</p>
                  <a href="#timings" className="mt-1 inline-block text-xs font-semibold text-gold-dark hover:underline">
                    See full timings →
                  </a>
                </div>
              </div>

              <div className="my-7 gold-divider" />

              {/* Travel times */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                How To Reach
              </p>
              {/* TODO: verify these travel times on Google Maps for your exact door. */}
              <ul className="mt-4 space-y-2.5">
                {branch.nearby.map((n) => (
                  <li key={n.place} className="flex items-center gap-3 text-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-page text-gold-dark">
                      {n.mode === 'walk' ? (
                        <Footprints size={13} aria-hidden />
                      ) : (
                        <Car size={13} aria-hidden />
                      )}
                    </span>
                    <span className="flex-1 text-muted">{n.place}</span>
                    <span className="whitespace-nowrap text-xs font-semibold text-gold-dark">
                      {n.time} {n.mode === 'walk' ? 'walk' : 'drive'}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={branch.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex-1 text-xs"
                >
                  <Navigation size={15} aria-hidden /> Directions
                </a>
                <a href={`tel:${branch.phoneRaw}`} className="btn-outline flex-1 text-xs">
                  <Phone size={15} aria-hidden /> Call Branch
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass-card card-sheen relative h-full overflow-hidden">
              {/* Name badge over the map: whether Google labels the pin with the
                  business or just the address is out of our hands, so the studio
                  name is shown here regardless. */}
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl border border-gold/40 bg-page/95 px-4 py-2.5 shadow-gold">
                <p className="font-display text-base uppercase leading-tight tracking-wider text-ink">
                  {site.name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">{branch.area} &middot; Chennai</p>
              </div>
              <iframe
                key={branch.id}
                src={branch.mapEmbed}
                title={`Google Map showing ${branch.name}`}
                className="h-[26rem] w-full border-0 grayscale-0 transition-all duration-500 hover:grayscale-0 lg:h-full lg:min-h-[32rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
