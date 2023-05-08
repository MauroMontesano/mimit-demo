import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { TabModel, TabsManagerService } from '@mimit/core';

@Component({
  selector: 'mimit-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {
  tabs: TabModel[] | null = null;
  activeTab: TabModel | null = null;

  constructor(private tabsManager: TabsManagerService) {
    tabsManager.getTabs().subscribe((res) => (this.tabs = res));
    tabsManager.getactiveTab().subscribe((res) => (this.activeTab = res));
  }

  changeTab(tab: TabModel) {
    console.log(tab, this.activeTab);
    this.tabsManager.openTab(tab);
  }

  // tabChange(evt: MatTabChangeEvent) {
  //   console.log(this.matTabs.menu[evt.tab.textLabel], this.matTabs.menu);
  //   this.router.navigateByUrl(`/${this.matTabs.menu[evt.tab.textLabel]}`);
  // }
}
