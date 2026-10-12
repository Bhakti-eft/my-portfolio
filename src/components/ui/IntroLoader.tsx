import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/content';

const DURATION_MS = 1100;

/**
 * Brief page-load intro: initials + a progress line, then a curtain lift.
 * Kept short on purpose and skipped for reduced-motion and repeat visits in a session.
 */
export function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('intro-seen');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem('intro-seen', '1');
      } catch {
        /* ignore */
      }
    }, DURATION_MS);
    return () => window.clearTimeout(t);
  }, [show, reduce]);

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[90] grid place-items-center bg-bg"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="text-gradient font-display text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {initials}
            </motion.span>
            <div className="h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION_MS / 1000 - 0.15, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
