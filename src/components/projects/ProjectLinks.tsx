import type { Project } from '@/types/content';
import { ExternalIcon, GitHubIcon, StoreIcon } from '@/components/ui/Icons';

const LINKS = [
  { key: 'live', label: 'Live', Icon: ExternalIcon },
  { key: 'github', label: 'GitHub', Icon: GitHubIcon },
  { key: 'playStore', label: 'Play Store', Icon: StoreIcon },
  { key: 'appStore', label: 'App Store', Icon: StoreIcon },
] as const;

/** Renders only the links that are filled in; otherwise the project's note (e.g. NDA). */
export function ProjectLinks({ project }: { project: Project }) {
  const available = LINKS.filter(({ key }) => !!project.links[key]);

  if (available.length === 0) {
    return <p className="font-mono text-xs text-muted">{project.note ?? 'Links coming soon'}</p>;
  }

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {available.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={project.links[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — ${label} (opens in a new tab)`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <Icon size={14} /> {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
