import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

/** Consistent heading block for every section. `id` labels the section for screen readers. */
export function SectionHeading({ id, eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
