'use client';

import { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { site, waLink } from '@/config/site';

type Category = { label: string; color: string; advice: string };

function categorise(bmi: number): Category {
  if (bmi < 18.5)
    return {
      label: 'Underweight',
      color: 'text-sky-300',
      advice: 'A muscle-building programme with a calorie surplus would suit you best.',
    };
  if (bmi < 25)
    return {
      label: 'Normal',
      color: 'text-emerald-300',
      advice: 'Great range. Strength training will help you maintain and build on it.',
    };
  if (bmi < 30)
    return {
      label: 'Overweight',
      color: 'text-amber-300',
      advice: 'A structured fat-loss plan with cardio and nutrition guidance works well here.',
    };
  return {
    label: 'Obese',
    color: 'text-red-300',
    advice: 'Start with guided personal training — we will build up safely and steadily.',
  };
}

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const result = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h < 50 || h > 260 || w < 15 || w > 400) return null;
    const bmi = w / Math.pow(h / 100, 2);
    return { bmi: Math.round(bmi * 10) / 10, ...categorise(bmi) };
  }, [height, weight]);

  return (
    <section className="section relative glow-warm">
      <div className="container-x">
        <SectionHeading
          eyebrow="Free Tool"
          title="BMI"
          highlight="Calculator"
          subtitle="A quick starting point. Your trainer will do a full body composition check on day one."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="glass-card card-sheen overflow-hidden shadow-gold">
            <div className="grid md:grid-cols-2">
              <div className="border-b border-line p-8 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2.5 text-gold-dark">
                  <Calculator size={20} aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                    Your Details
                  </span>
                </div>

                <div className="mt-7 space-y-5">
                  <div>
                    <label
                      htmlFor="bmi-height"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Height (cm)
                    </label>
                    <input
                      id="bmi-height"
                      type="number"
                      inputMode="decimal"
                      min={50}
                      max={260}
                      placeholder="e.g. 170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-line bg-sand px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bmi-weight"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Weight (kg)
                    </label>
                    <input
                      id="bmi-weight"
                      type="number"
                      inputMode="decimal"
                      min={15}
                      max={400}
                      placeholder="e.g. 68"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-line bg-sand px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col items-center justify-center bg-sand/60 p-8 text-center"
                aria-live="polite"
              >
                {result ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                      Your BMI
                    </p>
                    <p className="gold-text mt-2 font-display text-7xl leading-none">
                      {result.bmi}
                    </p>
                    <p
                      className={`mt-3 text-sm font-semibold uppercase tracking-[0.2em] ${result.color}`}
                    >
                      {result.label}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{result.advice}</p>
                    <a
                      href={waLink(
                        `Hi, my BMI is ${result.bmi} (${result.label}). Which programme at ${site.name} would suit me?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold mt-6 px-5 py-2.5 text-[11px]"
                    >
                      Get a Free Plan
                    </a>
                  </>
                ) : (
                  <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
                    Enter your height and weight to see your BMI and the programme we&apos;d
                    recommend.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
