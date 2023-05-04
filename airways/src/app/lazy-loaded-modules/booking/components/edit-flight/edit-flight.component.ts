import { Component } from '@angular/core';

@Component({
  selector: 'airways-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss'],
})
export class EditFlightComponent {
  public isRoundTrip = true; //TODO get from store or url
}
