import type { Project } from '@/types/content';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProjectVisual } from '@/components/visuals/ProjectVisual';
import { ProjectLinks } from './ProjectLinks';

interface ProjectCardProps {
  project: Project;
  size?: 'large' | 'small';
}

export function ProjectCard({ project, size = 'large' }: ProjectCardProps) {
  const large = size === 'large';

  return (
    <TiltCard max={large ? 7 : 9} className="h-full rounded-3xl">
      <article
        className="flex h-full flex-col rounded-3xl border border-border bg-surface/80 p-5 transition-colors duration-300 hover:border-accent/50 sm:p-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <ProjectVisual kind={project.visual} className={cn('mb-6', large ? 'h-44 sm:h-52' : 'h-32')} />

        <div className="[transform:translateZ(20px)]">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.subtitle}</p>
          <h3 className={cn('mt-2 font-semibold', large ? 'text-2xl' : 'text-xl')}>{project.title}</h3>
        </div>

        <p className="mt-3 text-muted">{project.description}</p>

        {large && project.highlights && (
          <ul className="mt-4 space-y-1.5 text-sm">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-fg">
                <span aria-hidden className="text-accent">
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </article>
    </TiltCard>
  );
}
