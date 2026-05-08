# Kunal Suvo Saha Portfolio

Modern responsive developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, React Icons, and React Scroll.

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy To Vercel

This project includes `vercel.json` with:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite fallback to `index.html`

Import the repository into Vercel and deploy with the default detected settings.

## Customize

- Update personal/social links in `src/components/Hero.jsx` and `src/components/Contact.jsx`.
- Replace placeholder projects in `src/data/projects.js`.
- Replace project image URLs with real screenshots when available.
- Adjust skills in `src/data/skills.js`.
