import { Component } from '@angular/core';
import * as MOCK_DATA from '../../mock-data/flights.mock-data.json';

@Component({
  selector: 'airways-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent {
  public flightsData = MOCK_DATA;
}
