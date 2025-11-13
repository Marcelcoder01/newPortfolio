import {
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  afterNextRender,
  inject
} from '@angular/core';
import { SectionStateService } from '../../core/signals/section-state.service';
import { CommonModule } from '@angular/common';

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  private readonly sectionState = inject(SectionStateService);

  @ViewChild('experienceSection', { static: true }) private sectionRef!: ElementRef<HTMLElement>;


  protected readonly experiences: Experience[] = [
    {
      role: 'Lead Front-End Engineer',
      company: 'Aktrion Group · Híbrido',
      period: '2024 — Actualidad',
      description:
        'Lidero la arquitectura front-end en Angular, aplicando principios de arquitectura limpia, optimización de rendimiento y gestión de estado. Enfocado en la escalabilidad, mantenibilidad y calidad del código.'
    },
    {
      role: 'Front-End Developer',
      company: 'Ingematic Consulting',
      period: '2023 — 2024',
      description:
        'Diseñé interfaces modulares con Angular Material, priorizando el rendimiento, la usabilidad y la consistencia visual. Colaboré en la definición de buenas prácticas de desarrollo y diseño.'
    },
    {
      role: 'Full-Stack Developer',
      company: 'Workana / Codenotch Dev',
      period: '2022 — 2023',
      description:
'Desarrollo de aplicaciones web full-stack con Angular y Node.js. Implementación de componentes reutilizables, conexión con APIs REST y despliegues básicos.'    }
  ];

  constructor() {
    afterNextRender(() => {
      this.sectionState.registerSection('experience', this.sectionRef.nativeElement);
    });
  }
}


