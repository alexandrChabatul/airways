import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {Location} from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrencyFormat, selectDateFormat } from '../../store/selectors/formats.selectors';
import { changeDateFormat } from '../../store/actions/formats.actions';
import { changeCurrencyFormat } from '../../store/actions/formats.actions';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'airways-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public dateFormats = [
    {value: 'MM/dd/yyyy', viewValue: 'MM/DD/YYYY'},
    {value: 'dd/MM/yyyy', viewValue: 'DD/MM/YYYY'},
    {value: 'yyyy/dd/MM', viewValue: 'YYYY/DD/MM'},
    {value: 'yyyy/MM/dd', viewValue: 'YYYY/MM/DD'},
  ];

  public currencyFormats = [
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'USD', viewValue: 'USD'},
    {value: 'RUB', viewValue: 'RUB'},
    {value: 'PLN', viewValue: 'PLN'},
  ];

  public selectedDateFormat = '';
  public selectedCurrencyFormat = '';

  public isMainPage = false;
  public isBookingPage = false;
  public stepNumber = 1;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private location: Location,
    private store: Store,
    ) {
    iconRegistry.addSvgIcon('basket', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/basket.svg'));
  }

  public ngOnInit(): void {
    this.location.onUrlChange((path) => {
      this.switchPage(path);
    });

    this.store.select(selectDateFormat).subscribe((val) => {
      this.selectedDateFormat = val;
    })

    this.store.select(selectCurrencyFormat).subscribe((val) => {
      this.selectedCurrencyFormat = val;
    })
  }

  private switchPage(newPath: string): void {
    const pathArray = newPath.split('/');
    const mainPath = pathArray[1];

    if (mainPath ===''){
      this.isMainPage = true;
      this.isBookingPage = false;
    } else if (mainPath === 'booking') {
      this.isMainPage = false;
      this.isBookingPage = true;

      if (pathArray.length > 2){
        const innerPath = pathArray[2];

        if (innerPath === 'passengers') {
          this.stepNumber = 2;
        }

        if (innerPath === 'summary') {
          this.stepNumber = 3;
        }
      }
    } else {
      this.isMainPage = false;
      this.isBookingPage = false;
    }
  }

  public changeDateFormat(newValue: MatSelectChange): void {
    const dateFormat = newValue.value;
    this.store.dispatch(changeDateFormat({dateFormat}));
  }

  public changeCurrencyFormat(newValue: MatSelectChange): void {
    const currencyFormat = newValue.value;
    this.store.dispatch(changeCurrencyFormat({currencyFormat}));
  }
}
