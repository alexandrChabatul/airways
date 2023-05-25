import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'airways-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  constructor(private router: Router) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.router.navigate([{ outlets: { auth: null } }], {
      queryParamsHandling: 'preserve',
    });
  }

  closeAuth() {
    this.router.navigate([{ outlets: { auth: null } }], {
      queryParamsHandling: 'preserve',
    });
  }
}
