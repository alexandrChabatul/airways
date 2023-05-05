import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ticketsLoadAction } from '../../../../core/store/actions/tickets.actions';

@Component({
  selector: 'airways-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(ticketsLoadAction());
  }
}
