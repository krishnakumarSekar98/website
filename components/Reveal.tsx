'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Subtle fade + slide-in on scroll. Falls back to a plain fade when the
 *  visitor prefers reduced motion. */
export default function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ height: '100%' }}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
