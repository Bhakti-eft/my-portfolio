/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to update text, links, projects and skills —
 *  no component code needs to change.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  Certification,
  Education,
  Experience,
  Extras,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  Stat,
} from '@/types/content';

export const profile: Profile = {
  name: 'Bhakti Priya Mohanta',
  shortName: 'Bhakti',
  title: 'Software Developer',
  roles: ['Flutter Developer', 'Node.js Developer', 'Python / Django Developer', 'IoT Builder'],
  location: 'Bhubaneswar, Odisha',
  email: 'bhakti.priya68@gmail.com',
  summary:
    'Computer Science postgraduate (M.Tech IT) with practical experience in mobile and full-stack development, including live production apps on the Google Play Store and App Store, and experience leading and guiding junior developers.',
  about: [
    'I build mobile and full-stack products end to end — from Flutter apps shipped to the Play Store and App Store, to Node.js and Django backends, to IoT hardware running on ESP32.',
    'At Quotus Software Solutions I lead and mentor junior developers through task planning, code reviews and technical guidance, while building client platforms for teams in Sri Lanka and Dubai.',
    'I’m looking for a challenging role where I can build impactful, scalable solutions and keep growing as an engineer.',
  ],
  // ▶ Replace with your photo: put it in /public/images and update this path.
  photo: 'images/profile.jpg',
  photoAlt: 'Portrait of Bhakti Priya Mohanta',
  // ▶ Replace the PDF in /public/cv to update the downloadable CV.
  cv: 'cv/Bhakti_Priya_Mohanta_CV.pdf',
  socials: [
    { kind: 'github', label: 'GitHub', href: 'https://github.com/Bhakti-eft' },
    { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhakti-priya-oc30' },
    { kind: 'email', label: 'Email', href: 'mailto:bhakti.priya68@gmail.com' },
  ],
};

/** Experience start date, used to compute "years of experience" so it never goes stale. */
export const careerStart = new Date(2024, 8, 1); // Sep 2024

function yearsSince(date: Date): number {
  const ms = Date.now() - date.getTime();
  return Math.max(1, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
}

export const stats: Stat[] = [
  { value: 3, label: 'Live apps on Play Store & App Store' },
  { value: yearsSince(careerStart), suffix: '+', label: 'Years of industry experience' },
  { value: 9.09, decimals: 2, label: 'M.Tech IT CGPA' },
  { value: 9.52, decimals: 2, label: 'MCA SGPA' },
];

export const experience: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Quotus Software Solutions Pvt. Ltd.',
    period: 'Oct 2025 — Present',
    current: true,
    points: [
      'Lead and mentor junior developers through task planning, code reviews and technical guidance to maintain code quality and on-time delivery.',
      'Built ASTRA, a recruitment platform for a Sri Lankan client with role-based access for Recruiters, Hiring Managers, Admin and Management.',
      'Building Connectus, a professional networking mobile app with profiles, connections, a post/feed system, messaging, and job posting and applications.',
      'Work with client-configured CI/CD pipelines as part of the build and release flow, and write unit tests to improve stability and maintainability.',
    ],
    stack: ['Flutter', 'Node.js', 'PostgreSQL', 'CI/CD', 'Unit Testing'],
  },
  {
    role: 'Trainee Software Developer',
    company: 'Quotus Software Solutions Pvt. Ltd.',
    period: 'Sep 2024 — Sep 2025',
    points: [
      'Developed and deployed hotel booking applications (Alhajz, Woohootrip, 94Booking) for a Dubai-based hotel management client, live on Google Play Store and App Store.',
      'Developed a blockchain-integrated mobile gaming app in Flutter with MetaMask wallet connectivity, supporting deposits, withdrawals, currency conversion and transaction history.',
    ],
    stack: ['Flutter', 'MetaMask', 'Play Store', 'App Store'],
  },
];

/**
 * Projects. Featured ones are listed first and get large cards.
 * ▶ Add your links: leave a field empty ('') to hide that button.
 */
