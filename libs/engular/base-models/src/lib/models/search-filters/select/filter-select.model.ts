import { FilterBase } from '../base/filter-base.model';

import { FilterSelectOptions } from './filter-select.options';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterSelect extends FilterBase {
  // private _selectName: string;
  optionsList: any[];
  fieldForId: string | undefined;
  fieldForOptionElement: string | undefined;
  multi: boolean;
  filterable: boolean;

  constructor(
    labelId: string,
    dtoField: string,
    options: any[],
    fieldForOptionElement?: string,
    fieldForId?: string,
    extra: FilterSelectOptions = {}
  ) {
    super(FilterTypeConstants.SELECT, labelId, dtoField, extra);
    this.optionsList = options;
    this.fieldForId = fieldForId;
    this.fieldForOptionElement = fieldForOptionElement;
    this.multi = extra.multi || false;
    this.filterable = extra.filterable || false;
  }

  public setPayload(value: any): any {
    this._payload = value;
  }
  resetImpl(): void {
    this._payload = undefined;
  }
}
