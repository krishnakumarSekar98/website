import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { trainers } from '@/config/site';

export default function Trainers() {
  return (
    <section className="section section-alt edge-gold">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Team"
          title="Meet Your"
          highlight="Trainers"
          subtitle="Certified coaches who plan your programme, correct your form and keep you accountable."
        />

        {/* TODO: replace trainer names, roles and photos in /config/site.ts (trainers). */}
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal key={t.name} delay={0.08 * i}>
              <article className="group overflow-hidden rounded-2xl border border-line bg-panel/70 transition-all duration-400 hover:border-gold/60 hover:shadow-gold-lg">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={`${t.name} — ${t.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-shade/88 via-shade/15 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wider text-cream">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    {t.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
