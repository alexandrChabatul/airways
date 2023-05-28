import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyFormatType } from '../../../../core/models/formats.models';
import { selectCurrencyFormat } from '../../../../core/store/selectors/formats.selectors';

@Component({
  selector: 'airways-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit {
  @Input() type = '';

  @Input() amount = 0;

  @Input() price = 0;

  public currency$!: Observable<CurrencyFormatType>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currency$ = this.store.select(selectCurrencyFormat);
  }
}
