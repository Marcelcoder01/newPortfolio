import { Component, ElementRef, ViewChild, afterNextRender, computed, inject, signal } from '@angular/core';
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
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  private readonly sectionState = inject(SectionStateService);

  @ViewChild('aboutSection', { static: true }) private sectionRef!: ElementRef<HTMLElement>;

  protected readonly description =
    'Desarrollador front-end enfocado en experiencias elegantes y escalables. ' +
    'Me apasiona diseñar arquitecturas limpias con Angular, optimizar rendimiento y crear interfaces accesibles.';

  protected readonly stack = [
    'Angular 18+',
    'Signals',
    'RxJS',
    'Angular Material',
    'PrimeNG',
    'NgRx',
    'TailwindCSS',
    'Unit-Testing',
  ];

  private readonly techInfo: Record<string, TechInfo> = {
    'Angular 18+': {
      name: 'Angular 18+',
      description: 'Arquitectura escalable con standalone components, control flow moderno y optimizaciones de rendimiento.',
      proficiency: 'Avanzado'
    },
    'Signals': {
      name: 'Signals',
      description: 'Manejo reactivo de estado con Signals de Angular, implementando patrones modernos de reactividad.',
      proficiency: 'Avanzado'
    },
    'RxJS': {
      name: 'RxJS',
      description: 'Programación reactiva con Observables, operadores avanzados y gestión eficiente de streams de datos.',
      proficiency: 'Avanzado'
    },
    'Angular Material': {
      name: 'Angular Material',
      description: 'Diseño de interfaces con componentes Material Design, theming personalizado y accesibilidad.',
      proficiency: 'Avanzado'
    },
    'PrimeNG': {
      name: 'PrimeNG',
      description: 'Biblioteca de componentes empresariales para construir aplicaciones complejas con UI rica.',
      proficiency: 'Avanzado'
    },
    'NgRx': {
      name: 'NgRx',
      description: 'Gestión de estado global con Redux pattern, effects, selectors y arquitectura escalable.',
      proficiency: 'Avanzado'
    },
    'TailwindCSS': {
      name: 'TailwindCSS',
      description: 'Estilos utility-first para desarrollo rápido, diseño responsive y mantenimiento eficiente.',
      proficiency: 'Avanzado'
    },
    'Unit-Testing': {
      name: 'Unit-Testing',
      description: 'Testing con Jest/Vitest, Jasmine y Karma. Cobertura de código y TDD en proyectos Angular.',
      proficiency: 'Intermedio-Avanzado'
    }
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


