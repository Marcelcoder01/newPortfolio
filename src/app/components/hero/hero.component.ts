import { Component, ElementRef, ViewChild, afterNextRender, inject, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SectionStateService } from '../../core/signals/section-state.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnDestroy {
  private readonly sectionState = inject(SectionStateService);

  @ViewChild('profileSection', { static: true }) private sectionRef!: ElementRef<HTMLElement>;

  protected readonly experienceRange = '2022 — 2025';
  protected readonly quote =
    '“La habilidad y los conocimientos suman, la actitud multiplica”  - Victor Küppers';
  protected readonly emailAddress = 'marcel.soto324@gmail.com';

  protected showEmail = false;
  protected emailCopied = false;

  private copyResetTimeoutId: number | null = null;

  constructor() {
    afterNextRender(() => {
      const element = this.sectionRef.nativeElement;
      this.sectionState.registerSection('profile', element);
    });
  }

  protected downloadCv(): void {
    const fileId = '1GKtIWFt2K6sKTMMCWyxKOx9FjoUbzkWK';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'CV.pdf'; 
    link.target = '_blank';
    link.click();
  
  }

  protected contactMe(): void {
    this.showEmail = true;
    this.emailCopied = false;

  }

  protected async copyEmail(): Promise<void> {
    const text = this.emailAddress;

    if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        this.setEmailCopiedState(true);
        return;
      } catch (error) {
        console.error('No se pudo copiar el email al portapapeles:', error);
      }
    }

    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${text}`;
    }
  }

  ngOnDestroy(): void {
    if (this.copyResetTimeoutId !== null) {
      window.clearTimeout(this.copyResetTimeoutId);
    }
  }

  private setEmailCopiedState(state: boolean): void {
    this.emailCopied = state;

    if (this.copyResetTimeoutId !== null) {
      window.clearTimeout(this.copyResetTimeoutId);
    }

    if (state) {
      this.copyResetTimeoutId = window.setTimeout(() => {
        this.emailCopied = false;
        this.copyResetTimeoutId = null;
      }, 2600);
    }
  }
}


