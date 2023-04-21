import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'airways-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public dateFormats = [
    {value: 1, viewValue: 'MM/DD/YYYY'},
    {value: 2, viewValue: 'DD/MM/YYYY'},
    {value: 3, viewValue: 'YYYY/DD/MM'},
    {value: 4, viewValue: 'YYYY/MM/DD'},
  ];

  public currencyFormats = [
    {value: 1, viewValue: 'EUR'},
    {value: 2, viewValue: 'USD'},
    {value: 3, viewValue: 'RUB'},
    {value: 4, viewValue: 'PLN'},
  ];

  public selectedDateFormat = this.dateFormats[0].value;
  public selectedCurrencyFormat = this.currencyFormats[0].value;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('basket', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/basket.svg'));
  }
}
