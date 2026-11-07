import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SKILL_CATEGORIES, Skill } from '../../data/skills';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';
import { Spotlight } from '../../shared/spotlight.directive';

interface SkillView extends Skill {
  /** CSS color for the icon. */
  color: string;
  /** Soft tinted background behind the icon. */
  tint: string;
}

/** Relative luminance of a hex color (0 = black, 1 = white). */
function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function toView(skill: Skill): SkillView {
  // Near-black logos (Angular, GitHub, Cursor) would vanish in dark mode → use the text color.
  const hex = skill.icon.hex;
  const color = !hex ? 'var(--primary)' : luminance(hex) < 0.03 ? 'var(--text)' : `#${hex}`;
  return { ...skill, color, tint: `color-mix(in srgb, ${color} 12%, transparent)` };
}

@Component({
  selector: 'app-skills',
  imports: [Reveal, SectionHeading, Spotlight],
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsSection {
  private readonly categories = SKILL_CATEGORIES.map((c) => ({ ...c, skills: c.skills.map(toView) }));
  private readonly all = this.categories.flatMap((c) => c.skills);

  protected readonly tabs = [
    { id: 'all', label: 'All', count: this.all.length },
    ...this.categories.map((c) => ({ id: c.id, label: c.label, count: c.skills.length })),
  ];

  protected readonly activeTab = signal('all');

  protected readonly visibleSkills = computed(() => {
    const id = this.activeTab();
    return id === 'all' ? this.all : (this.categories.find((c) => c.id === id)?.skills ?? []);
  });

  protected select(id: string): void {
    this.activeTab.set(id);
  }
}
