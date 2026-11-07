export interface YearMonth {
  year: number;
  /** 1–12 */
  month: number;
}

export interface Experience {
  company: string;
  role: string;
  initials: string;
  start: YearMonth;
  /** `null` = current position. */
  end: YearMonth | null;
  highlights: string[];
  tags: string[];
}

export const EXPERIENCE: readonly Experience[] = [
  {
    company: 'POMAC',
    role: 'Frontend Developer',
    initials: 'PO',
    start: { year: 2025, month: 12 },
    end: null,
    highlights: [
      'Develop and maintain complex frontend applications using Angular, TypeScript, RxJS, and modern Angular features.',
      'Translate Figma designs into responsive, pixel-perfect interfaces while collaborating with UI/UX designers and backend developers.',
      'Build reusable, scalable UI components and shared frontend architecture to improve maintainability and consistency.',
      'Implement complex business workflows involving authentication, role-based permissions, project management, service operations, and financial transactions.',
      'Integrate RESTful APIs and handle application state, data validation, error handling, and asynchronous operations.',
      'Develop responsive data-driven interfaces, including dynamic tables, filtering, sorting, pagination, and reusable forms.',
      'Contribute to frontend performance optimization, debugging, and code quality improvements.',
      'Leverage AI-assisted development tools such as Claude, Cursor, and ChatGPT for code exploration, planning, debugging, and refactoring while validating generated solutions.',
    ],
    tags: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'Figma', 'AI-assisted dev'],
  },
  {
    company: 'Cadeceuslane Marketing Agency',
    role: 'Frontend Developer',
    initials: 'CL',
    start: { year: 2024, month: 10 },
    end: { year: 2025, month: 9 },
    highlights: [
      'Developed web interfaces using Angular, React, TypeScript, Tailwind CSS, and other frontend libraries.',
      'Developed a desktop application using Angular and TypeScript.',
    ],
    tags: ['Angular', 'React', 'TypeScript', 'Tailwind CSS', 'Desktop app'],
  },
  {
    company: 'Sphinx Publishing',
    role: 'Frontend Developer',
    initials: 'SP',
    start: { year: 2022, month: 1 },
    end: { year: 2024, month: 9 },
    highlights: [
      'Developed interactive exercises and games using JavaScript for online education platforms.',
      'Created interactive e-books and assessments using HTML, CSS, jQuery, and JavaScript for online and offline use.',
    ],
    tags: ['JavaScript', 'HTML5', 'CSS3', 'jQuery', 'E-learning'],
  },
  {
    company: 'Integrated Solutions for Ports',
    role: 'Software Tester',
    initials: 'IS',
    start: { year: 2020, month: 1 },
    end: { year: 2020, month: 10 },
    highlights: [
      'Reviewed change request documents and prepared test data and test cases.',
      'Documented issues in Jira for port-related modules and supported the testing and retesting cycle.',
    ],
    tags: ['Manual testing', 'Test cases', 'Jira'],
  },
];
