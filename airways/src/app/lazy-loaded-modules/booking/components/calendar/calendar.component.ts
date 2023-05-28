import { Component, OnInit, Input } from '@angular/core';
import { ResponsiveOptionInterface } from '../../models/calendar.model';
import { Observable } from 'rxjs';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import { Store } from '@ngrx/store';
import {
  selectTicketsBackData,
  selectTicketsData,
} from '../../../../core/store/selectors/tickets.selectors';
import { ticketsChangeActive } from '../../../../core/store/actions/tickets.actions';
import { SvgIconService } from '../../../../core/services/svg-icon.service';

@Component({
  selector: 'airways-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() isBack = false;

  public days$!: Observable<ExtendedTicketInterface[]>;

  public responsiveOptions: ResponsiveOptionInterface[] = [
    {
      breakpoint: '576px',
      numVisible: 3,
      numScroll: 1,
    },
  ];

  private daysArray: ExtendedTicketInterface[] = [];

  constructor(private store: Store, private iconsService: SvgIconService) {
    this.iconsService.addSvgIcon('no_flights');
  }

  public ngOnInit() {
    this.days$ = this.isBack
      ? this.store.select(selectTicketsBackData)
      : this.store.select(selectTicketsData);

    this.days$.subscribe((val) => {
      this.daysArray = val;
    });
  }

  public toggleActive(item: ExtendedTicketInterface): void {
    if (!item.isOutdated) {
      this.store.dispatch(ticketsChangeActive({ index: item.index, isBack: this.isBack }));
    }
  }

  public getPageNumber(): number {
    const breakpoint = 576;
    const numPerPageLarge = 5;
    const numPerPageMobile = 3;
    const itemsPerPage = window.innerWidth >= breakpoint ? numPerPageLarge : numPerPageMobile;
    const pageAmount = this.daysArray.length - itemsPerPage + 1; //1 for first page
    const selectedItemInd = this.daysArray.findIndex((elem) => elem.isActive);
    let pageIndex = 0;

    if (selectedItemInd + 1 <= Math.ceil(itemsPerPage / 2)) {
      return pageIndex;
    } else if (selectedItemInd + 1 > this.daysArray.length - Math.ceil(itemsPerPage / 2)) {
      return pageAmount - 1; //last page
    } else {
      for (let i = 1; i < this.daysArray.length; i++) {
        pageIndex += 1;
        const pageArray = this.daysArray.slice(i, i + itemsPerPage);
        const pageMiddleElem = pageArray[Math.ceil(itemsPerPage / 2) - 1];
        if (pageMiddleElem.index === this.daysArray[selectedItemInd].index) {
          return pageIndex;
        }
      }

      return pageIndex;
    }
  }
}
