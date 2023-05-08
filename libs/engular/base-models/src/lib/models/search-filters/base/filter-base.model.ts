import { ValidatorFn } from '@angular/forms';

import { ErrorLabel } from '../../common/error-label.model';
import { FilterBaseOptions } from './filter-base.options';

export abstract class FilterBase {
  protected _id: string;

  /**
   * Costante che identifica il tipo di coltello
   */
  protected _type: string;

  /**
   * Field name to use for BE criteria dto
   */
  protected _dtoField: string;

  /**
   * Payload corrispondente all'input inserito dall'utente che va inviato al backend (cambia a seconda del tipo di coltello)
   */
  protected _payload: any;

  protected _disabled: boolean;

  protected _tooltip: any;

  protected _validators: ValidatorFn[];

  protected _errorMessageLabel: ErrorLabel[];

  protected _size: string | undefined;

  protected _advancedFilter: boolean;

  protected _placeholder: string;

  constructor(type: string, labelId: string, dtoField: string, extra: FilterBaseOptions) {
    this._id = labelId;
    this._type = type;
    this._dtoField = dtoField;

    this._disabled = false;
    this._size = extra.size; // @ale || '12|12|12';
    this._tooltip = extra.tooltip;
    this._validators = extra.validators || [];
    this._errorMessageLabel = extra.errorMessageLabel || [];
    this._advancedFilter = extra.advancedFilter || false;
    this._placeholder = extra.placeholder || '';

    this.resetImpl();
  }

  get size(): string | undefined {
    return this._size;
  }

  set size(sizeNew: string | undefined) {
    this._size = sizeNew;
  }

  get id(): string {
    return this._id;
  }

  get type(): string {
    return this._type;
  }
  get errorMessageLabel(): ErrorLabel[] {
    return this._errorMessageLabel;
  }

  set errorMessageLabel(errorMessageLabel: ErrorLabel[]) {
    this._errorMessageLabel = errorMessageLabel;
  }
  get validators(): ValidatorFn[] {
    return this._validators;
  }

  set validators(validators: ValidatorFn[]) {
    this._validators = validators;
  }

  set type(value: string) {
    this._type = value;
  }

  get dtoField(): string {
    return this._dtoField;
  }

  set dtoField(value: string) {
    this._dtoField = value;
  }

  public get payload(): any {
    return this._payload;
  }

  public abstract setPayload(value: any): void;

  public equals(filter: FilterBase): boolean {
    if (!filter) {
      return false;
    }

    return this.id === filter.id;
  }

  /**
   * Metodo per resettare il coltello di ricerca quando viene rimosso dall'utente
   */
  public reset(): void {
    this.resetImpl();
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled() {
    return this._disabled;
  }

  public get tooltip(): any {
    return this._tooltip;
  }

  public set tooltip(value: any) {
    this._tooltip = value;
  }

  public get advancedFilter(): boolean {
    return this._advancedFilter;
  }

  public set advancedFilter(value: boolean) {
    this._advancedFilter = value;
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  public set placeholder(value: string) {
    this._placeholder = value;
  }

  abstract resetImpl(): void;
}
