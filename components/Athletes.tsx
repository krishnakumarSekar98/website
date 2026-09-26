import Image from 'next/image';
import { Quote } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { athletes } from '@/config/site';

export default function Athletes() {
  return (
    <section className="section relative">
      <SectionBg src="/images/bg/rack.jpg" opacity="opacity-[0.13]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Motivation"
          title="Strength Has"
          highlight="No Gender"
          subtitle="Men, women, first-timers and seasoned lifters train on the same floor here — with the same coaching and the same respect."
        />

        {/* TODO: swap these for photos of your own members and trainers.
            Current images are free-licence stock used as motivation only. */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {athletes.map((a, i) => (
            <Reveal key={a.src} delay={0.07 * i}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={a.src}
                  alt={a.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-shade/88 via-shade/15 to-transparent"
                  aria-hidden
                />
                <span
                  className="absolute inset-0 rounded-2xl ring-0 ring-gold transition-all duration-300 group-hover:ring-2"
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-lg uppercase leading-tight tracking-wider text-cream sm:text-xl">
                    {a.title}
                  </p>
                  <span className="mt-2 block h-px w-8 bg-gold-gradient" aria-hidden />
                  <p className="mt-2 text-xs leading-snug text-muted">{a.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mx-auto mt-12 max-w-3xl">
          <div className="glass-card card-sheen flex gap-5 p-7 text-left">
            <Quote size={30} className="shrink-0 text-gold/40" aria-hidden />
            <div>
              <p className="text-base leading-relaxed text-cream/85 sm:text-lg">
                Nobody starts strong. Everyone on this floor was a beginner who kept turning
                up — that is the entire secret.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Muscle Fitness Studio · Saidapet
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
