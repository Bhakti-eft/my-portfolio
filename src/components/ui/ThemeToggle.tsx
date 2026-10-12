import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { MoonIcon, SunIcon } from './Icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={!isDark}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border bg-surface/60 text-fg transition-colors hover:border-accent hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
