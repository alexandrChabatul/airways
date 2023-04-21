import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

const routes: Routes = [
  { path: '', component: FlightsPageComponent },
  { path: 'passengers', component: PassengersPageComponent },
  { path: 'summary', component: SummaryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
