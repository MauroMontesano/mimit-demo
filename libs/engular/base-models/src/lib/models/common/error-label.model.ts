import { AbstractControl, FormControl } from '@angular/forms';
import { ErrorLabelColor } from '../../constants/error-label-color.const';

export class ErrorLabel {
  /**
   * Function to check if there is the specific error
   */
  private _checkFn: (control: AbstractControl) => boolean;

  /**
   * The text message for the error (it's possible use i18n)
   */
  private _message: string;

  /**
   * Placeholder for i18n messages
   */
  private _messageParams: any;

  /**
   * The color of label
   */
  private _color: ErrorLabelColor;

  constructor(
    checkFn: ((control: AbstractControl) => boolean) | string,
    message: string,
    messageParams?: any,
    color?: ErrorLabelColor
  ) {
    this.initCheckFn(checkFn);
    this._message = message;
    this._messageParams = messageParams || {};
    this._color = color || ErrorLabelColor.ERROR;
  }

  get checkFn(): (control: AbstractControl) => boolean {
    return this._checkFn;
  }

  set checkFn(value: (control: AbstractControl) => boolean) {
    this._checkFn = value;
  }

  initCheckFn(value: ((control: AbstractControl) => boolean) | string) {
    if (typeof value === 'string') {
      this.checkFn = (control) => {
        if (control && control.hasError(value)) {
          return true;
        } else {
          return false;
        }
      };
    } else {
      this._checkFn = value;
    }
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get messageParams(): any {
    return this._messageParams;
  }

  set messageParams(value: any) {
    this._messageParams = value;
  }

  get color(): ErrorLabelColor {
    return this._color;
  }

  set color(value: ErrorLabelColor) {
    this._color = value;
  }
}
