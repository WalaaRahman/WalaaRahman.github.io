import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';

export type RevealVariant = '' | 'up' | 'left' | 'right' | 'zoom';

/**
 * Animates an element into view the first time it scrolls into the viewport.
 * Usage: `<div appReveal>`, `<div appReveal="left" [revealDelay]="150">`.
 * Styles live in styles.css under `[data-reveal]`.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[attr.data-reveal]': 'appReveal() || "up"',
    '[class.is-revealed]': 'visible()',
    '[style.--reveal-delay]': 'revealDelay() + "ms"',
  },
})
export class Reveal {
  readonly appReveal = input<RevealVariant>('');
  readonly revealDelay = input(0);

  protected readonly visible = signal(false);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
