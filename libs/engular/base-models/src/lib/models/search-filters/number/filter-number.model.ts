import { FilterBase } from '../base/filter-base.model';

import { FilterNumberOptions } from './filter-number.options';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterNumber extends FilterBase {
  constructor(labelId: string, dtoField: string, extra: FilterNumberOptions = {}) {
    super(FilterTypeConstants.NUMBER, labelId, dtoField, extra);
  }
  public setPayload(value: any): void {
    this._payload = value;
  }

  resetImpl(): void {
    this._payload = undefined;
  }
}
