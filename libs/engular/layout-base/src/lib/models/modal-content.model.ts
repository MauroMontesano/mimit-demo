import { TemplateRef } from '@angular/core';
export class ModalContent {
  private _action: ModalAction;
  private _template: TemplateRef<any> | undefined;
  private _options: any;

  constructor(action: ModalAction, template?: TemplateRef<any>, options?: any) {
    this._action = action;
    this._template = template;
    this._options = options;
  }

  /**
   * Getter action
   * @return
   */
  public get action(): ModalAction {
    return this._action;
  }

  /**
   * Setter action
   * @param  value
   */
  public set action(value: ModalAction) {
    this._action = value;
  }

  /**
   * Getter template
   * @return
   */
  public get template(): TemplateRef<any> | undefined {
    return this._template;
  }

  /**
   * Setter template
   * @param  value
   */
  public set template(value: TemplateRef<any> | undefined) {
    this._template = value;
  }

  /**
   * Getter options
   * @return
   */
  public get options(): any {
    return this._options;
  }

  /**
   * Setter options
   * @param  value
   */
  public set options(value: any) {
    this._options = value;
  }
}

export const enum ModalAction {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
}
