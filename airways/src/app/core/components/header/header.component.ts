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
import { selectIsAuthenticated, selectUserName } from '../../store/selectors/auth.selectors';

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

  public isUserLoggedIn$!: Observable<boolean>;

  public userName$!: Observable<string | undefined>;

  public orderCount = 1; //TODO: get value from store

  constructor(private location: Location, private store: Store, private router: Router) {}

  public ngOnInit(): void {
    this.location.onUrlChange((path) => {
      this.changeStepper(path);
    });

    this.selectedDateFormat$ = this.store.select(selectDateFormat);
    this.selectedCurrencyFormat$ = this.store.select(selectCurrencyFormat);
    this.isUserLoggedIn$ = this.store.select(selectIsAuthenticated);
    this.userName$ = this.store.select(selectUserName);
  }

  private changeStepper(newPath: string): void {
    const authPath = '(auth:auth)';
    const rootComponent = document.querySelector('airways-root') as HTMLElement;
    const pathArray = newPath.split('/');
    const mainPath = pathArray[1] ? pathArray[1].split('?')[0] : pathArray[0];

    if (mainPath === '' || mainPath === authPath) {
      this.isMainPage = true;
      this.isBookingPage = false;
      rootComponent.classList.remove('booking');
    } else if (mainPath === 'booking' || mainPath === 'booking' + authPath) {
      rootComponent.classList.add('booking');
      this.isMainPage = false;
      this.isBookingPage = true;
      this.stepNumber = 1;

      if (pathArray.length > 2) {
        const innerPath = pathArray[2].split('?')[0];

        if (innerPath === 'passengers') {
          this.stepNumber = 2;
        }

        if (innerPath === 'summary') {
          this.stepNumber = 3;
        }
      }
    } else {
      rootComponent.classList.remove('booking');
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
