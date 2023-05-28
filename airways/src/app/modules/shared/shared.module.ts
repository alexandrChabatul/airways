import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirwayAutocompleteComponent } from './components/airway-autocomplete/airway-autocomplete.component';
import { DatePickerComponent } from './components/home-date-picker/date-picker.component';
import { PassengerSelectorComponent } from './components/passenger-selector/passenger-selector.component';
import { AutoSelectValueDirective } from './directives/auto-select-value.directive';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRowComponent } from './components/cart-row/cart-row.component';
import { CurrencyExchangePipe } from './pipes/currency-exchange.pipe';
import { FlightSummaryComponent } from './components/flight-summary/flight-summary.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';
import { PassengersSummaryComponent } from './components/passengers-summary/passengers-summary.component';

@NgModule({
  declarations: [
    AirwayAutocompleteComponent,
    DatePickerComponent,
    PassengerSelectorComponent,
    CartRowComponent,
    AutoSelectValueDirective,
    CurrencyExchangePipe,
    FlightSummaryComponent,
    PaymentSummaryComponent,
    PassengersSummaryComponent,
  ],
  imports: [CommonModule, MaterialDesignModule, FormsModule, ReactiveFormsModule],
  exports: [
    AirwayAutocompleteComponent,
    DatePickerComponent,
    PassengerSelectorComponent,
    CartRowComponent,
    AutoSelectValueDirective,
    CurrencyExchangePipe,
    FlightSummaryComponent,
    PaymentSummaryComponent,
    PassengersSummaryComponent,
  ],
})
export class SharedModule {}
