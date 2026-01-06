import { Component, computed, inject } from '@angular/core';
import { SectionStateService } from '../../core/signals/section-state.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  private readonly sectionState = inject(SectionStateService);
  private readonly themeService = inject(ThemeService);

  protected readonly sections = computed(() => this.sectionState.sectionList());
  protected readonly activeSection = this.sectionState.activeSection;
  protected readonly isDark = this.themeService.isDark;

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected scrollTo(section: string): void {
    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: 'smooth' });
  }
}
