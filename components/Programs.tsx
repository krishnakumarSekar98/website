import {
  Dumbbell,
  Flame,
  HeartPulse,
  Salad,
  Timer,
  UserRoundCheck,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';

const programs = [
  {
    icon: Dumbbell,
    title: 'Strength Training',
    text: 'Progressive barbell and machine programming to build real, lasting strength.',
  },
  {
    icon: Flame,
    title: 'Weight Loss',
    text: 'Structured fat-loss training paired with realistic nutrition targets.',
  },
  {
    icon: Timer,
    title: 'Muscle Building',
    text: 'Hypertrophy-focused splits with volume and recovery planned for you.',
  },
  {
    icon: UserRoundCheck,
    title: 'Personal Training',
    text: 'One-on-one coaching with form correction and week-by-week accountability.',
  },
  {
    icon: HeartPulse,
    title: 'Cardio & Functional',
    text: 'Conditioning, mobility and functional circuits for everyday athleticism.',
  },
  {
    icon: Salad,
    title: 'Diet & Nutrition',
    text: 'Simple, sustainable diet guidance built around South Indian food habits.',
  },
];

export default function Programs() {
  return (
    <section id="programs" className="section relative">
      <SectionBg src="/images/bg/floor.jpg" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our"
          highlight="Programs"
          subtitle="Pick a path or mix them — every programme is coached, tracked and adjusted as you progress."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * i}>
              <article className="group card-sheen relative h-full overflow-hidden rounded-2xl border border-line bg-panel/70 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-gold-lg">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-dark transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-ink">
                  <p.icon size={26} aria-hidden />
                </div>
                <h3 className="relative mt-6 font-display text-2xl uppercase tracking-wider text-ink">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
