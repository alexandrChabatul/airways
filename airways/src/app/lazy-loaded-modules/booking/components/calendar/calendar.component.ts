import { Component, OnInit } from '@angular/core';
import {
  CalendarInterface,
  DaysWithIndexesInterface,
  ResponsiveOptionInterface,
} from '../../models/calendar.model';

@Component({
  selector: 'airways-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  days: CalendarInterface[] = [
    {
      date: '01 Mar',
      day: 'Monday',
      price: 144,
      isActive: false,
    },
    {
      date: '02 Mar',
      day: 'Tuesday',
      price: 104,
      isActive: false,
    },
    {
      date: '03 Mar',
      day: 'Wednesday',
      price: 124,
      isActive: false,
    },
    {
      date: '04 Mar',
      day: 'Thursday',
      price: 104,
      isActive: false,
    },
    {
      date: '05 Mar',
      day: 'Friday',
      price: 154,
      isActive: false,
    },
    {
      date: '06 Mar',
      day: 'Saturday',
      price: 154,
      isActive: true,
    },
    {
      date: '07 Mar',
      day: 'Monday',
      price: 144,
      isActive: false,
    },
    {
      date: '08 Mar',
      day: 'Tuesday',
      price: 144,
      isActive: false,
    },
    {
      date: '09 Mar',
      day: 'Tuesday',
      price: 144,
      isActive: false,
    },
  ];

  daysWithIndexes: DaysWithIndexesInterface[] = [];

  responsiveOptions: ResponsiveOptionInterface[] = [];

  ngOnInit() {
    this.daysWithIndexes = this.getItemsIndexes();
    this.responsiveOptions = [
      {
        breakpoint: '576px',
        numVisible: 3,
        numScroll: 1,
      },
    ];
  }

  private getItemsIndexes(): DaysWithIndexesInterface[] {
    return this.days.map((elem, index) => {
      return {
        ...elem,
        index,
      };
    });
  }

  public toggleActive(elemIndex: number): void {
    this.daysWithIndexes.forEach((elem) => {
      elem.isActive = false;

      if (elem.index === elemIndex) {
        elem.isActive = true;
      }
    });
  }

  public getPageNumber(): number {
    const breakpoint = 576;
    const numPerPageLarge = 5;
    const numPerPageMobile = 3;
    const itemsPerPage = window.innerWidth >= breakpoint ? numPerPageLarge : numPerPageMobile;
    const pageAmount = this.daysWithIndexes.length - itemsPerPage + 1; //1 for first page
    const selectedItemInd = this.daysWithIndexes.findIndex((elem) => elem.isActive);
    let pageIndex = 0;

    if (selectedItemInd + 1 <= Math.ceil(itemsPerPage / 2)) {
      return pageIndex;
    } else if (selectedItemInd + 1 > this.daysWithIndexes.length - Math.ceil(itemsPerPage / 2)) {
      return pageAmount - 1; //last page
    } else {
      for (let i = 1; i < this.daysWithIndexes.length; i++) {
        pageIndex += 1;
        const pageArray = this.daysWithIndexes.slice(i, i + itemsPerPage);
        const pageMiddleElem = pageArray[Math.ceil(itemsPerPage / 2) - 1];
        if (pageMiddleElem.index === this.daysWithIndexes[selectedItemInd].index) {
          return pageIndex;
        }
      }

      return pageIndex;
    }
  }
}
