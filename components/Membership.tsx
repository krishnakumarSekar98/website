import { Check, Crown } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { plans, site, waLink } from '@/config/site';

export default function Membership() {
  return (
    <section id="membership" className="section relative">
      <SectionBg src="/images/bg/weights.jpg" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Membership"
          title="Choose Your"
          highlight="Plan"
          subtitle="No joining fee. Pick a duration, walk in, and start training the same day."
        />

        {/* TODO: all prices live in /config/site.ts (plans) — replace with real pricing. */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={0.07 * i} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-400 hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-gold bg-panel shadow-gold-lg'
                    : 'border-line bg-panel/70 hover:border-gold/60 hover:shadow-gold'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-gradient px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-page">
                    <Crown size={12} aria-hidden /> Best Value
                  </span>
                )}

                <h3 className="font-display text-2xl uppercase tracking-wider text-ink">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="gold-text font-display text-5xl leading-none">{plan.price}</span>
                  <span className="text-xs text-muted">{plan.period}</span>
                </div>

                <p className="mt-2 h-5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  {plan.save ?? ''}
                </p>

                <div className="my-6 gold-divider" />

                <ul className="flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(
                    `Hi, I'm interested in the ${plan.name} membership at ${site.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full text-xs ${plan.popular ? 'btn-gold' : 'btn-outline'}`}
                >
                  Enquire on WhatsApp
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-muted">
            Prefer to talk it through?{' '}
            <a href={`tel:${site.phoneRaw}`} className="font-semibold text-gold-dark hover:underline">
              Call {site.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
