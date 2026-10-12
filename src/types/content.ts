/** Shapes for everything in src/data/content.ts. */

export type SocialKind = 'github' | 'linkedin' | 'email';

export interface SocialLink {
  kind: SocialKind;
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  /** Rotating words shown by the typewriter in the hero. */
  roles: string[];
  location: string;
  email: string;
  summary: string;
  /** Longer About text, one entry per paragraph. */
  about: string[];
  /** Path relative to /public, e.g. "images/profile.jpg". */
  photo: string;
  photoAlt: string;
  /** Path relative to /public. */
  cv: string;
  socials: SocialLink[];
}

export interface Stat {
  /** Numeric value that counts up. */
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
  stack?: string[];
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  playStore?: string;
  appStore?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  stack: string[];
  links: ProjectLinks;
  /** Featured projects get large cards and appear first. */
  featured?: boolean;
  /** Shown instead of links when the code is under a client NDA. */
  note?: string;
  /** Visual identity of the card. */
  visual: 'iot' | 'social' | 'recruit' | 'hotel' | 'chain' | 'docs' | 'feedback';
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Extras {
  achievements: string[];
  hobbies: string[];
  languages: string[];
}

export interface NavItem {
  id: string;
  label: string;
}
