import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AirportResponseInterface } from 'src/app/core/models/airport-response.interface';

@Directive({
  selector: '[airwaysAutoSelectValue]',
})
export class AutoSelectValueDirective {
  topValue!: AirportResponseInterface | undefined;

  @Input() dropdownList!: AirportResponseInterface[] | null;

  @Input() formControl!: FormControl;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') autoSelectValue() {
    const value = this.el.nativeElement.value;
    if (typeof this.formControl.value !== 'string') {
      return;
    }
    if (!this.dropdownList || !this.dropdownList.length) {
      (this.el.nativeElement as HTMLInputElement).value = '';
      this.formControl.setValue('');
      return;
    }
    this.topValue = this.dropdownList[0];
    if (!this.topValue || !value) {
      (this.el.nativeElement as HTMLInputElement).value = '';
    } else {
      (
        this.el.nativeElement as HTMLInputElement
      ).value = `${this.topValue.name} ${this.topValue.code}`;
      this.formControl.setValue(this.topValue);
    }
  }
}
