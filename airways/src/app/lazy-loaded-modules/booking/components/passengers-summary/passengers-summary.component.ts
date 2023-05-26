import { Component, Input } from '@angular/core';
import { PassengerArrayInterface } from '../../../../core/models/booking.model';

@Component({
  selector: 'airways-passengers-summary',
  templateUrl: './passengers-summary.component.html',
  styleUrls: ['./passengers-summary.component.scss'],
})
export class PassengersSummaryComponent {
  @Input() passengerInfo!: PassengerArrayInterface;
}
