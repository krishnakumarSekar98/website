'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/config/site';
import OpenBadge from './OpenBadge';

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Inside Muscle Fitness Studio gym in Saidapet, Chennai"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Scrim. On phones the content is centred, so the photo is dimmed evenly.
          From lg up the copy sits left and the branded wall is on the right, so
          the scrim is weighted to the left and lets that wall stay visible. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-shade/70 via-shade/35 to-page lg:hidden"
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden bg-gradient-to-r from-shade/90 via-shade/45 to-transparent lg:block"
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden bg-gradient-to-t from-page via-transparent to-shade/25 lg:block"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(24,22,18,0.4),transparent_75%)] lg:hidden"
        aria-hidden
      />

      <div className="container-x relative z-10 py-28 text-center lg:pr-[38%] lg:text-left">
        <motion.div {...rise(0)} className="flex justify-center lg:justify-start">
          {/* Cream plate + gold ring: the badge's dark outer ring would
              otherwise disappear against the page background. */}
          <span className="inline-flex items-center justify-center rounded-full bg-page p-2.5 shadow-gold ring-2 ring-gold/70">
            <Image
              src="/images/logo.webp"
              alt={`${site.name} logo`}
              width={160}
              height={160}
              priority
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.12)}
          className="mt-8 font-display text-[14vw] uppercase leading-[0.86] tracking-wide sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
        >
          <span className="gold-text">Muscle Fitness</span>
          <span className="block text-cream">Studio</span>
        </motion.h1>

        {/* Gold rule + tagline, replacing the buttons as the hero's closing beat. */}
        <motion.div
          {...rise(0.22)}
          className="mt-7 flex items-center justify-center gap-4 lg:justify-start"
        >
          <span className="h-px w-10 bg-gold-gradient sm:w-14" aria-hidden />
          <p className="font-display text-lg uppercase tracking-[0.28em] text-gold-light sm:text-2xl sm:tracking-[0.32em]">
            {site.tagline}
          </p>
          <span className="h-px w-10 bg-gold-gradient lg:hidden" aria-hidden />
        </motion.div>

        <motion.p
          {...rise(0.32)}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/75 lg:mx-0"
        >
          Saidapet&apos;s premium fitness destination — modern equipment, certified trainers and
          early-morning timings built around your day.
        </motion.p>

        <motion.div {...rise(0.42)} className="mt-8 flex justify-center lg:justify-start">
          <OpenBadge />
        </motion.div>
      </div>
    </section>
  );
}
