import { lazy, Suspense, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/content';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { useIdleMount } from '@/hooks/useIdleMount';
import { useIsVisible } from '@/hooks/useInViewOnce';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useTheme } from '@/providers/ThemeProvider';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { asset } from '@/lib/utils';
import { CanvasBoundary } from '@/components/three/CanvasBoundary';
import { HeroFallback } from '@/components/visuals/HeroFallback';
import { Magnetic } from '@/components/ui/Magnetic';
import { ArrowRightIcon, DownloadIcon, MapPinIcon, SocialIcon } from '@/components/ui/Icons';

// Three.js is split into its own chunk and only downloaded when it will actually render.
const HeroScene = lazy(() => import('@/components/three/HeroScene'));

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { tier } = useDeviceCapability();
  const { theme } = useTheme();
  const { scrollTo } = useSmoothScroll();
  const reduce = useReducedMotion();
  const [sectionRef, visible] = useIsVisible<HTMLElement>('100px');
  const idle = useIdleMount(tier !== 'none');
  const role = useTypewriter(profile.roles, { instant: !!reduce });

  const show3D = tier !== 'none' && idle;
  const nameWords = profile.name.split(' ');

  const item = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease },
  });

  const toProjects = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#projects');
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      tabIndex={-1}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 outline-none"
    >
      {/* 3D background */}
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" animate={{ opacity: show3D ? 0 : 1 }} transition={{ duration: 1 }}>
          <HeroFallback />
        </motion.div>
        {show3D && (
          <CanvasBoundary fallback={<HeroFallback />}>
            <Suspense fallback={null}>
              <motion.div
                className="absolute inset-0 max-md:!opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <HeroScene tier={tier === 'full' ? 'full' : 'lite'} active={visible} isDark={theme === 'dark'} />
              </motion.div>
            </Suspense>
          </CanvasBoundary>
        )}
        {/* Readability scrims */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/75 to-transparent md:bg-gradient-to-r md:via-bg/60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container">
        <div className="max-w-2xl">
          <motion.p {...item(0.1)} className="eyebrow mb-5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to new opportunities
          </motion.p>

          <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden className="block">
              {nameWords.map((word, i) => (
                <span key={word} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className={i === nameWords.length - 1 ? 'text-gradient inline-block' : 'inline-block'}
                    initial={reduce ? { opacity: 0 } : { y: '105%' }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    transition={{ duration: 0.9, delay: reduce ? 0 : 0.2 + i * 0.09, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p {...item(0.45)} className="mt-5 min-h-[1.75rem] font-mono text-lg text-fg sm:text-xl">
            <span className="sr-only">
              {profile.title}: {profile.roles.join(', ')}
            </span>
            <span aria-hidden>
              <span className="text-muted">&gt; </span>
              {role}
              <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-accent" />
            </span>
          </motion.p>

          <motion.p {...item(0.55)} className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div {...item(0.65)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" onClick={toProjects} className="btn-primary">
                View Projects <ArrowRightIcon size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={asset(profile.cv)} download className="btn-ghost">
                <DownloadIcon size={16} /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...item(0.75)} className="mt-9 flex flex-wrap items-center gap-5">
            <ul className="flex items-center gap-2" aria-label="Social links">
              {profile.socials.map((s) => (
                <li key={s.kind}>
                  <a
                    href={s.href}
                    target={s.kind === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/50 text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <SocialIcon kind={s.kind} size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <MapPinIcon size={16} /> {profile.location}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-border pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
