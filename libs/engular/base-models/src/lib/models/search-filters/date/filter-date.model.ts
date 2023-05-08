import { ErrorLabel } from '../../common/error-label.model';
import { ValidatorFn } from '@angular/forms';
import { FilterDateOptions } from './filter-date.options';
import { FilterBase } from '../base/filter-base.model';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterDate extends FilterBase {
  constructor(labelId: string, dtoField: string, extra: FilterDateOptions = {}) {
    super(FilterTypeConstants.DATE, labelId, dtoField, extra);
  }

  public setPayload(value: any): void {
    this._payload = value;
  }
  resetImpl(): void {
    this._payload = undefined;
  }
}
