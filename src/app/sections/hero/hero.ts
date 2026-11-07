import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PROFILE } from '../../data/profile';

type TokenKind = 'kw' | 'str' | 'fn' | 'prop' | 'punc' | 'dec';
interface CodeToken {
  k: TokenKind;
  v: string;
}

const t = (k: TokenKind, v: string): CodeToken => ({ k, v });

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly document = inject(DOCUMENT);
  protected readonly profile = PROFILE;

  /** Code shown in the decorative editor card (tokenized for syntax colors). */
  protected readonly codeLines: readonly (readonly CodeToken[])[] = [
    [t('dec', '@Component'), t('punc', '({ '), t('prop', 'selector'), t('punc', ': '), t('str', "'app-walaa'"), t('punc', ' })')],
    [t('kw', 'export class '), t('fn', 'FrontendDeveloper'), t('punc', ' {')],
    [t('prop', '  name'), t('punc', ' = '), t('fn', 'signal'), t('punc', '('), t('str', "'Walaa El Gohary'"), t('punc', ');')],
    [t('prop', '  stack'), t('punc', ' = ['), t('str', "'Angular'"), t('punc', ', '), t('str', "'TypeScript'"), t('punc', ', '), t('str', "'RxJS'"), t('punc', '];')],
    [t('prop', '  experience'), t('punc', ' = '), t('fn', 'computed'), t('punc', '(() => '), t('str', "'4+ years'"), t('punc', ');')],
    [t('prop', '  focus'), t('punc', ' = '), t('str', "'pixel-perfect, accessible UI'"), t('punc', ';')],
    [t('punc', '}')],
  ];

  protected readonly tokenClass: Record<TokenKind, string> = {
    kw: 'text-primary font-semibold',
    dec: 'text-secondary',
    fn: 'text-primary',
    str: 'text-secondary',
    prop: 'text-text',
    punc: 'text-text/60',
  };

  // ---------- Typewriter ----------
  private readonly lineLengths = this.codeLines.map((line) => line.reduce((n, tok) => n + tok.v.length, 0));
  private readonly totalChars = this.lineLengths.reduce((a, b) => a + b, 0);

  /** Number of characters typed so far. */
  protected readonly typed = signal(0);
  /** Caret blinks while idle (waiting / holding), stays solid while typing or erasing. */
  protected readonly idle = signal(true);

  /** Code lines truncated to what has been "typed" so far. */
  protected readonly visibleLines = computed(() => {
    let remaining = this.typed();
    return this.codeLines.map((line) => {
      const out: CodeToken[] = [];
      for (const tok of line) {
        if (remaining <= 0) break;
        const v = tok.v.slice(0, remaining);
        remaining -= v.length;
        out.push({ k: tok.k, v });
      }
      return out;
    });
  });

  /** Line the caret is currently on. */
  protected readonly cursorLine = computed(() => {
    let remaining = this.typed();
    for (let i = 0; i < this.lineLengths.length; i++) {
      if (remaining <= this.lineLengths[i]) return i;
      remaining -= this.lineLengths[i];
    }
    return this.lineLengths.length - 1;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Browser only: SSR renders an empty editor, then the client types it out.
    afterNextRender(() => {
      const win = this.document.defaultView;
      if (!win) return;
      if (win.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.typed.set(this.totalChars);
        return;
      }

      let timer: ReturnType<typeof setTimeout>;
      const lineEnds = new Set(this.lineLengths.map((_, i) => this.lineLengths.slice(0, i + 1).reduce((a, b) => a + b, 0)));
      const HOLD_MS = 3500; // how long the finished code stays on screen
      const RESTART_MS = 600; // pause on the empty editor before retyping

      // Loop: type → hold → erase → short pause → type again.
      const type = () => {
        this.idle.set(false);
        this.typed.update((n) => n + 1);
        if (this.typed() >= this.totalChars) {
          this.idle.set(true);
          timer = setTimeout(erase, HOLD_MS);
          return;
        }
        // Human-ish rhythm: random per-key delay, longer pause at the end of each line.
        timer = setTimeout(type, lineEnds.has(this.typed()) ? 350 : 25 + Math.random() * 45);
      };

      const erase = () => {
        this.idle.set(false);
        this.typed.update((n) => Math.max(0, n - 3)); // backspace a few chars per tick
        if (this.typed() === 0) {
          this.idle.set(true);
          timer = setTimeout(type, RESTART_MS);
          return;
        }
        timer = setTimeout(erase, 18);
      };

      timer = setTimeout(type, 900); // start after the card fades in
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }

  protected scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
