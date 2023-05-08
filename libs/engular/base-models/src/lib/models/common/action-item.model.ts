/**
 * Describe a action in our system. Will be use in menu, in dropdown on icon etc
 */

export class ActionItem {
  dynamicName: (model: any) => string = () => {
    return this.name;
  };
  private _name: string;
  private _icon: string;
  private _action: (item: any, action?: ActionItem, onComplete?: Function) => any;
  private _disabled: boolean;
  private _auth: string | Array<string> | null;
  private _type: 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'WARNING';
  constructor(
    name: string,
    action: (item: any, action?: ActionItem, onComplete?: Function) => any,
    icon?: string,
    type: 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'WARNING' = 'LINK',
    auth?: string | Array<string>,
    disabled?: boolean
  ) {
    // let fakeAction = (action: ActionItem, item: any) => {};
    this._name = name || '';
    this._icon = icon || '';
    this._action = action;
    this._disabled = disabled || false;
    this._auth = auth || null;
    this._type = type;
  }

  get auth(): string | Array<string> | null {
    return this._auth;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get action(): (item: any, action?: ActionItem, onComplete?: Function) => any {
    return this._action;
  }

  set action(value: (item: any, action?: ActionItem, onComplete?: Function) => any) {
    this._action = value;
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get type(): 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'WARNING' {
    return this._type;
  }

  set type(value: 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'WARNING') {
    this._type = value;
  }

  public callAction(param?: any, onComplete?: Function) {
    if (!this.disabled) {
      this._action(param, this, onComplete);
    }
  }
}
