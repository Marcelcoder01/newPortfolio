import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly themeSignal = signal<'dark' | 'light'>('dark');

  constructor() {
    // Load from local storage or default to dark
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      this.themeSignal.set(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      // Optional: respect system preference if no saved theme, but user said "app mostly dark", so maybe keep dark default.
      // sticking to dark default as requested implicitly.
      this.themeSignal.set('dark');
    }

    // Effect to apply theme class
    effect(() => {
      const theme = this.themeSignal();
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(`${theme}-theme`);
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme() {
    this.themeSignal.update((current) =>
      current === 'dark' ? 'light' : 'dark'
    );
  }

  isDark = computed(() => this.themeSignal() === 'dark');
}
