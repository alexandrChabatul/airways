import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';
import { ExtendedTicketInterface } from '../../../core/models/ticket.models';

@Directive({
  selector: '[airwaysSeatsColor]',
})
export class SeatsColorDirective implements AfterViewChecked {
  @Input() airwaysSeatsColor!: ExtendedTicketInterface;

  constructor(private elemRef: ElementRef) {}

  ngAfterViewChecked(): void {
    const halfSeats = Math.floor(this.airwaysSeatsColor.maxSeats / 2);
    const minSeats = 10;
    const elem = this.elemRef.nativeElement as HTMLElement;
    const isCalendar = elem.parentElement?.classList.contains('calendar__item');
    const greenColor = `rgba(127, 137, 6, ${isCalendar ? 1 : 0.3})`;
    const orangeColor = `rgba(241, 201, 51, ${isCalendar ? 1 : 0.3})`;
    const redColor = `rgba(179, 38, 30, ${isCalendar ? 1 : 0.3})`;
    let color = '';

    if (this.airwaysSeatsColor.seats >= halfSeats) {
      color = greenColor;
    } else if (this.airwaysSeatsColor.seats < minSeats) {
      color = redColor;
    } else {
      color = orangeColor;
    }

    elem.style.backgroundColor = color;
  }
}
