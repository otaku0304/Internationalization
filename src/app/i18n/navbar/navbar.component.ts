import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppConfig } from 'src/app/core/config/app.Config';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
})
export class NavbarComponent {
  private readonly navigateToPdfPasswordRemover = AppConfig.pdfPasswordRemover();

  currentLocale = window.location.pathname.split('/')[1] || 'en';

  languages = [
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Dutch' },
    { code: 'sr', label: 'Serbian' }
  ];

  navigateToPdfPwdRmv() {
    window.location.href = `${this.navigateToPdfPasswordRemover}`;
  }

  switchSiteLanguage(code: string) {
    window.location.href = `/${code}${window.location.pathname.substring(3) || ''}`;
  }
}
