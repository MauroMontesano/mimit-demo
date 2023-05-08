import { Component, ViewEncapsulation } from '@angular/core';
import { TabsComponent as EngularTabsComponent } from '@engular/layout-base';

@Component({
  selector: 'eaf-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent extends EngularTabsComponent {
  constructor() {
    super();
  }
}
