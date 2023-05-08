import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsTableComponent {
  @Input()
  dataDaVisualizzare: { label: string; valore: string | number; icon?: string }[];
}
