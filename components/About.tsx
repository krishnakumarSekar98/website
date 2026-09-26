import Image from 'next/image';
import { Dumbbell, HeartPulse, Target } from 'lucide-react';
import Reveal from './Reveal';
import { site } from '@/config/site';

const pillars = [
  { icon: Target, title: 'Our Mission', text: 'Make world-class training accessible to every person in Saidapet.' },
  { icon: Dumbbell, title: 'Our Floor', text: 'Modern strength, cardio and functional equipment, kept spotless.' },
  { icon: HeartPulse, title: 'Our Promise', text: 'Coaching that respects your pace, your body and your schedule.' },
];

export default function About() {
  return (
    <section id="about" className="section relative glow-warm">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/gallery/01-cardio-studio.jpg"
              alt="Cardio studio at Muscle Fitness Studio, Saidapet"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shade/25 to-transparent" aria-hidden />
          </div>
          {/* Floating accent card */}
          <div className="glass-card card-sheen absolute -bottom-6 -right-2 hidden px-6 py-5 shadow-gold sm:block lg:-right-6">
            <p className="gold-text font-display text-4xl leading-none">5 AM</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Doors Open</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About Us</p>
            <h2 className="heading mt-3">
              Built For People Who <span className="gold-text">Show Up</span>
            </h2>
            <div className="mt-5 h-px w-24 bg-gold-gradient" />
            <p className="mt-6 text-base leading-relaxed text-muted">
              {site.name} is a neighbourhood gym in {site.address.city} with a serious training
              floor. {site.address.landmark}, we opened with one simple idea: a premium gym
              experience shouldn&apos;t require a premium commute or an intimidating crowd.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you are lifting for the first time or chasing a personal best, our certified
              trainers build the plan around you — and our 5 AM to 11 PM timings mean there is
              always a slot that fits your day.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 * i}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-dark">
                    <p.icon size={20} aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wider text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
