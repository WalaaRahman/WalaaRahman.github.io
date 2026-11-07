import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Soft glow that follows the cursor across a card.
 * Usage: `<div appSpotlight class="...">` (styles in styles.css under `.spotlight`).
 */
@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spotlight',
    '(pointermove)': 'onMove($event)',
  },
})
export class Spotlight {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onMove(event: PointerEvent): void {
    const rect = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
