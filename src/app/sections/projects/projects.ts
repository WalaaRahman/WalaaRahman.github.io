import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PROJECTS } from '../../data/projects';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';
import { ProjectCard } from './project-card';

@Component({
  selector: 'app-projects',
  imports: [Reveal, SectionHeading, ProjectCard],
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
})
export class ProjectsSection {
  private readonly document = inject(DOCUMENT);

  protected readonly projects = PROJECTS;
  protected readonly featured = PROJECTS.filter((p) => p.featured);
  protected readonly others = PROJECTS.filter((p) => !p.featured);

  /** Index into `projects` of the screenshot open in the lightbox, or null. */
  protected readonly lightbox = signal<number | null>(null);
  protected readonly current = computed(() => {
    const i = this.lightbox();
    return i === null ? null : this.projects[i];
  });

  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private returnFocus: HTMLElement | null = null;

  constructor() {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    // Lock page scroll and move focus into the dialog while it is open.
    effect(() => {
      const open = this.lightbox() !== null;
      if (!isBrowser) return;
      this.document.body.style.overflow = open ? 'hidden' : '';
      if (open) this.closeBtn()?.nativeElement.focus();
    });
  }

  protected open(project: (typeof PROJECTS)[number]): void {
    this.returnFocus = this.document.activeElement as HTMLElement | null;
    this.lightbox.set(this.projects.indexOf(project));
  }

  protected close(): void {
    this.lightbox.set(null);
    this.returnFocus?.focus();
  }

  protected step(delta: number): void {
    const n = this.projects.length;
    this.lightbox.update((i) => (i === null ? null : (i + delta + n) % n));
  }

  protected onKey(event: KeyboardEvent): void {
    if (this.lightbox() === null) return;
    if (event.key === 'Escape') this.close();
    else if (event.key === 'ArrowRight') this.step(1);
    else if (event.key === 'ArrowLeft') this.step(-1);
  }
}
