export type EducationIcon = 'degree' | 'code' | 'certificate';

export interface Degree {
  title: string;
  field: string;
  institution: string;
  period: string;
  facts: { label: string; value: string; highlight?: boolean }[];
}

export interface Training {
  institution: string;
  /** Short name shown in the card badge. */
  short: string;
  year: string;
  kind: string;
  icon: EducationIcon;
  title: string;
  description?: string;
  points: string[];
  tags: string[];
  /** Rendered as the larger card in the grid. */
  featured?: boolean;
}

export const DEGREE: Degree = {
  title: 'Bachelor of Electrical Engineering',
  field: 'Communication and Electronics Section',
  institution: 'Faculty of Engineering, Alexandria University',
  period: '2012 — 2017',
  facts: [
    { label: 'Accumulative grade', value: 'Good' },
    { label: 'Graduation project', value: 'Indoor Building Solution' },
    { label: 'Project grade', value: 'Excellent', highlight: true },
  ],
};

export const TRAINING: readonly Training[] = [
  {
    institution: 'Information Technology Institute',
    short: 'ITI',
    featured: true,
    year: '2020',
    kind: 'Intensive 3-month program',
    icon: 'code',
    title: 'Full Stack Web Development using MEAN Stack',
    points: [
      'Completed intensive full-stack web development training using MongoDB, Express.js, Angular, and Node.js.',
      'Gained practical experience in frontend development, backend development, and database integration.',
      'Studied building web applications using Angular and TypeScript, developing server-side functionality with Node.js and Express.js, and managing data using MongoDB.',
      'Applied full-stack development concepts to build web application features and integrate frontend interfaces with backend services.',
    ],
    tags: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
  },
  {
    institution: 'National Telecommunication Institute',
    short: 'NTI',
    year: '2021',
    kind: 'Training program',
    icon: 'code',
    title: 'Web Development using PHP, MySQL & Laravel',
    points: [],
    tags: ['PHP', 'MySQL', 'Laravel'],
  },
  {
    institution: 'ISTQB',
    short: 'ISTQB',
    year: '2019',
    kind: 'Certification',
    icon: 'certificate',
    title: 'Foundation Level — Software Testing',
    description:
      'Practical training in SRS review, test scenarios, test cases, bug reporting, and retesting.',
    points: [],
    tags: ['SRS review', 'Test cases', 'Bug reporting'],
  },
];
