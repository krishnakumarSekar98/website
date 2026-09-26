'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { gallery } from '@/config/site';

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, prev, next]);

  return (
    <section id="gallery" className="section relative">
      <SectionBg src="/images/bg/floor.jpg" opacity="opacity-[0.12]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Gallery"
          title="Inside The"
          highlight="Studio"
          subtitle="A look at the floor, the equipment and the people who train here."
        />

        {/* TODO: add more photos to /public/images/gallery/ and list them in config/site.ts (gallery). */}
        {/* Two tiles are promoted to a larger cell so the grid has a rhythm
            instead of reading as a uniform contact sheet. */}
        <div className="mt-14 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 lg:grid-cols-4">
          {gallery.map((img, i) => {
            const feature = i === 0 || i === 7;
            return (
            <Reveal
              key={i}
              delay={0.04 * i}
              className={feature ? 'col-span-2 row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-line"
                aria-label={`Open photo ${i + 1}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  className="absolute inset-0 bg-page/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="absolute inset-0 rounded-2xl ring-0 ring-gold transition-all duration-300 group-hover:ring-2" aria-hidden />
              </button>
            </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-shade/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 rounded-full border border-line p-2.5 text-gold transition-colors hover:bg-gold/10"
              aria-label="Close photo viewer"
            >
              <X size={22} aria-hidden />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 rounded-full border border-line bg-page/70 p-2.5 text-gold transition-colors hover:bg-gold/10 sm:left-8"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} aria-hidden />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[70vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[index].src}
                alt={gallery[index].alt}
                fill
                sizes="100vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 rounded-full border border-line bg-page/70 p-2.5 text-gold transition-colors hover:bg-gold/10 sm:right-8"
              aria-label="Next photo"
            >
              <ChevronRight size={24} aria-hidden />
            </button>

            <p className="absolute bottom-6 text-xs uppercase tracking-[0.2em] text-muted">
              {index + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
