import { ActionItem } from './action-item.model';

export class ActionRetrieved {
  private _name: string | ActionItem;
  private _payload: any;

  constructor(name: string | ActionItem, payload?: any) {
    this._name = name;
    this._payload = payload;
  }

  public get name(): string | ActionItem {
    return this._name;
  }

  public set name(value: string | ActionItem) {
    this._name = value;
  }

  public get payload(): any {
    return this._payload;
  }

  public set payload(value: any) {
    this._payload = value;
  }
}
