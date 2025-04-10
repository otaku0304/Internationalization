import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
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
