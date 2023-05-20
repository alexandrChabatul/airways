import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDestinationAirport,
  selectOriginAirport,
} from '../../store/selectors/order.selectors';
import { Observable } from 'rxjs';
import { AirportResponseInterface } from '../../models/airport-response.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'airways-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
})
export class EditMenuComponent implements OnInit {
  public originAirport$!: Observable<AirportResponseInterface | null>;

  public destinationAirport$!: Observable<AirportResponseInterface | null>;

  public searchForm = this.fb.group({}, { validator: this.compareValidator });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.originAirport$ = this.store.select(selectOriginAirport);
    this.destinationAirport$ = this.store.select(selectDestinationAirport);
  }

  compareValidator(group: FormGroup) {
    if (!group.get('origin')?.value || !group.get('destination')?.value) return;
    if (group.get('origin')?.value.name === group.get('destination')?.value.name) {
      group.get('destination')?.setErrors({ theSameAirportError: true });
      return;
    }
  }
}
