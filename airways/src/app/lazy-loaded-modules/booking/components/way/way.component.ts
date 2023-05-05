import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import {
  selectActiveTicket,
  selectActiveTicketBack,
} from '../../../../core/store/selectors/tickets.selectors';

@Component({
  selector: 'airways-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss'],
})
export class WayComponent implements OnInit {
  @Input() isBack = false;

  public selectedItem!: Observable<ExtendedTicketInterface | undefined>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.selectedItem = this.store.select(
      this.isBack ? selectActiveTicketBack : selectActiveTicket,
    );
  }
}
