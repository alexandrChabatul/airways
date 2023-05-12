import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'airways-bottom-buttons',
  templateUrl: './bottom-buttons.component.html',
  styleUrls: ['./bottom-buttons.component.scss'],
})
export class BottomButtonsComponent {
  @Input() isSummaryPage = false;

  @Input() clickBackFn!: () => void;

  @Input() clickContinueFn!: () => void;

  @Input() clickAddToOrderFn!: () => void;

  @Input() disableContinue: boolean | null = false;

  constructor(private router: Router) {}
}
