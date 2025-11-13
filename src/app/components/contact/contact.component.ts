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
        '“Marcel stands out for his front-end expertise; he is agile and communicates with impressive clarity.”'
    },
    {
      title: 'Ester Sanchez Jimenez',
      subtitle: 'Full-stack Developer',
      description:
        '“Marcel is an exceptional frontend developer. His problem-solving skills and commitment to quality are evident in every project.”'
    },
    
  ];

  protected readonly blogs = [
    {
      title: 'Advanced Angular Architecture',
      subtitle: 'Declarative programming with RxJS and Angular',
      description: 'How this approach enables more reactive, scalable, and maintainable applications by leveraging data streams and functional operators.',
      actionUrl: 'https://careers.edicomgroup.com/blogtech/frontend-programacion-declarativa-con-rxjs-y-angular/#punto5.5'
    },
    {
      title: 'Pet network',
      subtitle: 'Open Source',
      description: 'Hobby project where I crafted custom UI components with Angular Material and set up a 100% reactive flow using standalone components and unit testing, without manual subscriptions.',
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


