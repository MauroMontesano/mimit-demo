import { ValidatorFn } from '@angular/forms';
import { ErrorLabel } from '../../common/error-label.model';
import { FilterBaseOptions } from '../base/filter-base.options';

export interface FilterLineBreakOptions extends FilterBaseOptions {
  size: string;
}
