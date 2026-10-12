import { useMemo } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from './useMediaQuery';

/**
 * 'full'  → desktop-class device: full 3D scenes
 * 'lite'  → phones/tablets: lighter 3D scene (fewer particles, lower DPR)
 * 'none'  → reduced motion, no WebGL, data saver or very low-end hardware: static fallback
 */
export type RenderTier = 'full' | 'lite' | 'none';

interface NavigatorHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function useDeviceCapability() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const coarsePointer = useMediaQuery('(pointer: coarse)');

  const tier = useMemo<RenderTier>(() => {
    if (typeof window === 'undefined' || reducedMotion) return 'none';
    const nav = navigator as NavigatorHints;
    if (nav.connection?.saveData) return 'none';
    if (!hasWebGL()) return 'none';
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 2;
    const fewCores = (nav.hardwareConcurrency ?? 8) <= 2;
    if (lowMemory || fewCores) return 'none';
    if (isMobile || coarsePointer) return 'lite';
    return 'full';
  }, [reducedMotion, isMobile, coarsePointer]);

  return { tier, reducedMotion, isMobile };
}
