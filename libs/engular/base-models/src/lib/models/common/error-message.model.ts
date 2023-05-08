import { Message } from './message.model';
import { GenericError } from './generic-error';
import { ValidationError } from './validation-error.model';
//                                             \ / _
//                                       ___,,,
//                                       \_[o o]
//      Errare humanum est!              C\  _\/
//              /                     _____),_/__
//         ________                  /     \/   /
//       _|       .|                /      o   /
//      | |       .|               /          /
//       \|       .|              /          /
//        |________|             /_        \/
//        __|___|__             _//\        \
//  _____|_________|____       \  \ \        \
//                     _|       ///  \        \
//                    |               \       /
//                    |               /      /
//                    |              /      /
//  ________________  |             /__    /_
//  b'ger        ...|_|.............. /______\.......
//
/**
 * Extend Message to give more details about error
 */
export class ErrorMessage extends Message {
  /**
   * List of validation error
   */
  private _validationErrors: Array<ValidationError>;

  /**
   * List of generic error
   */
  private _errorList: Array<GenericError>;

  public override toString(): string {
    let val = '';
    if (this.validationErrors) {
      for (let e of this.validationErrors) {
        val += ' ' + e.entity + ' - ' + e.field + ' - ' + e.message + '\n';
      }
    }
    if (this.errorList) {
      for (let e of this.errorList) {
        val += ' ' + e.message + '\n';
      }
    }
    return val;
  }

  public get validationErrors(): Array<ValidationError> {
    return this._validationErrors;
  }

  public get errorList(): Array<GenericError> {
    return this._errorList;
  }

  public set validationErrors(value: Array<ValidationError>) {
    this._validationErrors = value;
  }

  public set errorList(value: Array<GenericError>) {
    this._errorList = value;
  }
}
