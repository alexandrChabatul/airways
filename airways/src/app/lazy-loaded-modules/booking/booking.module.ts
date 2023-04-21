import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { BookingRoutingModule } from './booking-routing.module';

@NgModule({
  declarations: [FlightsPageComponent, PassengersPageComponent, SummaryPageComponent],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
