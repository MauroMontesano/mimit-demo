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
    if (this._tabs.some((t) => t.nome === tab.nome)) {
      this.activeTab.next(tab);
      return;
    }
    this._tabs.push(tab);
    this.tabs.next(this._tabs);
    this.activeTab.next(tab);
  }

  closeTab(tab: TabModel) {
    const filteredTabs = this._tabs.filter((t) => t.nome !== tab.nome);
    this._tabs = filteredTabs;
    this.tabs.next(this._tabs);
  }
}
