import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/home/home.component').then((m) => m.HomeComponent),
    title: 'Home - Internationalization',
    data: {
      description:
        'Welcome to the demo of Internationalization. This is a demo of the i18n library.',
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./i18n/about/about.component').then((m) => m.AboutComponent),
    title: 'About - Internationalization',
    data: {
      description:
        'About the author of the demo of Internationalization.',
    },
  },
  {
    path: 'feedback',
    loadComponent: () =>
      import('./i18n/feedback/feedback.component').then(
        (m) => m.FeedbackComponent
      ),
    title: 'Feedback - Internationalization',
    data: {
      description:
        'Feedback about the demo of Internationalization.',
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./feature/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page Not Found',
    data: {
      description: 'Sorry, the page you’re looking for doesn’t exist.',
    },
  },
];
