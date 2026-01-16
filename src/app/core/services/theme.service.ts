import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<Theme>('dark');
  theme = this.themeSignal.asReadonly();

  constructor() {
    // Load preference from localStorage
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme) {
      this.themeSignal.set(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.themeSignal.set(prefersDark ? 'dark' : 'light');
    }

    // Apply theme to document
    effect(() => {
      const currentTheme = this.themeSignal();
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('app-theme', currentTheme);
    });
  }

  toggleTheme() {
    this.themeSignal.update(t => t === 'light' ? 'dark' : 'light');
  }
}
