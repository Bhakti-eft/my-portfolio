import { projects } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { WowieShowcase } from '@/components/projects/WowieShowcase';

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const showcase = featured.find((p) => p.visual === 'iot');
  const featuredRest = featured.filter((p) => p !== showcase);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="section outline-none">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="03 · Projects"
          title="Selected work"
          intro="Production apps for international clients, plus hardware and academic projects."
        />

        {showcase && (
          <Reveal className="mb-8">
            <WowieShowcase project={showcase} />
          </Reveal>
        )}

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredRest.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>

        {others.length > 0 && (
          <>
            <Reveal>
              <h3 className="mb-8 mt-20 text-2xl font-semibold">More projects</h3>
            </Reveal>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <li key={p.id}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <ProjectCard project={p} size="small" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
