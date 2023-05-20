import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { BookingRoutingModule } from './booking-routing.module';
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
import { SeatsColorDirective } from './directives/seats-color.directive';
import { BottomButtonsComponent } from './components/bottom-buttons/bottom-buttons.component';
import { bookingReducer } from '../../core/store/reducers/booking.reducer';
import { FlightSummaryComponent } from './components/flight-summary/flight-summary.component';
import { PassengersSummaryComponent } from './components/passengers-summary/passengers-summary.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';

@NgModule({
  declarations: [
    FlightsPageComponent,
    PassengersPageComponent,
    SummaryPageComponent,
    FlightInfoComponent,
    FlightTimeComponent,
    WayComponent,
    CalendarComponent,
    SeatsColorDirective,
    BottomButtonsComponent,
    FlightSummaryComponent,
    PassengersSummaryComponent,
    PaymentSummaryComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialDesignModule,
    CarouselModule,
    StoreModule.forFeature('tickets', ticketsReducer),
    StoreModule.forFeature('booking', bookingReducer),
    EffectsModule.forFeature([TicketsEffect]),
  ],
})
export class BookingModule {}
