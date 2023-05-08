import { ValidatorFn } from '@angular/forms';
import { ErrorLabel } from '../../common/error-label.model';
import { FilterBase } from '../base/filter-base.model';
import { FilterBaseOptions } from '../base/filter-base.options';
import { CheckboxOption } from '../../form/checkbox-option.model';

export interface FilterSingleChecboxOptions extends FilterBaseOptions {
  checkedValue?: any;
  uncheckedValue?: any;
}
