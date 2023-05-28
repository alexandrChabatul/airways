import { Component, Input } from '@angular/core';

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

  @Input() editMode: boolean | null = false;
}
