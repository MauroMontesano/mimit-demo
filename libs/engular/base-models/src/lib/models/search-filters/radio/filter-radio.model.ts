import { ValidatorFn } from '@angular/forms';

import { ErrorLabel } from '../../common/error-label.model';
import { RadioOption } from '../../form/radio-option.model';
import { FilterBase } from '../base/filter-base.model';
import { FilterRadioOptions } from './filter-radio.options';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterRadio extends FilterBase {
  options: RadioOption[];
  fieldForId: string | undefined;
  fieldForOption: string;
  _line: boolean;
  constructor(
    labelId: string,
    dtoField: string,
    fieldForOptionElement: string,
    options: any[],
    extra: FilterRadioOptions = {}
  ) {
    super(FilterTypeConstants.RADIO, labelId, dtoField, extra);

    this.fieldForId = extra.fieldForId;
    this.fieldForOption = fieldForOptionElement;
    this._line = extra.line || false;

    this.options = [];
    options.forEach((opt) => {
      if (this.fieldForId) {
        this.options.push(new RadioOption(opt[this.fieldForOption], opt[this.fieldForId]));
      } else {
        this.options.push(new RadioOption(opt[this.fieldForOption], opt));
      }
    });
  }
  public setPayload(value: any): any {
    this._payload = value;
  }
  resetImpl(): void {
    this._payload = undefined;
  }

  public get line(): boolean {
    return this._line;
  }

  public set line(value: boolean) {
    this._line = value;
  }
}
