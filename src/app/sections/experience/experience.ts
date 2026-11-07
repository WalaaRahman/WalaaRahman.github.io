import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { EXPERIENCE, YearMonth } from '../../data/experience';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Bullets shown before "Show more". */
const COLLAPSED_COUNT = 4;

function formatMonth(d: YearMonth): string {
  return `${MONTHS[d.month - 1]} ${d.year}`;
}

/** Inclusive month count, e.g. Jan 2020 – Oct 2020 → "10 mos". */
function formatDuration(start: YearMonth, end: YearMonth): string {
  const total = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}

@Component({
  selector: 'app-experience',
  imports: [Reveal, SectionHeading],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'updateProgress()',
    '(window:resize)': 'updateProgress()',
  },
})
export class ExperienceSection {
  private readonly document = inject(DOCUMENT);
  private readonly timeline = viewChild<ElementRef<HTMLElement>>('timeline');

  protected readonly collapsedCount = COLLAPSED_COUNT;

  protected readonly items = (() => {
    const now = new Date();
    const today: YearMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
    return EXPERIENCE.map((job) => ({
      ...job,
      current: job.end === null,
      range: `${formatMonth(job.start)} — ${job.end ? formatMonth(job.end) : 'Present'}`,
      duration: formatDuration(job.start, job.end ?? today),
    }));
  })();

  /** 0 → 1: how far the timeline's progress line is filled. */
  protected readonly progress = signal(0);
  /** Number of timeline dots the progress line has reached. */
  protected readonly reached = signal(0);
  /** Indexes of entries whose full bullet list is shown. */
  protected readonly expanded = signal<ReadonlySet<number>>(new Set());

  constructor() {
    afterNextRender(() => this.updateProgress());
  }

  protected isExpanded(index: number): boolean {
    return this.expanded().has(index);
  }

  protected toggle(index: number): void {
    this.expanded.update((set) => {
      const next = new Set(set);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    // Height changed — recompute line fill.
    queueMicrotask(() => this.updateProgress());
  }

  protected updateProgress(): void {
    const el = this.timeline()?.nativeElement;
    const win = this.document.defaultView;
    if (!el || !win) return;

    const anchor = win.innerHeight * 0.6; // the line "pen" sits at 60% of the viewport
    const rect = el.getBoundingClientRect();
    const p = rect.height > 0 ? (anchor - rect.top) / rect.height : 0;
    this.progress.set(Math.min(1, Math.max(0, p)));

    const dots = el.querySelectorAll<HTMLElement>('[data-dot]');
    let count = 0;
    dots.forEach((dot) => {
      if (dot.getBoundingClientRect().top < anchor) count++;
    });
    this.reached.set(count);
  }
}
