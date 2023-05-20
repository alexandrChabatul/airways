import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirwayAutocompleteComponent } from './components/airway-autocomplete/airway-autocomplete.component';
import { DatePickerComponent } from './components/home-date-picker/date-picker.component';
import { PassengerSelectorComponent } from './components/passenger-selector/passenger-selector.component';
import { AutoSelectValueDirective } from './directives/auto-select-value.directive';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AirwayAutocompleteComponent,
    DatePickerComponent,
    PassengerSelectorComponent,
    AutoSelectValueDirective,
  ],
  imports: [CommonModule, MaterialDesignModule, FormsModule, ReactiveFormsModule],
  exports: [
    AirwayAutocompleteComponent,
    DatePickerComponent,
    PassengerSelectorComponent,
    AutoSelectValueDirective,
  ],
})
export class SharedModule {}
