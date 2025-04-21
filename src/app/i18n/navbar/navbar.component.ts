import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppConfig } from 'src/app/core/config/app.Config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
})
export class NavbarComponent {
  private readonly navigateToPdfPasswordRemover = AppConfig.pdfPasswordRemover();

  navigateToPdfPwdRmv() {
    window.location.href = `${this.navigateToPdfPasswordRemover}`;
  }
}
