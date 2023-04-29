import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  // addSvgIcon should be initiated in the constructor of the component you want to use it in. NOT ngOnInit!
  addSvgIcon(iconName: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/${iconName}.svg`),
    );
  }
}
