import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Project } from '../../data/projects';
import { Spotlight } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-project-card',
  imports: [Spotlight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    @let p = project();
    <article
      appSpotlight
      class="group grid h-full overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15"
      [class]="featured() ? 'lg:grid-cols-[1.35fr_1fr] lg:items-center' : 'grid-rows-[auto_1fr]'"
    >
      <!-- Browser mockup -->
      <div class="p-3 sm:p-4" [class]="featured() ? 'lg:p-6' : ''">
        <button
          type="button"
          (click)="preview.emit()"
          class="relative block w-full overflow-hidden rounded-2xl border border-border bg-bg text-left shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          [attr.aria-label]="'Enlarge screenshot of ' + p.name"
        >
          <span class="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
            <span class="size-2.5 rounded-full bg-[#ff5f57]"></span>
            <span class="size-2.5 rounded-full bg-[#febc2e]"></span>
            <span class="size-2.5 rounded-full bg-[#28c840]"></span>
            <span class="ml-2 flex-1 truncate rounded-md bg-bg px-2.5 py-0.5 text-[11px] text-text/60">{{ host() }}</span>
          </span>
          <span class="relative block aspect-[16/10] overflow-hidden">
            <img
              [src]="p.image"
              [alt]="'Screenshot of ' + p.name"
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
              class="size-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
            <span
              class="absolute inset-0 grid place-items-center bg-primary/0 opacity-0 transition-all duration-500 group-hover:bg-primary/25 group-hover:opacity-100"
              aria-hidden="true"
            >
              <span
                class="inline-flex translate-y-3 items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-text shadow-xl transition-transform duration-500 group-hover:translate-y-0"
              >
                <svg class="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                </svg>
                Preview
              </span>
            </span>
          </span>
        </button>
      </div>

      <!-- Details -->
      <div class="flex flex-col px-6 pt-2 pb-6 sm:px-7 sm:pb-7" [class]="featured() ? 'lg:py-8 lg:pr-10 lg:pl-4' : ''">
        <p class="text-xs font-semibold tracking-widest text-secondary uppercase">{{ p.type }}</p>
        <h3 class="mt-2 font-extrabold tracking-tight" [class]="featured() ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'">
          {{ p.name }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-text/75 sm:text-[15px]">{{ p.description }}</p>

        <ul class="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          @for (tag of p.tags; track tag) {
            <li class="chip">{{ tag }}</li>
          }
        </ul>

        <div class="mt-auto pt-6">
          <a
            [href]="p.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group/link inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            Visit live site
            <svg class="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly featured = input(false);
  readonly preview = output<void>();

  protected readonly host = computed(() => new URL(this.project().url).host);
}
