import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

type SectionId = 'profile' | 'about' | 'experience' | 'contact';

@Injectable({
  providedIn: 'root'
})
export class SectionStateService {
  private readonly sections = signal<Record<SectionId, HTMLElement | null>>({
    profile: null,
    about: null,
    experience: null,
    contact: null
  });

  private readonly active = signal<SectionId>('profile');

  readonly activeSection: Signal<SectionId> = this.active.asReadonly();

  readonly sectionList = computed(() => Object.keys(this.sections()) as SectionId[]);

  constructor() {
    effect(onCleanup => {
      const elements = this.sections();

      const allElements = Object.values(elements).filter(
        (el): el is HTMLElement => Boolean(el)
      );

      if (!allElements.length) {
        return;
      }

      const subscription = fromEvent(window, 'scroll', { passive: true })
        .pipe(
          startWith(this.getScrollPosition()),
          map(() => this.findCurrentSection(elements))
        )
        .subscribe(section => {
          if (section && section !== this.active()) {
            this.active.set(section);
          }
        });

      onCleanup(() => subscription.unsubscribe());
    });
  }

  registerSection(id: SectionId, element: HTMLElement): void {
    this.sections.update(state => ({
      ...state,
      [id]: element
    }));
  }

  private findCurrentSection(sections: Record<SectionId, HTMLElement | null>): SectionId | null {
    const viewportMiddle = this.getScrollPosition() + window.innerHeight / 2;

    const entries = Object.entries(sections) as Array<[SectionId, HTMLElement | null]>;

    let closest: { id: SectionId; distance: number } | null = null;

    for (const [id, element] of entries) {
      if (!element) {
        continue;
      }

      const rect = element.getBoundingClientRect();
      const elementMiddle = window.scrollY + rect.top + rect.height / 2;
      const distance = Math.abs(elementMiddle - viewportMiddle);

      if (!closest || distance < closest.distance) {
        closest = { id, distance };
      }
    }

    return closest?.id ?? null;
  }

  private getScrollPosition(): number {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }
}


