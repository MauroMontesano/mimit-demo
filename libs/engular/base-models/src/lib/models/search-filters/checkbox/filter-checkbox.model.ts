import { ValidatorFn } from '@angular/forms';

import { ErrorLabel } from '../../common/error-label.model';
import { CheckboxOption } from '../../form/checkbox-option.model';
import { FilterBase } from '../base/filter-base.model';
import { FilterChecboxOptions } from './filter-checbox.options';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterCheckbox extends FilterBase {
  options: CheckboxOption[];
  fieldForId: string | undefined;
  fieldForOption: string;

  constructor(
    labelId: string,
    dtoField: string,
    fieldForOptionElement: string,
    options: any[],
    extra: FilterChecboxOptions = {}
  ) {
    super(FilterTypeConstants.CHECKBOX, labelId, dtoField, extra);

    this.fieldForId = extra.fieldForId;
    this.fieldForOption = fieldForOptionElement;

    this.options = [];
    options.forEach((opt) => {
      if (this.fieldForId) {
        this.options.push(new CheckboxOption(opt[this.fieldForOption], opt[this.fieldForId]));
      } else {
        this.options.push(new CheckboxOption(opt[this.fieldForOption], opt));
      }
    });
  }
  public setPayload(value: any): any {
    this._payload = value;
  }
  resetImpl(): void {
    this._payload = undefined;
  }
}
