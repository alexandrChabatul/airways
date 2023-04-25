import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[airwaysAutocompleteInput]',
})
export class AutocompleteInputDirective {
  @Input() inputValue = '';

  constructor(private element: ElementRef, private renderer2: Renderer2) {}

  // ngOnInit(): void {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(this.element);
  //   console.log(this.inputValue);
  // }
}
