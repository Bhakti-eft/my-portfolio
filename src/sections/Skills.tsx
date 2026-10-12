import { skillGroups } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SkillSphere } from '@/components/visuals/SkillSphere';

const allSkills = skillGroups.flatMap((g) => g.skills);

export function Skills() {
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-title" className="section outline-none">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="04 · Skills"
          title="Tools I build with"
          intro="Mobile-first, full-stack capable, and comfortable down at the hardware level."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Interactive sphere on tablet/desktop; the grouped list is the accessible source of truth. */}
          <Reveal className="hidden md:block">
            <SkillSphere skills={allSkills} />
            <p className="mt-2 text-center font-mono text-xs text-muted" aria-hidden>
              Move your mouse over the sphere to steer it
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <li key={group.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/50">
                    <h3 className="mb-3 text-base font-semibold">{group.title}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
