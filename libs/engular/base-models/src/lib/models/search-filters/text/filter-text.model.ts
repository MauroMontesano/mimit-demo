import { ErrorLabel } from '../../common/error-label.model';
import { ErrorMessage } from '../../common/error-message.model';
import { Validators } from '@angular/forms';

import { ValidatorFn } from '@angular/forms';
import { FilterTextOptions } from './filter-text.options';
import { FilterBase } from '../base/filter-base.model';
import { FilterTypeConstants } from '../../../constants/filter-type.const';
export class FilterText extends FilterBase {
  constructor(labelId: string, dtoField: string, extra: FilterTextOptions) {
    super(FilterTypeConstants.TEXT, labelId, dtoField, extra);
  }
  public setPayload(value: any): void {
    this._payload = value;
  }

  resetImpl(): void {
    this._payload = undefined;
  }
}
