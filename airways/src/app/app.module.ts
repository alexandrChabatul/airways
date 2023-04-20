import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { StepperComponent } from './test/stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './test/header/header.component';
import { DatePickerComponent } from './test/date-picker/date-picker.component';

@NgModule({
  declarations: [AppComponent, StepperComponent, HeaderComponent, DatePickerComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialDesignModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
