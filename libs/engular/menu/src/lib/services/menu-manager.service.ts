import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuManager {
  private _menu: MenuItem[];

  private extrasMenu: { [sectionName: string]: MenuItem[] };

  private _menuUpdateChannel: Observable<MenuItem[]>;
  private _menuNotify: any;

  constructor() {
    this._menu = [];
    this._menuUpdateChannel = Observable.create((channel) => {
      this._menuNotify = channel;
      if (this._menu.length > 0) {
        this._menuNotify.next(this._menu);
      }
    });
  }
  getMenu(): MenuItem[] {
    return this._menu;
  }

  setMenu(menu: MenuItem[]) {
    this._menu = menu;
    if (this._menuNotify) {
      this._menuNotify.next(menu);
    }
  }

  subscribeOnMenuChange(callBack) {
    this._menuUpdateChannel.subscribe(callBack);
  }
}
