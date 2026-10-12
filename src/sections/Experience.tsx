import { useLayoutEffect, useRef } from 'react';
import { experience } from '@/data/content';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  // Timeline line "draws" itself as you scroll; each dot lights up when reached.
  useLayoutEffect(() => {
    const list = listRef.current;
    const progress = progressRef.current;
    if (!list || !progress) return;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(progress, { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        },
      );
      list.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0.6 },
          {
            scale: 1,
            scrollTrigger: { trigger: dot, start: 'top 65%', toggleClass: { targets: dot, className: 'is-active' } },
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="experience" tabIndex={-1} aria-labelledby="experience-title" className="section outline-none">
      <div className="container">
        <SectionHeading
          id="experience-title"
          eyebrow="02 · Experience"
          title="Where I’ve been building"
          intro="At Quotus Software Solutions since Sep 2024 — from trainee to a developer who leads and mentors."
        />

        <div ref={listRef} className="relative ml-2 sm:ml-0">
          {/* Track + animated progress */}
          <div aria-hidden className="absolute bottom-0 left-0 top-2 w-px bg-border lg:left-[200px]" />
          <div
            ref={progressRef}
            aria-hidden
            className="absolute bottom-0 left-0 top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 lg:left-[200px]"
          />

          <ol>
            {experience.map((job, i) => (
            <li key={job.role + job.period} className="relative pb-14 pl-8 last:pb-0 lg:grid lg:grid-cols-[200px_1fr] lg:pl-0">
              <span
                data-dot
                aria-hidden
                className="absolute left-0 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-accent bg-bg transition-[background-color,box-shadow] duration-500 lg:left-[200px] [&.is-active]:bg-accent [&.is-active]:shadow-[0_0_0_6px_rgb(var(--accent)/0.18)]"
              />

              <Reveal x={-20} y={0} delay={0.05} className="mb-3 lg:mb-0 lg:pr-10 lg:pt-1 lg:text-right">
                <p className="font-mono text-sm text-accent">{job.period}</p>
                {job.current && (
                  <span className="mt-2 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                    Current
                  </span>
                )}
              </Reveal>

              <Reveal delay={0.1 + i * 0.05} className="lg:pl-10">
                <article className="rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-accent/50 sm:p-8">
                  <h3 className="text-xl font-semibold sm:text-2xl">{job.role}</h3>
                  <p className="mt-1 text-muted">{job.company}</p>
                  <ul className="mt-5 space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-muted">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {job.stack && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                      {job.stack.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
