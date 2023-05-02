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
      isActive: true,
    },
    {
      date: '06 Mar',
      day: 'Saturday',
      price: 154,
      isActive: false,
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
    this.daysWithIndexes = this.addItemsIndexes();
    this.responsiveOptions = [
      {
        breakpoint: '576px',
        numVisible: 3,
        numScroll: 1,
      },
    ];
  }

  public toggleActive(elemIndex: number): void {
    this.daysWithIndexes.forEach((elem) => {
      elem.isActive = false;

      if (elem.index === elemIndex) {
        elem.isActive = true;
      }
    });
  }

  public addItemsIndexes(): DaysWithIndexesInterface[] {
    return this.days.map((elem, index) => {
      return {
        ...elem,
        index,
      };
    });
  }
}
