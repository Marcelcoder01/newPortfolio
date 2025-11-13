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
      company: 'Aktrion Group · Hybrid',
      period: '2024 — Present',
      description:
        'I lead the front-end architecture in Angular, applying clean architecture principles, performance optimization, and state management. Focused on scalability, maintainability, and code quality.'
    },
    {
      role: 'Front-End Developer',
      company: 'Ingematic Consulting',
      period: '2023 — 2024',
      description:
        'Designed modular interfaces with Angular Material, prioritizing performance, usability, and visual consistency. Collaborated on defining development and design best practices.'
    },
    {
      role: 'Full-Stack Developer',
      company: 'Workana / Codenotch Dev',
      period: '2022 — 2023',
      description:
        'Developed full-stack web applications using Angular and Node.js. Implemented reusable components, integrated REST APIs, and performed basic deployments.'
    }
  ];

  constructor() {
    afterNextRender(() => {
      this.sectionState.registerSection('experience', this.sectionRef.nativeElement);
    });
  }
}


