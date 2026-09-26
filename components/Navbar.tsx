'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks, site, waLink } from '@/config/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-page shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between" aria-label="Main">
        <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="inline-flex items-center justify-center rounded-full bg-cream p-1 ring-1 ring-gold/60">
            <Image
              src="/images/logo.webp"
              alt={`${site.name} logo`}
              width={56}
              height={56}
              priority
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="font-display text-xl uppercase leading-none tracking-wider sm:text-2xl">
            <span className="gold-text">Muscle</span>{' '}
            <span className={scrolled || open ? 'text-ink' : 'text-cream'}>Fitness</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`group relative text-sm font-medium transition-colors hover:text-gold-dark ${scrolled ? 'text-ink/85' : 'text-cream/90'}`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneRaw}`}
            className="btn-outline px-5 py-2.5 text-xs"
            aria-label={`Call ${site.name}`}
          >
            <Phone size={15} aria-hidden /> Call
          </a>
          <a
            href={waLink(`Hi, I'd like to join ${site.name}. Please share the details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-6 py-2.5 text-xs"
          >
            Join Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`relative z-50 rounded-lg p-2.5 lg:hidden ${scrolled || open ? 'border border-line text-gold-dark' : 'border border-cream/30 text-cream'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <AnimatePresence initial={false} mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={22} aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={22} aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-page/95 lg:hidden"
          >
            <ul className="container-x flex flex-col py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line/60 py-3.5 font-display text-lg uppercase tracking-wider text-ink/90 transition-colors hover:text-gold-dark"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x flex gap-3 pb-6">
              <a href={`tel:${site.phoneRaw}`} className="btn-outline flex-1 py-3 text-xs">
                <Phone size={15} aria-hidden /> Call
              </a>
              <a
                href={waLink(`Hi, I'd like to join ${site.name}. Please share the details.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-gold flex-1 py-3 text-xs"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
