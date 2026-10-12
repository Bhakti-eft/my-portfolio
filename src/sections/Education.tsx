import { certifications, education, extras } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { AwardIcon, CapIcon } from '@/components/ui/Icons';

export function Education() {
  return (
    <section id="education" tabIndex={-1} aria-labelledby="education-title" className="section outline-none">
      <div className="container">
        <SectionHeading id="education-title" eyebrow="05 · Education" title="Education & certifications" />

        <ul className="grid gap-6 md:grid-cols-3">
          {education.map((e, i) => (
            <li key={e.degree}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                      <CapIcon size={22} />
                    </span>
                    <span className="font-mono text-xs text-muted">{e.period}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{e.institution}</p>
                  <p className="mt-4 inline-block rounded-full bg-elevated px-3 py-1 font-mono text-sm text-accent">{e.score}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-surface/60 p-6">
              <h3 className="mb-5 text-lg font-semibold">Certifications</h3>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                      <AwardIcon size={18} />
                    </span>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-muted">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid h-full gap-6 rounded-2xl border border-border bg-surface/60 p-6 sm:grid-cols-3">
              <ExtraList title="Achievements" items={extras.achievements} />
              <ExtraList title="Languages" items={extras.languages} />
              <ExtraList title="Interests" items={extras.hobbies} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ExtraList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">{title}</h3>
      <ul className="space-y-1.5 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
