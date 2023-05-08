import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TabModel } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
})
export class TabsManagerService {
  private _tabs: TabModel[] = [];
  activeTab: Subject<TabModel> = new Subject();
  tabs: Subject<TabModel[]> = new Subject();

  constructor() {
    //
  }

  getTabs(): Observable<TabModel[] | null> {
    return this.tabs.asObservable();
  }

  getactiveTab(): Observable<TabModel | null> {
    return this.activeTab.asObservable();
  }

  openTab(tab: TabModel) {
    this._tabs.push(tab);
    this.tabs.next(this._tabs);
    this.activeTab.next(tab);
  }

  // initializeTabs(routes: any) {
  //   console.log(routes);
  //   const children = routes.children;
  //   this.menuTabs.next(Object.entries({
  //     uno: children[0].path,
  //     due: children[1].path,
  //   }));
  // }

  // addTab() {
  //   const tempTab = new Tab(1, 'Aste', 'template');
  //   this._tabs.push(tempTab);
  // }
}
