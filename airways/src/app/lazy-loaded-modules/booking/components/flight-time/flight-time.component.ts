import { Component, Input } from '@angular/core';

@Component({
  selector: 'airways-flight-time',
  templateUrl: './flight-time.component.html',
  styleUrls: ['./flight-time.component.scss'],
})
export class FlightTimeComponent {
  @Input() isArrival = false;
}
