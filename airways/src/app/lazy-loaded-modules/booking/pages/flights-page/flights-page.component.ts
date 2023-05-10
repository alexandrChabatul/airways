import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ticketsLoadAction } from '../../../../core/store/actions/tickets.actions';
import { Observable } from 'rxjs';
import { selectTicketsLoading } from '../../../../core/store/selectors/tickets.selectors';

@Component({
  selector: 'airways-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnInit {
  //select trip type isBack;
  public areTicketsLoading!: Observable<boolean>;

  constructor(private router: Router, private store: Store, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.store.dispatch(ticketsLoadAction());
    this.areTicketsLoading = this.store.select(selectTicketsLoading);
  }

  public navigateBack(): void {
    const urlTree = this.router.createUrlTree([''], {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
    });
    this.router.navigateByUrl(urlTree);
  }

  public navigateContinue(): void {
    const urlTree = this.router.createUrlTree(['booking', 'passengers'], {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
    });
    this.router.navigateByUrl(urlTree);
  }
}
