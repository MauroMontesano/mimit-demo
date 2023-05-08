import { ActivatedRoute, Router } from '@angular/router';

export class MenuItem {
  private _isOpen: boolean = false;
  private _parent: MenuItem;
  private _children;

  private _additionalClass;
  private _action: (action?: MenuItem, extra?: any) => any;

  constructor(
    name: string,
    action: (action?: MenuItem, extra?: any) => any,
    icon?: string,
    type: 'LINK' | 'NORMAL' = 'LINK',
    auth?: string | Array<string>,
    disabled?: boolean,
    children?: Array<MenuItem>,
    additionalClass?: string
  ) {
    this._children = children || null;
    this._additionalClass = additionalClass || null;
    this._action = action;
    if (this._children != null) {
      this._children.forEach((c) => {
        c.parent = this;
      });
    }
  }

  get children(): Array<MenuItem> {
    return this._children;
  }
  set children(value: Array<MenuItem>) {
    this._children = value;
  }

  get parent(): MenuItem {
    return this._parent;
  }
  set parent(value: MenuItem) {
    this._parent = value;
  }
  get additionalClass(): string {
    return this._additionalClass;
  }
  set additionalClass(value: string) {
    this._additionalClass = value;
  }
  get action(): (action?: MenuItem, extra?: any) => any {
    return this._action;
  }

  set action(value: (action?: MenuItem, extra?: any) => any) {
    this._action = value;
  }

  /**
   * Getter isOpen
   * @return
   */
  public get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Setter isOpen
   * @param value
   */
  public set isOpen(value: boolean) {
    this._isOpen = value;
    if (this._isOpen === false && this.children) {
      this.children.forEach((c) => (c.isOpen = false));
    }
  }
}
