import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TabModel } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
})
export class TabsManagerService {
  private _tabs: TabModel[] = [];
  activeTab: Subject<TabModel>;
  tabs: Subject<TabModel[]>;

  constructor() {
    //
  }

  getTabs(): Observable<TabModel[] | null> {
    return this.tabs.asObservable();
  }

  getactiveTab(): Observable<TabModel | null> {
    return this.activeTab.asObservable();
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
