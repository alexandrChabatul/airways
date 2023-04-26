import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'airways-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.addSvgIcon('google');
    this.addSvgIcon('facebook');
  }

  addSvgIcon(iconName: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/icons/${iconName}.svg`),
    );
  }

  onGoogleSignIn() {}
}
