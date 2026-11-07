import {
  siAngular,
  siBootstrap,
  siClaude,
  siCss,
  siCursor,
  siFigma,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJira,
  siJquery,
  siMaterialdesign,
  siMysql,
  siPrimeng,
  siReact,
  siReactivex,
  siSass,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';

/** 24×24 icon: brand logos are filled paths, custom ones are stroked line icons. */
export interface SkillIcon {
  path: string;
  /** Brand color (hex without #). Omit to use the theme's primary color. */
  hex?: string;
  stroke?: boolean;
}

export interface Skill {
  name: string;
  icon: SkillIcon;
  note?: string;
  /** Marked as a core strength. */
  core?: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

const brand = (i: { path: string; hex: string }): SkillIcon => ({ path: i.path, hex: i.hex });
const line = (path: string): SkillIcon => ({ path, stroke: true });

/** Custom line icons for things without a brand logo. */
const ICON = {
  signals: line('M13 2 3 14h9l-1 8 10-12h-9l1-8Z'),
  standalone: line('M21 8 12 3 3 8v8l9 5 9-5V8Z M3 8l9 5 9-5 M12 13v8'),
  ngxBootstrap: brand(siBootstrap),
  chat: line('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z M12 6.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z'),
  database: line('M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Z M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6 M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3'),
  responsive: line('M3 4h13v10H3Z M6.5 18h6 M9.5 14v4 M17 9h4v11h-4Z'),
  components: line('M12 3 2 8l10 5 10-5-10-5Z M2 16l10 5 10-5 M2 12l10 5 10-5'),
  api: line('M4 8h14l-3-3 M20 16H6l3 3'),
  forms: line('M9 3h6v3H9Z M8 4.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1h-2 M9 14l2 2 4-4'),
  auth: line('M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z M9.5 12.5h5v3.5h-5Z M10.5 12.5v-1.5a1.5 1.5 0 0 1 3 0v1.5'),
  state: line('M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 9v3a3 3 0 0 0 3 3h6 M18 9v6'),
  debug: line('M9 7a3 3 0 0 1 6 0 M7 10h10v5a5 5 0 0 1-10 0v-5Z M12 10v10 M3 13h4 M17 13h4 M4 8l3 2 M20 8l-3 2 M4 19l3-2 M20 19l-3-2'),
  performance: line('M12 14l4-4 M3.5 18a10 10 0 1 1 17 0 M12 14h.01'),
};

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'Angular', icon: brand(siAngular), note: 'v22', core: true },
      { name: 'TypeScript', icon: brand(siTypescript), core: true },
      { name: 'JavaScript', icon: brand(siJavascript), note: 'ES6+' },
      { name: 'React', icon: brand(siReact) },
      { name: 'HTML5', icon: brand(siHtml5) },
      { name: 'CSS3', icon: brand(siCss) },
      { name: 'SCSS / Sass', icon: brand(siSass) },
      { name: 'Tailwind CSS', icon: brand(siTailwindcss) },
      { name: 'Bootstrap', icon: brand(siBootstrap) },
      { name: 'jQuery', icon: brand(siJquery) },
    ],
  },
  {
    id: 'angular',
    label: 'Angular ecosystem',
    skills: [
      { name: 'Standalone components', icon: ICON.standalone },
      { name: 'Signals', icon: ICON.signals },
      { name: 'RxJS', icon: brand(siReactivex) },
      { name: 'Angular Material', icon: brand(siMaterialdesign) },
      { name: 'PrimeNG', icon: brand(siPrimeng) },
      { name: 'ngx-bootstrap', icon: ICON.ngxBootstrap },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    skills: [
      { name: 'Responsive UI', icon: ICON.responsive },
      { name: 'Figma-to-code', icon: brand(siFigma) },
      { name: 'Reusable components', icon: ICON.components },
      { name: 'REST API integration', icon: ICON.api },
      { name: 'Forms & validation', icon: ICON.forms },
      { name: 'Authentication flows', icon: ICON.auth },
      { name: 'State management', icon: ICON.state },
      { name: 'Debugging', icon: ICON.debug },
      { name: 'Performance awareness', icon: ICON.performance },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & workflow',
    skills: [
      { name: 'Git', icon: brand(siGit) },
      { name: 'GitHub', icon: brand(siGithub) },
      { name: 'Jira', icon: brand(siJira) },
      { name: 'Claude', icon: brand(siClaude) },
      { name: 'Cursor', icon: brand(siCursor) },
      { name: 'ChatGPT', icon: ICON.chat },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    skills: [
      { name: 'SQL Server', icon: ICON.database },
      { name: 'MySQL', icon: brand(siMysql), note: 'Working knowledge' },
    ],
  },
];
