import { FilterTypeConstants } from '../../../constants/filter-type.const';
import { FilterBase } from '../base/filter-base.model';
import { FilterLineBreakOptions } from './filter-linebreak.options';

export class FilterLineBreak extends FilterBase {
  public setPayload(value: any): void {}
  resetImpl(): void {}
  constructor(options: FilterLineBreakOptions) {
    super(FilterTypeConstants.LINEBREAK, 'libebreak', 'none', options);
  }
}
