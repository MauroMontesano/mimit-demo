import { Injectable } from '@angular/core';
import { Tab } from '@engular/layout-base';

@Injectable({
  providedIn: 'root',
})
export class TabsManagerService {
  private _tabs: Tab[] = [];

  constructor() {
    //
  }

  addTab() {
    const tempTab = new Tab(1, 'Aste', 'template');
    this._tabs.push(tempTab);
  }
}
