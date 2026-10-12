import type { Project } from '@/types/content';
import { cn } from '@/lib/utils';

/** Line-art emblem per project type, drawn in the accent colour. */
function Emblem({ kind }: { kind: Project['visual'] }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (kind) {
    case 'iot':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <path d="M20 22h24l-3 30H23z" />
          <path d="M17 22h30M28 17h8" />
          <circle cx="28" cy="34" r="2" />
          <circle cx="36" cy="34" r="2" />
          <path d="M24 56h0M40 56h0" strokeWidth={4} />
          <path d="M44 10a10 10 0 0 1 8 8M44 4a16 16 0 0 1 14 14" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <circle cx="32" cy="18" r="6" />
          <circle cx="14" cy="44" r="6" />
          <circle cx="50" cy="44" r="6" />
          <path d="M28 23 17 39M36 23l11 16M20 44h24" />
        </svg>
      );
    case 'recruit':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <circle cx="26" cy="22" r="8" />
          <path d="M10 50c2-10 8-15 16-15s14 5 16 15" />
          <path d="M44 20l4 4 8-9" />
          <rect x="40" y="10" width="20" height="20" rx="4" />
        </svg>
      );
    case 'hotel':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <rect x="22" y="6" width="20" height="52" rx="4" />
          <path d="M29 51h6" />
          <path d="M8 40h12M8 40v-6a4 4 0 0 1 4-4h8M44 40h12M44 34h8a4 4 0 0 1 4 4v6" />
          <path d="M27 16h10M27 24h10M27 32h6" />
        </svg>
      );
    case 'chain':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <rect x="6" y="22" width="18" height="18" rx="4" />
          <rect x="40" y="22" width="18" height="18" rx="4" />
          <rect x="23" y="8" width="18" height="18" rx="4" />
          <path d="M24 31h16M15 22l12-4M49 22l-12-4" />
        </svg>
      );
    case 'docs':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <path d="M18 8h20l10 10v34a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4Z" />
          <path d="M38 8v10h10M22 30h18M22 38h18M22 46h10" />
        </svg>
      );
    case 'feedback':
      return (
        <svg viewBox="0 0 64 64" {...common}>
          <path d="M10 14h44v28H30l-10 9v-9H10z" />
          <path d="m32 20 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" />
        </svg>
      );
  }
}

/** Decorative card header: grid + glow + floating emblem (parallax via translateZ). */
export function ProjectVisual({ kind, className }: { kind: Project['visual']; className?: string }) {
  return (
    // No overflow-hidden on this wrapper: it would flatten the 3D context and kill the parallax.
    <div aria-hidden className={cn('relative', className)} style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute inset-0 overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-elevated to-surface">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        <div className="glow-blob left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute inset-0 grid place-items-center text-accent [transform:translateZ(40px)]">
        <div className="h-16 w-16 sm:h-20 sm:w-20">
          <Emblem kind={kind} />
        </div>
      </div>
    </div>
  );
}
