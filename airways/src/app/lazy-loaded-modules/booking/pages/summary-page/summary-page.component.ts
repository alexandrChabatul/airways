import { Component } from '@angular/core';
import { SvgIconService } from '../../../../core/services/svg-icon.service';

@Component({
  selector: 'airways-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  constructor(private iconsService: SvgIconService) {
    this.iconsService.addSvgIcon('summary');
  }
}
