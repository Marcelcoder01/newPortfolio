import { Component, ElementRef, ViewChild, afterNextRender, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SectionStateService } from '../../core/signals/section-state.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  private readonly sectionState = inject(SectionStateService);

  @ViewChild('heroSection', { static: true }) private sectionRef!: ElementRef<HTMLElement>;

  protected readonly experienceRange = '2022 — 2025';
  protected readonly quote =
    '“La habilidad y los conocimientos suman, la actitud multiplica”  - Victor Küppers';

  constructor() {
    afterNextRender(() => {
      const element = this.sectionRef.nativeElement;
      this.sectionState.registerSection('profile', element);
    });
  }

  protected downloadCv(): void {
    // Placeholder para futura implementación
    console.info('Download CV');
  }

  protected contactMe(): void {
    const contactElement = document.getElementById('contact');
    contactElement?.scrollIntoView({ behavior: 'smooth' });
  }
}


