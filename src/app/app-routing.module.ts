import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './i18n/about/about.component';
import { FeedbackComponent } from './i18n/feedback/feedback.component';
import { HomeComponent } from './feature/home/home.component';
import { NavbarComponent } from './i18n/navbar/navbar.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  AboutComponent,
  FeedbackComponent,
  NotFoundComponent,
  NavbarComponent,
];
