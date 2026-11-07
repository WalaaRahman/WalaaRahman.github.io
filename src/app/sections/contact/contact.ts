import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { siWhatsapp } from 'simple-icons';
import { PROFILE } from '../../data/profile';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';
import { Spotlight } from '../../shared/spotlight.directive';

type Channel = 'email' | 'whatsapp';

@Component({
  selector: 'app-contact',
  imports: [Reveal, SectionHeading, Spotlight],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSection {
  private readonly document = inject(DOCUMENT);
  protected readonly profile = PROFILE;
  protected readonly whatsappPath = siWhatsapp.path;

  protected readonly emailHref = `mailto:${PROFILE.email}`;
  protected readonly whatsappHref = `https://wa.me/${PROFILE.whatsapp}`;

  // ---------- Copy to clipboard ----------
  protected readonly copied = signal<Channel | null>(null);
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  // ---------- Quick message composer (no backend: opens mail app / WhatsApp) ----------
  protected readonly name = signal('');
  protected readonly message = signal('');
  protected readonly touched = signal(false);

  protected readonly nameError = computed(() => (this.name().trim() ? '' : 'Please enter your name.'));
  protected readonly messageError = computed(() =>
    this.message().trim().length >= 10 ? '' : 'Please write a message (at least 10 characters).',
  );
  protected readonly valid = computed(() => !this.nameError() && !this.messageError());
  protected readonly remaining = computed(() => 1000 - this.message().length);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer));
  }

  protected async copy(channel: Channel): Promise<void> {
    const text = channel === 'email' ? PROFILE.email : PROFILE.phoneDisplay;
    try {
      await this.document.defaultView?.navigator.clipboard.writeText(text);
      this.copied.set(channel);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(null), 2000);
    } catch {
      /* clipboard blocked — the value is still visible to copy manually */
    }
  }

  protected send(channel: Channel): void {
    this.touched.set(true);
    if (!this.valid()) return;

    const name = this.name().trim();
    const message = this.message().trim();
    const win = this.document.defaultView;
    if (!win) return;

    if (channel === 'email') {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}`);
      win.location.href = `${this.emailHref}?subject=${subject}&body=${body}`;
    } else {
      const text = encodeURIComponent(`Hi Walaa, I'm ${name}.\n\n${message}`);
      win.open(`${this.whatsappHref}?text=${text}`, '_blank', 'noopener');
    }
  }
}
