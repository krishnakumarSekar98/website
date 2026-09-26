'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { googleReview, testimonials } from '@/config/site';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next, reduce]);

  const t = testimonials[index];

  return (
    <section className="section relative">
      <SectionBg src="/images/bg/cardio.jpg" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Members"
          highlight="Say"
        />

        {/* TODO: these are PLACEHOLDER examples, not real reviews.
            Replace them in /config/site.ts (testimonials) with genuine
            member reviews before the site goes live. */}
        {/* TODO: put your real Google rating + review count in config/site.ts (googleReview). */}
        <Reveal className="mx-auto mt-10 flex max-w-md items-center justify-center gap-5 rounded-2xl border border-line bg-panel/70 px-6 py-5">
          <div className="text-center">
            <p className="gold-text font-display text-4xl leading-none">{googleReview.rating}</p>
            <div className="mt-1.5 flex justify-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="fill-gold text-gold-dark" />
              ))}
            </div>
          </div>
          <div className="h-12 w-px bg-line" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-ink">Rated on Google</p>
            <p className="mt-0.5 text-xs text-muted">Based on {googleReview.count} member reviews</p>
            {googleReview.url && (
              <a
                href={googleReview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block text-xs font-semibold text-gold-dark hover:underline"
              >
                Write a review →
              </a>
            )}
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted/70">
            Sample content — real member reviews coming soon
          </p>

          <div className="glass-card card-sheen relative mt-8 px-7 py-12 text-center sm:px-14">
            <Quote size={40} className="mx-auto text-gold-dark/30" aria-hidden />

            <div className="mt-6 min-h-[11rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -14 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center gap-1" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold-dark" />
                    ))}
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-ink/85 sm:text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6">
                    <p className="font-display text-xl uppercase tracking-wider text-ink">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                      {t.result}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={prev}
                className="rounded-full border border-line p-2.5 text-gold-dark transition-colors hover:bg-gold/10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-7 bg-gold-gradient' : 'w-2 bg-line'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="rounded-full border border-line p-2.5 text-gold-dark transition-colors hover:bg-gold/10"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
