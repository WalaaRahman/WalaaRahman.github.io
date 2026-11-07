export interface Project {
  name: string;
  type: string;
  url: string;
  /** Path under /public. Screenshots are 1440×900. */
  image: string;
  description: string;
  tags: string[];
  /** Shown as the large card at the top. */
  featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    name: 'Shuwier',
    type: 'Consulting marketplace',
    url: 'https://shuwier.com/',
    image: 'projects/shuwier.webp',
    description:
      'A bilingual platform that connects users with service providers to consult, connect and achieve results — with service search, provider discovery and separate journeys for users and service providers.',
    tags: ['Angular', 'TypeScript', 'PrimeNG', 'RxJS', 'REST APIs'],
    featured: true,
  },
  {
    name: 'Shuwier Dashboard',
    type: 'Admin dashboard',
    url: 'https://admin.shuwier.com/',
    image: 'projects/shuwier-dashboard.webp',
    description:
      'The admin panel behind Shuwier: revenue and registration analytics, admin and user management, content moderation, validation requests, disputes, transaction reports and broadcasts.',
    tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'Charts', 'Role-based access'],
  },
  {
    name: 'Caduceus Lane',
    type: 'Marketing website',
    url: 'https://caduceuslane.com/',
    image: 'projects/cadeceuslane.webp',
    description:
      'A premium, animation-rich website for a healthcare marketing company covering pharmaceuticals, health technologies, medical innovations and healthcare services.',
    tags: ['React', 'JavaScript', 'Animations', 'Responsive UI'],
  },
  {
    name: 'Consensus',
    type: 'Clinical insights web app',
    url: 'https://app.consensus-insights.com/',
    image: 'projects/consensus.webp',
    description:
      'A secure web application for streaming clinical insights, with authentication-protected access and a polished, glass-style interface.',
    tags: ['React', 'PrimeReact', 'Tailwind CSS', 'Authentication'],
  },
  {
    name: 'Exhibit',
    type: 'E-commerce platform',
    url: 'https://www.e-exhibit.com/',
    image: 'projects/exhibit.webp',
    description:
      'An online store for customizable 3D booths, event items and virtual environments for events and exhibitions, with search, cart and wishlist.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'E-commerce'],
  },
];