export const projects: Project[] = [
  {
    id: 'wowie',
    title: 'Wowie',
    subtitle: 'IoT-Based Smart Mobility Dustbin',
    description:
      'An autonomous mobile dustbin with ESP32-controlled locomotion and vacuum-based waste collection, a gesture-controlled lid using infrared sensing and servo actuation, and ultrasonic sensors for obstacle detection and fill-level monitoring. Wi-Fi and Firebase Realtime Database enable remote monitoring.',
    highlights: ['Working hardware prototype', 'Gesture-controlled lid', 'Live fill-level monitoring'],
    stack: ['ESP32', 'Arduino', 'Flutter', 'Node.js', 'MongoDB', 'Firebase'],
    links: { github: '', live: '' },
    featured: true,
    visual: 'iot',
  },
  {
    id: 'connectus',
    title: 'Connectus',
    subtitle: 'Professional networking mobile app',
    description:
      'A professional networking app for a Sri Lanka-based client with user profiles, connections, a post/feed system, messaging, and job posting and application features. Currently in active development.',
    highlights: ['Feed & messaging', 'Job posting & applications'],
    stack: ['Flutter', 'Node.js', 'REST API', 'PostgreSQL'],
    links: {},
    featured: true,
    note: 'Client project — in development',
    visual: 'social',
  },
  {
    id: 'astra',
    title: 'ASTRA',
    subtitle: 'Recruitment platform',
    description:
      'A recruitment platform for a Sri Lankan client with role-based access for Recruiters, Hiring Managers, Admin and Management.',
    highlights: ['Role-based access control', '4 user roles'],
    // ▶ Add the tech stack you used for ASTRA here.
    stack: ['Role-based access', 'Recruitment workflow'],
    links: {},
    featured: true,
    note: 'Client project — code is private',
    visual: 'recruit',
  },
  {
    id: 'hotel-apps',
    title: 'Hotel Booking Apps',
    subtitle: 'Alhajz · Woohootrip · 94Booking',
    description:
      'Developed and deployed three hotel booking applications for a Dubai-based hotel management client, live on the Google Play Store and the App Store.',
    highlights: ['3 apps in production', 'Android & iOS'],
    stack: ['Flutter', 'Android', 'iOS'],
    // ▶ Paste the store URLs here.
    links: { playStore: '', appStore: '' },
    featured: true,
    visual: 'hotel',
  },
  {
    id: 'web3-game',
    title: 'Blockchain Gaming App',
    subtitle: 'Flutter + MetaMask',
    description:
      'A blockchain-integrated mobile gaming app with MetaMask wallet connectivity, supporting deposits, withdrawals, currency conversion and transaction history tracking.',
    stack: ['Flutter', 'MetaMask', 'Blockchain'],
    links: {},
    note: 'Client project — code is private',
    visual: 'chain',
  },
  {
    id: 'doc-portal',
    title: 'Student Document Management Portal',
    subtitle: 'Academic project',
    description:
      'A student portal for centralised management of student documentation, streamlining record-keeping and improving accessibility for students and administrators.',
    stack: ['Python', 'Django'],
    links: { github: '' },
    visual: 'docs',
  },
  {
    id: 'feedback',
    title: 'Student Feedback System',
    subtitle: 'Academic project',
    description:
      'Lets students track and improve academic performance, while enabling teachers to assess and enhance teaching practices based on feedback.',
    stack: ['PHP', 'MySQL'],
    links: { github: '' },
    visual: 'feedback',
  },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Mobile', skills: ['Flutter'] },
  { title: 'Backend & Databases', skills: ['Node.js', 'Express.js', 'Django', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'] },
  { title: 'Full Stack', skills: ['MERN Stack', 'React.js', 'REST APIs'] },
  { title: 'Languages', skills: ['Java', 'Python', 'C', 'C++', 'PHP (basics)'] },
  { title: 'Practices', skills: ['Unit Testing', 'CI/CD', 'Git', 'Code Reviews', 'Mentoring'] },
  { title: 'IoT & Hardware', skills: ['Arduino', 'ESP32'] },
];

export const education: Education[] = [
  { degree: 'M.Tech in Information Technology', institution: 'Utkal University, Vani Vihar, Bhubaneswar', period: '2024 — 2026', score: 'CGPA 9.09' },
  { degree: 'Master of Computer Applications (MCA)', institution: 'GITA Autonomous College, Bhubaneswar', period: '2022 — 2024', score: 'SGPA 9.52' },
  { degree: 'Bachelor of Computer Applications (BCA)', institution: 'NIIS Group of Institutions, Bhubaneswar', period: '2019 — 2022', score: 'CGPA 8.9' },
];

export const certifications: Certification[] = [
  { name: 'Introduction to Internet of Things', issuer: 'NPTEL' },
  { name: 'Python Programming', issuer: 'Seeree, Bhubaneswar' },
];

export const extras: Extras = {
  achievements: ['State-level certificate — Kabaddi', 'National-level certificate — Rugby'],
  hobbies: ['Cooking', 'Photography', 'Reading'],
  languages: ['Odia', 'Hindi', 'English'],
};

export const nav: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const contactConfig = {
  heading: 'Let’s build something together',
  blurb:
    'I’m open to software developer roles in mobile and full-stack development. Send a message and I’ll get back to you soon.',
  /** Set VITE_FORMSPREE_ENDPOINT in .env.local (free at formspree.io). */
  formspreeEndpoint: (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ?? '',
};
