import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AirwayAutocompleteComponent } from './components/airway-autocomplete/airway-autocomplete.component';
import { CoreModule } from 'src/app/core/core.module';
import { DatePickerComponent } from './components/home-date-picker/date-picker.component';
import { PassengerSelectorComponent } from './components/passenger-selector/passenger-selector.component';
import { AutoSelectValueDirective } from './directives/auto-select-value.directive';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/core/store/reducers/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UpdateOrderEffect } from 'src/app/core/store/effects/update-order.effects';

@NgModule({
  declarations: [
    HomePageComponent,
    AirwayAutocompleteComponent,
    AutoSelectValueDirective,
    DatePickerComponent,
    PassengerSelectorComponent,
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forFeature('order', reducer),
    EffectsModule.forFeature(UpdateOrderEffect),
  ],
})
export class HomeModule {}
