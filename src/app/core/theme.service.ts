import { DOCUMENT, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';
export type PaletteId = 'burgundy' | 'slate' | 'rosewood';

export interface PaletteSwatch {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Palette {
  id: PaletteId;
  name: string;
  light: PaletteSwatch;
  dark: PaletteSwatch;
}

/** Preview colors for the palette picker. The real tokens live in styles.css. */
export const PALETTES: readonly Palette[] = [
  {
    id: 'burgundy',
    name: 'Burgundy',
    light: { primary: '#5B1722', secondary: '#8A6255', accent: '#8A6255' },
    dark: { primary: '#A64D5B', secondary: '#C5ADA0', accent: '#C5ADA0' },
  },
  {
    id: 'slate',
    name: 'Slate Blue',
    light: { primary: '#344B63', secondary: '#587A91', accent: '#D4B98A' },
    dark: { primary: '#85A9C0', secondary: '#A8C0D0', accent: '#D4B98A' },
  },
  {
    id: 'rosewood',
    name: 'Rosewood',
    light: { primary: '#49332D', secondary: '#A16F69', accent: '#C49A91' },
    dark: { primary: '#BD8984', secondary: '#D0AAA0', accent: '#BD8984' },
  },
];

const MODE_KEY = 'portfolio-mode';
const PALETTE_KEY = 'portfolio-palette';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly palettes = PALETTES;

  // Initial values are read from <html>, which the inline script in index.html
  // has already updated from localStorage / prefers-color-scheme.
  readonly mode = signal<ThemeMode>(this.readInitialMode());
  readonly paletteId = signal<PaletteId>(this.readInitialPalette());

  readonly isDark = computed(() => this.mode() === 'dark');
  readonly palette = computed(() => PALETTES.find((p) => p.id === this.paletteId()) ?? PALETTES[0]);

  constructor() {
    effect(() => {
      const mode = this.mode();
      const palette = this.paletteId();
      if (!this.isBrowser) return;

      const root = this.document.documentElement;
      root.classList.toggle('dark', mode === 'dark');
      root.setAttribute('data-palette', palette);
      root.style.colorScheme = mode;
      try {
        localStorage.setItem(MODE_KEY, mode);
        localStorage.setItem(PALETTE_KEY, palette);
      } catch {
        /* storage unavailable (private mode) — ignore */
      }
    });
  }

  toggleMode(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  setPalette(id: PaletteId): void {
    this.paletteId.set(id);
  }

  private readInitialMode(): ThemeMode {
    if (!this.isBrowser) return 'light';
    return this.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  private readInitialPalette(): PaletteId {
    if (!this.isBrowser) return 'burgundy';
    const attr = this.document.documentElement.getAttribute('data-palette');
    return PALETTES.some((p) => p.id === attr) ? (attr as PaletteId) : 'burgundy';
  }
}
