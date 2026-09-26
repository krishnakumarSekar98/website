'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Apple, Droplets, Flame, Info, Salad, Utensils } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { dietPlans, nutritionTips, proteinFoods, site, waLink } from '@/config/site';

export default function Nutrition() {
  const [activeId, setActiveId] = useState(dietPlans[0].id);
  const reduce = useReducedMotion();
  const plan = dietPlans.find((p) => p.id === activeId) ?? dietPlans[0];

  return (
    <section id="diet" className="section relative">
      <SectionBg src="/images/bg/weights.jpg" opacity="opacity-[0.12]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Diet & Nutrition"
          title="Eat For Your"
          highlight="Goal"
          subtitle="Training is only half of it. These are real Chennai meal plans — idli, sambar, rice and curd — not imported diets nobody can follow."
        />

        {/* Goal tabs */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          {dietPlans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              aria-pressed={p.id === activeId}
              className={`rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                p.id === activeId
                  ? 'border-gold bg-gold-gradient text-page shadow-gold'
                  : 'border-line bg-panel/70 text-ink/80 hover:border-gold/60 hover:text-gold-dark'
              }`}
            >
              {p.goal}
            </button>
          ))}
        </Reveal>

        {/* Day plan */}
        <Reveal delay={0.08} className="mx-auto mt-8 max-w-4xl">
          <div className="glass-card card-sheen overflow-hidden shadow-gold">
            <AnimatePresence mode="wait">
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-line bg-sand/60 px-6 py-5 sm:px-8">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <h3 className="font-display text-2xl uppercase tracking-wider text-ink">
                      A Day On The {plan.goal} Plan
                    </h3>
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                      <Flame size={13} aria-hidden /> {plan.calories}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                      <Utensils size={13} aria-hidden /> {plan.protein}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{plan.blurb}</p>
                </div>

                <ul>
                  {plan.meals.map((m) => (
                    <li
                      key={m.time + m.name}
                      className="flex flex-col gap-1 border-b border-line/70 px-6 py-4 last:border-none transition-colors hover:bg-page/40 sm:flex-row sm:items-center sm:gap-6 sm:px-8"
                    >
                      <span className="w-20 shrink-0 text-xs font-semibold tabular-nums text-gold-dark">
                        {m.time}
                      </span>
                      <span className="w-32 shrink-0 text-sm font-semibold text-ink">
                        {m.name}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">{m.items}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Protein table */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="glass-card card-sheen h-full p-7">
              <div className="flex items-center gap-2.5 text-gold-dark">
                <Salad size={19} aria-hidden />
                <h3 className="font-display text-xl uppercase tracking-wider text-ink">
                  Protein In Everyday Indian Food
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted">
                You don&apos;t need imported supplements. Approximate protein per serving:
              </p>

              <div className="mt-6 grid gap-x-8 gap-y-px sm:grid-cols-2">
                {proteinFoods.map((f) => (
                  <div
                    key={f.food}
                    className="flex items-baseline justify-between gap-3 border-b border-line/60 py-2.5"
                  >
                    <span className="text-sm text-ink/85">
                      {f.food}
                      <span className="ml-1.5 text-xs text-muted">({f.serving})</span>
                    </span>
                    <span className="shrink-0 font-display text-lg tabular-nums text-gold-dark">
                      {f.protein}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Tips */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {nutritionTips.map((t, i) => (
                <div
                  key={t.title}
                  className="group flex-1 rounded-2xl border border-line bg-panel/70 p-6 transition-all duration-300 hover:border-gold/60 hover:shadow-gold"
                >
                  <div className="flex items-center gap-2.5">
                    {i === 0 ? (
                      <Droplets size={17} className="text-gold-dark" aria-hidden />
                    ) : (
                      <Apple size={17} className="text-gold-dark" aria-hidden />
                    )}
                    <h4 className="font-display text-base uppercase tracking-wider text-ink">
                      {t.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Disclaimer + CTA */}
        <Reveal delay={0.12} className="mx-auto mt-8 max-w-4xl">
          <div className="flex flex-col gap-5 rounded-2xl border border-gold/25 bg-gold/[0.06] p-6 sm:flex-row sm:items-center">
            <Info size={22} className="shrink-0 text-gold-dark" aria-hidden />
            <p className="flex-1 text-sm leading-relaxed text-ink/80">
              These are general guidelines, not medical advice. If you have diabetes, thyroid
              issues, PCOS, high blood pressure, or you are pregnant, please check with your
              doctor first. Our trainers build your actual plan after a body composition check.
            </p>
            <a
              href={waLink(
                `Hi, I'd like a personalised diet plan from ${site.name}. My goal is: `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold shrink-0 text-xs"
            >
              Get My Diet Plan
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
