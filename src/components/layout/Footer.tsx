import { profile } from '@/data/content';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { ArrowUpIcon, SocialIcon } from '@/components/ui/Icons';
import { Magnetic } from '@/components/ui/Magnetic';

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  const backToTop = () => {
    scrollTo(0);
    document.getElementById('top')?.focus({ preventScroll: true });
  };

  return (
    <footer className="border-t border-border/70">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name}. Built with React, Three.js &amp; GSAP.
        </p>

        <div className="flex items-center gap-3">
          {profile.socials.map((s) => (
            <a
              key={s.kind}
              href={s.href}
              target={s.kind === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:text-accent"
            >
              <SocialIcon kind={s.kind} size={18} />
            </a>
          ))}
          <Magnetic>
            <button
              type="button"
              onClick={backToTop}
              aria-label="Back to top"
              className="ml-2 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUpIcon size={18} />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
