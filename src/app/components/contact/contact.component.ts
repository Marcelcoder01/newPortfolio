import {
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  afterNextRender,
  inject
} from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ReferenceCardComponent } from '../../shared/ui/reference-card/reference-card.component';
import { SectionStateService } from '../../core/signals/section-state.service';

type Reference = {
  title: string;
  subtitle: string;
  description: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonComponent, ReferenceCardComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private readonly sectionState = inject(SectionStateService);

  @ViewChild('contactSection', { static: true }) private sectionRef!: ElementRef<HTMLElement>;


  protected readonly references: Reference[] = [
    {
      title: 'Rafael Oriol',
      subtitle: 'Back-end Developer - Aktrion Group',
      description:
        '“Marcel destaca por sus habilidades en el Front, es una persona ágil y con unas habilidades comunicativas muy eficientes”'
    },
    {
      title: 'Ester Sanchez Jimenez',
      subtitle: 'Full-stack Developer',
      description:
        '“Marcel es un desarrollador frontend excepcional. Su habilidad para resolver problemas y su compromiso con la calidad son evidentes en cada proyecto.”'
    },
    
  ];

  protected readonly blogs = [
    {
      title: 'Arquitectura Angular Avanzada',
      subtitle: 'Programación declarativa con RxJS y Angular',
      description: 'Cómo este enfoque permite construir aplicaciones más reactivas, escalables y mantenibles, mediante el uso de flujos de datos y operadores funcionales.',
      actionUrl: 'https://careers.edicomgroup.com/blogtech/frontend-programacion-declarativa-con-rxjs-y-angular/#punto5.5'
    },
    {
      title: 'Pet network',
      subtitle: 'Open Source',
      description: 'Aplicacion hecha por puro hobby, donde he creado componentes UI customizados con Angular Material y puse en marcha un flujo 100% reactivo, sin suscripciones con standalone components y unit-testing.',
      actionUrl: 'https://github.com'
    }
  ];

  protected readonly socialLinks = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/marceldeveloper/', icon: 'ri-linkedin-fill' },
    { label: 'GitHub', url: 'https://github.com/Marcelcoder01', icon: 'ri-github-fill' },
    { label: 'Email', url: 'mailto:marcel.soto324@gmail.com', icon: 'ri-mail-send-fill' }
  ];

  constructor() {
    afterNextRender(() => {
      this.sectionState.registerSection('contact', this.sectionRef.nativeElement);
    });
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


