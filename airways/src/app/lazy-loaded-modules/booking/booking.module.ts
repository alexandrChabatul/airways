import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { BookingRoutingModule } from './booking-routing.module';
import { EditFlightComponent } from './components/edit-flight/edit-flight.component';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { FlightTimeComponent } from './components/flight-time/flight-time.component';
import { WayComponent } from './components/way/way.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CarouselModule } from 'primeng/carousel';
import { StoreModule } from '@ngrx/store';
import { ticketsReducer } from '../../core/store/reducers/tickets.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TicketsEffect } from '../../core/store/effects/tickets.effect';

@NgModule({
  declarations: [
    FlightsPageComponent,
    PassengersPageComponent,
    SummaryPageComponent,
    EditFlightComponent,
    FlightInfoComponent,
    FlightTimeComponent,
    WayComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialDesignModule,
    CarouselModule,
    StoreModule.forFeature('tickets', ticketsReducer),
    EffectsModule.forFeature([TicketsEffect]),
  ],
})
export class BookingModule {}
