import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengersInterface } from '../../../../modules/shared/models/passenger-types.models';
import { Store } from '@ngrx/store';
import { selectPassengers } from '../../../../core/store/selectors/order.selectors';

@Component({
  selector: 'airways-passengers-page',
  templateUrl: './passengers-page.component.html',
})
export class PassengersPageComponent implements OnInit {
  public passengers!: Observable<PassengersInterface>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.passengers = this.store.select(selectPassengers);
  }

  public getArrayFromNumber(number: number): string[] {
    return Array(number).fill('');
  }
}
