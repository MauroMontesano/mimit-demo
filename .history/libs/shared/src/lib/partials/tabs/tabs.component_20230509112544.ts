import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private tabsManager: TabsManagerService, private router: Router) {
    tabsManager.getTabs().subscribe((res) => (this.tabs = res));
    tabsManager.getactiveTab().subscribe((res) => (this.activeTab = res));
  }

  changeTab(tab: TabModel) {
    console.log(tab, this.activeTab);
    this.tabsManager.openTab(tab);
    this.router.navigateByUrl(tab.path);
  }
  closeTab(e: Event, tab: TabModel) {
    e.stopPropagation();
    console.log(tab);
  }

  // tabChange(evt: MatTabChangeEvent) {
  //   console.log(this.matTabs.menu[evt.tab.textLabel], this.matTabs.menu);
  //   this.router.navigateByUrl(`/${this.matTabs.menu[evt.tab.textLabel]}`);
  // }
}
