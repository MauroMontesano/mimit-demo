import { Component, ViewEncapsulation } from '@angular/core';
import { TabsComponent as EngularTabsComponent } from '@engular/layout-base';

@Component({
  selector: 'eaf-grid-tabs',
  templateUrl: './grid-tabs.component.html',
  styleUrls: ['./grid-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridTabsComponent extends EngularTabsComponent {
  constructor() {
    super();
  }
}
