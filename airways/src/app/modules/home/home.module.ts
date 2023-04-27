import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AirwayAutocompleteComponent } from './components/airway-autocomplete/airway-autocomplete.component';
import { CoreModule } from 'src/app/core/core.module';
import { HomeDatePickerComponent } from './components/home-date-picker/home-date-picker.component';
import { PassengerSelectorComponent } from './components/passenger-selector/passenger-selector.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { DirtyErrorStateMatcher } from 'src/app/core/matchers/dirty-error-state.matcher';
import { AutoSelectValueDirective } from './directives/auto-select-value.directive';

@NgModule({
  declarations: [
    HomePageComponent,
    AirwayAutocompleteComponent,
    AutoSelectValueDirective,
    HomeDatePickerComponent,
    PassengerSelectorComponent,
  ],
  imports: [CommonModule, MaterialDesignModule, FormsModule, ReactiveFormsModule, CoreModule],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: DirtyErrorStateMatcher,
    },
  ],
})
export class HomeModule {}
