import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionStateService } from '../../core/signals/section-state.service';

type TechInfo = {
  name: string;
  description: string;
  proficiency: string;
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  private readonly sectionState = inject(SectionStateService);

  @ViewChild('aboutSection', { static: true })
  private sectionRef!: ElementRef<HTMLElement>;

  protected readonly description =
    'Front-end developer focused on elegant, scalable experiences. ' +
    'I enjoy designing clean Angular architectures, optimizing performance, and creating accessible interfaces.';

  protected readonly stack = [
    'Angular 18+',
    'Signals',
    'RxJS',
    'Angular Material',
    'API Integration',
    'NgRx',
    'TailwindCSS',
    'Unit-Testing',
  ];

  private readonly techInfo: Record<string, TechInfo> = {
    'Angular 18+': {
      name: 'Angular 18+',
      description:
        'Scalable architecture with standalone components, modern control flow, and performance optimizations.',
      proficiency: 'Advanced',
    },
    Signals: {
      name: 'Signals',
      description:
        'Reactive state management with Angular Signals, implementing modern reactivity patterns.',
      proficiency: 'Advanced',
    },
    RxJS: {
      name: 'RxJS',
      description:
        'Reactive programming with Observables, advanced operators, and efficient stream management.',
      proficiency: 'Advanced',
    },
    'Angular Material': {
      name: 'Angular Material',
      description:
        'Interface design with Material Design components, custom theming, and accessibility.',
      proficiency: 'Advanced',
    },
    'API Integration': {
      name: 'API Integration',
      description:
        'Integration with REST and GraphQL APIs, handling data fetching and state management.',
      proficiency: 'Advanced',
    },
    NgRx: {
      name: 'NgRx',
      description:
        'Global state management with the Redux pattern, effects, selectors, and scalable architecture.',
      proficiency: 'Advanced',
    },
    TailwindCSS: {
      name: 'TailwindCSS',
      description:
        'Utility-first styling for rapid development, responsive design, and efficient maintenance.',
      proficiency: 'Advanced',
    },
    'Unit-Testing': {
      name: 'Unit-Testing',
      description:
        'Testing with Jest/Vitest, Jasmine, and Karma. Code coverage and TDD in Angular projects.',
      proficiency: 'Intermediate-Advanced',
    },
  };

  protected readonly selectedTech = signal<string | null>(null);

  protected readonly selectedTechInfo = computed(() => {
    const tech = this.selectedTech();
    return tech ? this.techInfo[tech] : null;
  });

  constructor() {
    afterNextRender(() => {
      this.sectionState.registerSection('about', this.sectionRef.nativeElement);
    });
  }

  protected onTechClick(tech: string, event: Event): void {
    event.stopPropagation();

    if (this.selectedTech() === tech) {
      this.selectedTech.set(null);
    } else {
      this.selectedTech.set(tech);
    }
  }

  protected closeTechInfo(): void {
    this.selectedTech.set(null);
  }
}
