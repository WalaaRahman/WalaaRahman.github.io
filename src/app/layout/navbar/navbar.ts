import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { PaletteId, ThemeService } from '../../core/theme.service';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeAll()',
  },
})
export class Navbar {
  protected readonly theme = inject(ThemeService);
  private readonly document = inject(DOCUMENT);

  protected readonly links: readonly NavLink[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly scrolled = signal(false);
  protected readonly activeSection = signal<string>('');
  protected readonly menuOpen = signal(false);
  protected readonly paletteOpen = signal(false);

  private readonly paletteRoot = viewChild<ElementRef<HTMLElement>>('paletteRoot');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Scroll-spy: highlight the link of the section currently in view.
    afterNextRender(() => {
      this.onScroll();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeSection.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const link of this.links) {
        const el = this.document.getElementById(link.id);
        if (el) observer.observe(el);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onScroll(): void {
    const y = this.document.defaultView?.scrollY ?? 0;
    this.scrolled.set(y > 12);
  }

  protected onDocumentClick(event: MouseEvent): void {
    const root = this.paletteRoot()?.nativeElement;
    if (root && !root.contains(event.target as Node)) this.paletteOpen.set(false);
  }

  protected closeAll(): void {
    this.paletteOpen.set(false);
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    this.paletteOpen.set(false);
  }

  protected togglePalette(): void {
    this.paletteOpen.update((v) => !v);
  }

  protected selectPalette(id: PaletteId): void {
    this.theme.setPalette(id);
    this.paletteOpen.set(false);
  }

  protected navigate(event: Event, id: string): void {
    event.preventDefault();
    this.menuOpen.set(false);
    const target = id ? this.document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
