import { Component } from '@angular/core';
import { NavbarComponent } from './i18n/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
  ngOnInit() {
    this.siteLocale = window.location.pathname.split('/')[1];
    this.siteLanguage = this.languageList.find(
      (f) => f.code === this.siteLocale
    )?.label;
    this.currentYear = new Date().getFullYear();
  }
}
