import { profile, stats } from '@/data/content';
import { asset } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TiltCard } from '@/components/ui/TiltCard';
import { CountUp } from '@/components/ui/CountUp';
import { MapPinIcon } from '@/components/ui/Icons';

export function About() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className="section outline-none">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="01 · About" title="A developer who ships — and helps others ship." />

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Floating 3D-tilt photo card */}
          <Reveal x={-30} y={0} className="mx-auto w-full max-w-sm">
            <TiltCard max={12} className="rounded-3xl">
              <div className="relative rounded-3xl border border-border bg-surface p-3 shadow-2xl shadow-black/20 [transform-style:preserve-3d]">
                <img
                  src={asset(profile.photo)}
                  alt={profile.photoAlt}
                  width={600}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
                <div className="glass absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm shadow-lg [transform:translateZ(50px)]">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-medium">Software Developer @ Quotus</span>
                </div>
                <div className="glass absolute -right-4 -top-4 flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs text-muted shadow-lg [transform:translateZ(70px)]">
                  <MapPinIcon size={14} /> {profile.location}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-5 text-lg text-muted first:text-fg">{p}</p>
              </Reveal>
            ))}

            <ul className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <li key={s.label}>
                  <Reveal delay={0.1 + i * 0.08} className="h-full">
                    <div className="h-full rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/60">
                      <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                        <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 text-sm text-muted">{s.label}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
