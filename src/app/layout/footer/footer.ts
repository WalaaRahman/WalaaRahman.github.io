import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { siWhatsapp } from 'simple-icons';
import { PROFILE } from '../../data/profile';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-border bg-surface/60">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div class="flex items-center gap-3">
          <span class="grid size-9 place-items-center rounded-xl bg-primary text-sm font-extrabold text-on-primary">WG</span>
          <div>
            <p class="font-bold">{{ profile.name }}</p>
            <p class="text-xs text-text/60">{{ profile.title }} · {{ profile.location }}</p>
          </div>
        </div>

        <p class="order-last text-center text-xs text-text/60 md:order-none">
          © {{ year }} {{ profile.name }}. Built with Angular, Signals &amp; Tailwind CSS.
        </p>

        <div class="flex items-center gap-2">
          @for (link of links; track link.label) {
            <a
              [href]="link.href"
              [attr.target]="link.external ? '_blank' : null"
              [attr.rel]="link.external ? 'noopener noreferrer' : null"
              class="grid size-10 place-items-center rounded-xl border border-border bg-surface text-text/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              [attr.aria-label]="link.label"
            >
              <svg class="size-5" viewBox="0 0 24 24" [attr.fill]="link.stroke ? 'none' : 'currentColor'" [attr.stroke]="link.stroke ? 'currentColor' : null" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path [attr.d]="link.path" />
              </svg>
            </a>
          }
          <button
            type="button"
            (click)="toTop()"
            class="group ml-2 grid size-10 place-items-center rounded-xl bg-primary text-on-primary shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
            aria-label="Back to top"
          >
            <svg class="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  private readonly document = inject(DOCUMENT);
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();

  protected readonly links = [
    { label: 'Email', href: `mailto:${PROFILE.email}`, external: false, stroke: true, path: 'M5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9A2.5 2.5 0 0 1 5.5 5Z M4 7l8 6 8-6' },
    { label: 'WhatsApp', href: `https://wa.me/${PROFILE.whatsapp}`, external: true, stroke: false, path: siWhatsapp.path },
    {
      label: 'GitHub',
      href: PROFILE.github,
      external: true,
      stroke: false,
      path: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z',
    },
  ];

  protected toTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
