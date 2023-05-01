import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AirportResponseInterface } from 'src/app/core/models/airport-response.interface';
import { updateOrderAirportAction } from 'src/app/core/store/actions/order.actions';
import { AppStateInterface } from 'src/app/core/store/store.models';

@Directive({
  selector: '[airwaysAutoSelectValue]',
})
export class AutoSelectValueDirective {
  topValue: AirportResponseInterface | undefined;

  @Input() dropdownList!: AirportResponseInterface[] | null;

  @Input() formControl!: FormControl;

  @Input() controlName!: string;

  constructor(private el: ElementRef, private store: Store<AppStateInterface>) {}

  @HostListener('blur') autoSelectValue() {
    const value = this.el.nativeElement.value;
    if (typeof this.formControl.value !== 'string') {
      return;
    }
    if (!this.dropdownList || !this.dropdownList.length) {
      (this.el.nativeElement as HTMLInputElement).value = '';
      this.formControl.setValue('');
      this.updateAirport(null);
      return;
    }
    this.topValue = this.dropdownList[0];
    if (!this.topValue || !value) {
      (this.el.nativeElement as HTMLInputElement).value = '';
      this.updateAirport(null);
    } else {
      (
        this.el.nativeElement as HTMLInputElement
      ).value = `${this.topValue.name} ${this.topValue.code}`;
      this.formControl.setValue(this.topValue);
      this.updateAirport(this.topValue);
    }
  }

  updateAirport(airport: AirportResponseInterface | null) {
    this.store.dispatch(
      updateOrderAirportAction({
        param: this.controlName as 'origin' | 'destination',
        data: airport,
      }),
    );
  }
}
