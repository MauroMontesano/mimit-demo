import { Component, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { TabsComponent as EngularTabsComponent } from '@engular/layout-base';

@Component({
  selector: 'mimit-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent extends EngularTabsComponent implements OnChanges{
  constructor() {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  // tabChange(evt: MatTabChangeEvent) {
  //   console.log(this.matTabs.menu[evt.tab.textLabel], this.matTabs.menu);
  //   this.router.navigateByUrl(`/${this.matTabs.menu[evt.tab.textLabel]}`);
  // }
}
