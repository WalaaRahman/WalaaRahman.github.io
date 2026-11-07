# myPortfolio

this repo includes my frontend portfolio

Personal portfolio of **Walaa El Gohary**, Frontend Developer, built with **Angular 22** (standalone components and Signals), **Tailwind CSS v4** and server-side rendering / prerendering.

## Features

- **Theming:** light/dark mode plus 3 color palettes (Burgundy, Slate Blue, Rosewood). The choice is saved and applied before first paint, so the page doesn't flash the wrong theme.
- **Sections:** a hero with a looping typewriter code card, an experience timeline, education and training, core skills with brand icons and category filters, selected projects with live-site screenshots and a lightbox, and contact via email and WhatsApp.
- **Animations:** scroll-reveal, a cursor spotlight on cards, and a timeline line that fills as you scroll. All of these respect `prefers-reduced-motion`.
- **Responsive and accessible:** a mobile menu, keyboard support (Esc and arrow keys in the lightbox), ARIA roles and labels.

**Live site:** https://walaarahman.github.io/

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It installs dependencies, runs the tests, builds the static prerendered site and publishes it to GitHub Pages.

## Getting started

```bash
npm install
npm start          # dev server at http://localhost:4200
npm run build      # production build + prerender → dist/portfolio
npm test           # unit tests (Vitest)
```

> Restart `ng serve` after changing `angular.json`, `tsconfig*.json`, `.postcssrc.json`, or installing packages. The dev server only reads those files at startup.

## Editing content

All text comes from typed data files in [`src/app/data/`](src/app/data/):

| File | Content |
| --- | --- |
| `profile.ts` | Name, title, contact details, GitHub, summary, hero stats |
| `experience.ts` | Jobs, dates, highlights, tags |
| `education.ts` | Degree, training programs, certification |
| `skills.ts` | Skill categories and icons ([simple-icons](https://simpleicons.org) + custom line icons) |
| `projects.ts` | Projects, links, descriptions, tags. Screenshots live in `public/projects/` |

Palette colors are CSS variables in [`src/styles.css`](src/styles.css), and the palette list is in [`src/app/core/theme.service.ts`](src/app/core/theme.service.ts).

## Project structure

```
src/app/
├── core/       theme.service.ts (mode + palette signals)
├── data/       content (see above)
├── layout/     navbar, footer
├── sections/   hero, experience, education, skills, projects, contact
└── shared/     reveal & spotlight directives, section heading
```
