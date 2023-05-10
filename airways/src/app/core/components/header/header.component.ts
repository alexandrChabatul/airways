import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrencyFormat, selectDateFormat } from '../../store/selectors/formats.selectors';
import { changeDateFormat } from '../../store/actions/formats.actions';
import { changeCurrencyFormat } from '../../store/actions/formats.actions';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { CURRENCY_FORMATS, DATE_FORMATS } from '../../constants/formats.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'airways-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public dateFormats = DATE_FORMATS;

  public currencyFormats = CURRENCY_FORMATS;

  public selectedDateFormat$!: Observable<string>;

  public selectedCurrencyFormat$!: Observable<string>;

  public isMainPage = false;

  public isBookingPage = false;

  public stepNumber = 1;

  public isUserLoggedIn = false; //TODO: get value from store

  public userName = 'Harry Potter'; //TODO: get value from store

  public orderCount = 1; //TODO: get value from store

  constructor(private location: Location, private store: Store, private router: Router) {}

  public ngOnInit(): void {
    this.location.onUrlChange((path) => {
      this.changeStepper(path);
    });

    this.selectedDateFormat$ = this.store.select(selectDateFormat);

    this.selectedCurrencyFormat$ = this.store.select(selectCurrencyFormat);
  }

  private changeStepper(newPath: string): void {
    const pathArray = newPath.split('/');
    const mainPath = pathArray[1];

    if (mainPath === '') {
      this.isMainPage = true;
      this.isBookingPage = false;
    } else if (mainPath === 'booking') {
      this.isMainPage = false;
      this.isBookingPage = true;

      if (pathArray.length > 2) {
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
    this.store.dispatch(changeDateFormat({ dateFormat }));
  }

  public changeCurrencyFormat(newValue: MatSelectChange): void {
    const currencyFormat = newValue.value;
    this.store.dispatch(changeCurrencyFormat({ currencyFormat }));
  }

  public navigateToLogin(): void {
    this.router.navigate([{ outlets: { auth: ['auth'] } }], { queryParamsHandling: 'preserve' });
  }

  public navigateToUserPage(): void {
    // this.router.navigateByUrl('/user'); //TODO: change urls
  }

  public toggleFormats(): void {
    const elem = document.querySelector('#header-formats') as HTMLElement;
    elem.classList.toggle('visible');
  }
}
