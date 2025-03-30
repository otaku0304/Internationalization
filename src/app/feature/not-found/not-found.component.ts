import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: false
})
export class NotFoundComponent {
  constructor(private readonly router: Router) {}
  home() {
    this.router.navigate(['/']);
  }
}
