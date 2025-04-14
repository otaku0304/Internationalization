import { Component } from '@angular/core';
import { NavbarComponent } from './i18n/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet,
  ],
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();

  siteLanguage: any;
  siteLocale = 'en';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Netherlands' },
    { code: 'sr', label: 'Serbian' },
  ];

  private readonly siteUrl = "https://internationalization-d2aa6.web.app/en/";

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.siteLocale = window.location.pathname.split('/')[1];
    this.siteLanguage = this.languageList.find(
      (f) => f.code === this.siteLocale
    )?.label;
    this.currentYear = new Date().getFullYear();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data;
        })
      )
      .subscribe((routeData) => {
        const currentUrl = `${this.siteUrl}${this.router.url}`;
        if (routeData) {
          this.title.setTitle(routeData['title'] || 'Default Title');
          this.meta.updateTag({
            name: 'description',
            content: routeData['description'] || 'Default Description',
          });
          this.meta.updateTag({ name: 'canonical', content: currentUrl });
          this.meta.updateTag({ property: 'og:url', content: currentUrl });
        }
      });
  }
}
