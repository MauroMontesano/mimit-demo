import { ValidatorFn } from '@angular/forms';
import { ErrorLabel } from '../../common/error-label.model';
import { TooltipModel } from '../../form/tooltip.model';

export interface FilterBaseOptions {
  size?: string;
  tooltip?: TooltipModel;
  validators?: ValidatorFn[];
  errorMessageLabel?: ErrorLabel[];
  advancedFilter?: boolean;
  placeholder?: string;
}
