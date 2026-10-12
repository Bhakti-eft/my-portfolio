import { lazy, Suspense } from 'react';
import type { Project } from '@/types/content';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { useInViewOnce, useIsVisible } from '@/hooks/useInViewOnce';
import { useTheme } from '@/providers/ThemeProvider';
import { CanvasBoundary } from '@/components/three/CanvasBoundary';
import { ProjectVisual } from '@/components/visuals/ProjectVisual';
import { ProjectLinks } from './ProjectLinks';

const WowieScene = lazy(() => import('@/components/three/WowieScene'));

/**
 * Wide featured card for Wowie with an interactive 3D model of the dustbin.
 * The 3D chunk only loads when the card nears the viewport, and pauses when off-screen.
 */
export function WowieShowcase({ project }: { project: Project }) {
  const { tier } = useDeviceCapability();
  const { theme } = useTheme();
  const [mountRef, near] = useInViewOnce<HTMLDivElement>('300px');
  const [visRef, visible] = useIsVisible<HTMLDivElement>();
  const use3D = tier !== 'none';
  const fallback = <ProjectVisual kind="iot" className="h-full min-h-[260px]" />;

  return (
    <article className="grid overflow-hidden rounded-3xl border border-border bg-surface/80 transition-colors hover:border-accent/50 lg:grid-cols-2">
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3 py-1 font-mono text-xs text-accent">
          ★ Featured · Hardware + Software
        </span>
        <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.subtitle}</p>
        <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">{project.title}</h3>
        <p className="mt-4 text-muted">{project.description}</p>

        {project.highlights && (
          <ul className="mt-5 space-y-1.5 text-sm">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span aria-hidden className="text-accent">
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </div>

      <div ref={mountRef} className="relative min-h-[300px] border-t border-border bg-gradient-to-br from-elevated/80 to-bg/40 lg:min-h-[460px] lg:border-l lg:border-t-0">
        <div ref={visRef} className="absolute inset-0">
          {use3D && near ? (
            <CanvasBoundary fallback={fallback}>
              <Suspense fallback={fallback}>
                <WowieScene active={visible} isDark={theme === 'dark'} />
              </Suspense>
            </CanvasBoundary>
          ) : (
            <div className="absolute inset-0 p-6">{fallback}</div>
          )}
        </div>
        {use3D && (
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-muted">
            Drag to rotate · 3D model of the prototype
          </p>
        )}
      </div>
    </article>
  );
}
