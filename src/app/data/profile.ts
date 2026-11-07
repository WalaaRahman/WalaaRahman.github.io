/** Single source of truth for personal info used across sections. */
export const PROFILE = {
  name: 'Walaa El Gohary',
  firstName: 'Walaa',
  title: 'Frontend Developer',
  location: 'Alexandria, Egypt',
  email: 'w.gohary46@gmail.com',
  phone: '01008542804',
  /** International format for wa.me links (Egypt +20). */
  whatsapp: '201008542804',
  phoneDisplay: '+20 100 854 2804',
  github: 'https://github.com/WalaaRahman',
  summary: [
    'Frontend Developer with 4+ years of professional experience building responsive web applications and interactive user experiences. Strongest in Angular and TypeScript, with additional experience in React, JavaScript, and modern frontend libraries.',
    'Experienced in collaborating with UI/UX designers to translate Figma designs into accurate, pixel-perfect, accessible, and responsive interfaces, integrating frontend applications with backend APIs, and building reusable components for maintainable products.',
    'Uses AI-assisted development tools—including Claude, Cursor, and ChatGPT—to support planning, code exploration, debugging, and refactoring, while reviewing and validating generated output.',
  ],
  highlights: [
    { value: '4+', label: 'Years of experience' },
    { value: 'v22', label: 'Latest Angular' },
    { value: '5', label: 'Selected projects' },
  ],
} as const;
