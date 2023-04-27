import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[airwaysTextColor]',
})
export class TextColorDirective implements AfterViewInit {
  @Input() airwaysTextColor = true;

  constructor(private elem: ElementRef) {}

  public ngAfterViewInit(): void {
    if (this.airwaysTextColor) {
      this.elem.nativeElement.style.color = 'red';
      console.log('work');
    }
  }
}
