import { Injectable } from '@angular/core';
import { Tab } from '@engular/layout-base';

@Injectable({
  providedIn: 'root',
})
export class TabsManagerService {
  private _tabs: Tab[] = [];
  menuTabs: any;

  constructor() {
    //
  }

  initializeTabs(routes: any) {
    console.log(routes);
    const children = routes.children;
    this.menuTabs = Object.entries({
      uno: children[0].path,
      due: children[1].path,
    });
  }

  addTab() {
    const tempTab = new Tab(1, 'Aste', 'template');
    this._tabs.push(tempTab);
  }
}
