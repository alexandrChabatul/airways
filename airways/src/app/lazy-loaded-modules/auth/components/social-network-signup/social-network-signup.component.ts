import { Component } from '@angular/core';
import { SvgIconService } from 'src/app/core/services/svg-icon.service';

@Component({
  selector: 'airways-social-network-signup',
  templateUrl: './social-network-signup.component.html',
})
export class SocialNetworkSignupComponent {
  constructor(private svgIconService: SvgIconService) {
    this.svgIconService.addSvgIcon('google');
    this.svgIconService.addSvgIcon('facebook');
  }

  onGoogleSignIn() {}
}
