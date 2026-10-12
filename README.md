# Bhakti Priya Mohanta — Portfolio

A fast, accessible single-page portfolio with 3D visuals.
**Stack:** React 18 · Vite 5 · TypeScript · Tailwind CSS · Three.js (@react-three/fiber + drei) · Framer Motion · GSAP ScrollTrigger · Lenis.

---

## 1. Quick start

Requires **Node.js 18+** (20 recommended).

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build → http://localhost:4173
```

<details>
<summary>How this project was scaffolded (for reference)</summary>

```bash
npm create vite@latest portfolio-web -- --template react-ts
cd portfolio-web
npm i three @react-three/fiber@8 @react-three/drei@9 framer-motion gsap lenis \
      @fontsource-variable/inter @fontsource-variable/space-grotesk @fontsource/jetbrains-mono
npm i -D tailwindcss@3 postcss autoprefixer @types/three @types/node
```
</details>

---

## 2. Project structure

```
portfolio-web/
├── index.html                  # SEO meta, Open Graph, JSON-LD Person schema, theme no-flash script
├── public/
│   ├── cv/Bhakti_Priya_Mohanta_CV.pdf   # ← downloadable CV
│   ├── images/profile-placeholder.svg   # ← replace with your photo
│   ├── og-image.png            # 1200×630 social preview image
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── data/content.ts         # ★ ALL editable content (text, links, projects, skills…)
│   ├── types/content.ts        # TypeScript shapes for the content
│   ├── sections/               # One file per page section
│   │   ├── Hero.tsx  About.tsx  Experience.tsx  Projects.tsx
│   │   ├── Skills.tsx  Education.tsx  Contact.tsx
│   │   └── index.ts
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── ui/                 # Reusable primitives: Reveal, TiltCard, Magnetic, CountUp,
│   │   │                       #   CustomCursor, IntroLoader, ThemeToggle, ScrollProgress, Icons
│   │   ├── projects/           # ProjectCard, ProjectLinks, WowieShowcase
│   │   ├── visuals/            # Non-WebGL visuals: HeroFallback, SkillSphere (CSS 3D), ProjectVisual
│   │   └── three/              # WebGL (lazy-loaded): HeroScene, Devices, CodeParticles,
│   │                           #   WowieScene, procedural textures, CanvasBoundary
│   ├── hooks/                  # useDeviceCapability, useMediaQuery, useTypewriter, useInViewOnce, useIdleMount
│   ├── providers/              # ThemeProvider (light/dark), SmoothScrollProvider (Lenis + GSAP)
│   ├── lib/                    # gsap registration, utils (cn, asset path helper)
│   ├── App.tsx  main.tsx  index.css
├── .github/workflows/deploy.yml   # GitHub Pages CI
├── netlify.toml  vercel.json
├── tailwind.config.ts  vite.config.ts  tsconfig*.json
└── .env / .env.example           # public config (site URL, base path, Formspree)
```

**Design decisions**

| Area | Choice |
|---|---|
| Palette | Deep navy `#0B1120` base · single teal accent `#2DD4BF` (cyan `#22D3EE` as its gradient partner). Light theme uses darker teal `#0D746A` for AA contrast. Tokens live as CSS variables in `src/index.css`. |
| Fonts | **Space Grotesk** (headings) · **Inter** (body) · **JetBrains Mono** (labels/code). Self-hosted via Fontsource, so there are no Google Fonts requests. |
| 3D | Everything is procedural (no external models or copyrighted assets). The hero has a low-poly laptop with live-typing code, a phone, code-glyph particles, wireframe shapes and stars, with mouse parallax and scroll reaction. Wowie is a primitive-built dustbin that patrols, pings, opens its lid and shows its fill level. |
| Skills | A CSS-3D rotating tag sphere (no second WebGL context) with a grouped 2D list, which is always present and the only view on mobile. |

**Performance safeguards**
- Three.js is only reached via `React.lazy` and is **not downloaded on first paint**. The hero scene mounts on browser idle; Wowie mounts only when scrolled near.
- `useDeviceCapability` picks a tier:
  - `full`: desktop.
  - `lite`: phones. Fewer particles, DPR ≤ 1.25, no antialiasing.
  - `none`: reduced motion, Save-Data, no WebGL, or very low-end hardware. Uses the static SVG fallback.
- Canvases stop rendering (`frameloop="never"`) when off-screen. DPR is capped.
- `prefers-reduced-motion` disables Lenis, 3D, the intro loader, the cursor, tilt and the magnetic effect, and shortens all transitions.

---

## 3. Editing content

Everything lives in **`src/data/content.ts`**. Change text there; no component edits are needed.

