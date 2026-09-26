import { CalendarClock, HandCoins, ShieldCheck, Sparkles, Users, Wrench } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const reasons = [
  { icon: Wrench, title: 'Modern Equipment', text: 'Well-maintained strength, cardio and functional machines.' },
  { icon: ShieldCheck, title: 'Certified Trainers', text: 'Qualified coaches who watch your form, not their phones.' },
  { icon: CalendarClock, title: 'Flexible Timings', text: 'Doors open at 5 AM and stay open till 11 PM, 7 days a week.' },
  { icon: Sparkles, title: 'Hygienic Space', text: 'Sanitised equipment, clean washrooms and good ventilation.' },
  { icon: HandCoins, title: 'Affordable Plans', text: 'Honest pricing with no hidden joining fees or surprises.' },
  { icon: Users, title: 'Friendly Community', text: 'A supportive crowd where beginners are genuinely welcome.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section section-alt edge-gold">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Choose"
          highlight="MU-FI"
          subtitle="Six reasons members in Saidapet keep coming back, day after day."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.05 * i}>
              <div className="group h-full bg-panel p-8 transition-colors duration-300 hover:bg-card">
                <r.icon
                  size={26}
                  className="text-gold-dark transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                />
                <h3 className="mt-5 font-display text-xl uppercase tracking-wider text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
