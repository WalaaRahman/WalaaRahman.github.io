import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal.directive';

@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div appReveal class="mx-auto max-w-2xl text-center">
      <p class="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-secondary uppercase">
        <span class="h-px w-6 bg-secondary/60"></span>
        {{ eyebrow() }}
        <span class="h-px w-6 bg-secondary/60"></span>
      </p>
      <h2 [id]="headingId()" class="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p class="mt-4 text-base text-text/70 sm:text-lg">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly headingId = input<string>('');
}