### Replace the profile photo
1. Put your photo in `public/images/`, e.g. `public/images/profile.jpg`. Use a 4:5 ratio, about 600×750px. Compress it, ideally to WebP under 120 KB, at [squoosh.app](https://squoosh.app).
2. In `content.ts` set `photo: 'images/profile.jpg'`.
3. Optional: delete `profile-placeholder.svg`.

### Replace the CV
Overwrite `public/cv/Bhakti_Priya_Mohanta_CV.pdf`, keeping the same name. If you rename it, update `profile.cv` in `content.ts`.

### Add project links
In `content.ts` → `projects`, fill in any of:
```ts
links: { live: 'https://…', github: 'https://github.com/Bhakti-eft/…', playStore: 'https://play.google.com/…', appStore: 'https://apps.apple.com/…' }
```
Empty or missing links are hidden automatically. If a project has no links, its `note` is shown instead, e.g. "Client project — code is private".
**Note:** `ASTRA` has placeholder chips because the CV doesn't list its stack. Add the real technologies to its `stack`.

### Enable the contact form (free, ~2 minutes)
1. Sign up at [formspree.io](https://formspree.io) → **New form** → copy the endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Local: create `.env.local` containing `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz`.
3. Hosting: add the same variable in the Vercel/Netlify env settings. On GitHub Pages, add a repository **variable** named `FORMSPREE_ENDPOINT`.

Without an endpoint, the form still works: it opens the visitor's email app with the message pre-filled. Your phone number is never displayed anywhere on the site.

### Social preview image
`public/og-image.png` is 1200×630. Replace it with your own design if you like, keeping the same size and name.

---

## 4. Deployment (free)

### A) GitHub Pages (via GitHub Actions)
1. Create a repo on GitHub, e.g. `portfolio-web`, and push:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Bhakti-eft/portfolio-web.git
   git push -u origin main
   ```
2. In the repo, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow `.github/workflows/deploy.yml` builds and deploys on every push to `main`. The site will be at `https://bhakti-eft.github.io/portfolio-web/`.

**Base path:** GitHub project sites are served from `/<repo-name>/`, so Vite's `base` must match.
- The workflow sets `VITE_BASE=/<repo-name>/` automatically, and `vite.config.ts` reads it (`base: env.VITE_BASE || '/'`).
- If you name the repo `Bhakti-eft.github.io` or use a custom domain, change `VITE_BASE` in the workflow to `/`.
- All asset links use the `asset()` helper, so they respect the base path.

### B) Vercel
1. Push to GitHub (step A1).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. The framework is detected as **Vite**.
3. **Environment variables:** set `VITE_SITE_URL` to your Vercel URL, e.g. `https://bhakti-portfolio.vercel.app` with no trailing slash. Optionally set `VITE_FORMSPREE_ENDPOINT`. Leave `VITE_BASE` unset, which defaults to `/`.
4. Click **Deploy**. Every push redeploys automatically.

### C) Netlify
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git** → choose the repo. `netlify.toml` already sets the build command and the `dist` folder.
2. Under **Site configuration → Environment variables**, add `VITE_SITE_URL` (your Netlify URL) and optionally `VITE_FORMSPREE_ENDPOINT`.
3. Deploy.

> `VITE_SITE_URL` feeds the canonical URL, Open Graph tags and JSON-LD. It must be the real public URL, or link previews won't show the image.

---

## 5. Pre-share checklist for recruiters

- [ ] Real photo added (`public/images/…` + `content.ts`), compressed under ~150 KB
- [ ] Latest CV PDF in `public/cv/`; the **Download CV** button opens the right file
- [ ] Store links added for Alhajz / Woohootrip / 94Booking; GitHub links added for academic projects
- [ ] ASTRA tech stack filled in
- [ ] Formspree endpoint set, and a test message received in your inbox
- [ ] `VITE_SITE_URL` matches the live URL; the preview checks out in [opengraph.xyz](https://www.opengraph.xyz) or LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Lighthouse (Chrome DevTools → Lighthouse, Mobile) checked: Performance 90+, Accessibility 95+, SEO 95+
- [ ] Tested at 360px, 768px and 1280px, in both light and dark themes
- [ ] Keyboard check: Tab through the page; focus rings are visible; the skip link works
- [ ] Turned on OS "Reduce motion" and confirmed the page is calm and fully usable
- [ ] No typos; dates and grades match the CV exactly
- [ ] The phone number does **not** appear anywhere. ⚠️ The current CV PDF **does** include it, so export a public copy without the phone number before deploying
- [ ] For GitHub Pages, set `VITE_SITE_URL` in the workflow if you use a custom domain
- [ ] Add the live URL to your CV, LinkedIn "Featured" section and GitHub profile README
