import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AirwayAutocompleteComponent } from './components/airway-autocomplete/airway-autocomplete.component';
import { CoreModule } from 'src/app/core/core.module';
import { AutocompleteInputDirective } from './directives/autocomplete-input.directive';

@NgModule({
  declarations: [HomePageComponent, AirwayAutocompleteComponent, AutocompleteInputDirective],
  imports: [CommonModule, MaterialDesignModule, FormsModule, ReactiveFormsModule, CoreModule],
})
export class HomeModule {}
