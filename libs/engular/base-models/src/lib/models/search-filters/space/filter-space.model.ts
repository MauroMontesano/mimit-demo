import { FilterSpaceOptions } from './filter-space.options';
import { FilterBase } from '../base/filter-base.model';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterSpace extends FilterBase {
  public setPayload(value: any): void {}
  resetImpl(): void {}
  constructor(options: FilterSpaceOptions) {
    super(FilterTypeConstants.SPACE, 'space', 'none', options);
  }
}
