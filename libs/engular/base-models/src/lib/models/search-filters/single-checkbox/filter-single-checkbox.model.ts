import { FilterBase } from '../base/filter-base.model';
import { FilterSingleChecboxOptions } from './filter-single-checkbox.options';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterSingleCheckbox extends FilterBase {
  // private _selectName: string;
  private _checkedValue: any;
  private _uncheckedValue: any;

  constructor(labelId: string, dtoField: string, extra: FilterSingleChecboxOptions = {}) {
    super(FilterTypeConstants.SINGLE_CHECKBOX, labelId, dtoField, extra);
    this.checkedValue = extra.checkedValue;
    this.uncheckedValue = extra.uncheckedValue;
  }
  public setPayload(value: any): any {
    this._payload = value;
  }
  resetImpl(): void {
    this._payload = undefined;
  }

  /**
   * Getter checkedValue
   * @return
   */
  public get checkedValue(): any {
    return this._checkedValue;
  }

  /**
   * Setter checkedValue
   *
   */
  public set checkedValue(value: any) {
    this._checkedValue = value;
  }

  /**
   * Getter uncheckedValue
   * @return
   */
  public get uncheckedValue(): any {
    return this._uncheckedValue;
  }

  /**
   * Setter uncheckedValue
   *
   */
  public set uncheckedValue(value: any) {
    this._uncheckedValue = value;
  }
}
