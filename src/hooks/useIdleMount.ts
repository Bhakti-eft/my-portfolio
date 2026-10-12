import { useEffect, useState } from 'react';

/**
 * Returns true once the browser is idle after first paint.
 * Mounting heavy work (3D) here keeps it off the critical rendering path.
 */
export function useIdleMount(enabled = true, timeout = 1200) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || ready) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(t);
  }, [enabled, ready, timeout]);

  return ready;
}
