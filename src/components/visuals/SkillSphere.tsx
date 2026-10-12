import { useEffect, useMemo, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * A rotating 3D tag sphere rendered with CSS transforms (no WebGL),
 * so it's cheap and crisp. Steer it by moving the mouse over it.
 * Decorative only — the grouped skill list next to it is the accessible version.
 */

const IDLE = { x: 0.0016, y: 0.0032 };

/** Evenly distribute n points on a unit sphere. */
function fibonacciSphere(n: number) {
  const pts: Array<[number, number, number]> = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

export function SkillSphere({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const points = useMemo(() => fibonacciSphere(skills.length), [skills.length]);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let radius = container.clientWidth * 0.4;
    let ax = -0.3;
    let ay = 0.4;
    const vel = { ...IDLE };
    const target = { ...IDLE };
    let raf = 0;
    let visible = true;

    const render = () => {
      const sx = Math.sin(ax);
      const cx = Math.cos(ax);
      const sy = Math.sin(ay);
      const cy = Math.cos(ay);
      points.forEach(([x0, y0, z0], i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        // Rotate around Y, then X.
        const x1 = x0 * cy + z0 * sy;
        const z1 = -x0 * sy + z0 * cy;
        const y2 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 (back) … 1 (front)
        const scale = 0.6 + depth * 0.55;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
        el.style.opacity = String(0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const loop = () => {
      vel.x += (target.x - vel.x) * 0.05;
      vel.y += (target.y - vel.y) * 0.05;
      ax += vel.x;
      ay += vel.y;
      render();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!reduce && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      target.y = dx * 0.018;
      target.x = -dy * 0.018;
    };
    const onLeave = () => Object.assign(target, IDLE);

    const ro = new ResizeObserver(() => {
      radius = container.clientWidth * 0.4;
      render();
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });

    ro.observe(container);
    io.observe(container);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    render();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, [points, reduce]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      data-cursor="hover"
      className="relative mx-auto aspect-square w-full max-w-[460px] select-none"
    >
      <div className="glow-blob inset-[15%]" />
      <div className="absolute inset-[10%] rounded-full border border-border/50" />
      {skills.map((skill, i) => (
        <span
          key={skill}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-border/70 bg-surface/80 px-3 py-1 font-mono text-sm text-fg shadow-sm transition-colors will-change-transform hover:border-accent hover:text-accent"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
