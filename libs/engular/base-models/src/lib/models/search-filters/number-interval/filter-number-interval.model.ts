import { FilterBase } from '../base/filter-base.model';
import { FilterNumberIntervalOptions } from './filter-number-interval.options';
import { FilterTypeConstants } from '../../../constants/filter-type.const';

export class FilterNumberInterval extends FilterBase {
  private _fromLabel: string;
  private _toLabel: string;

  constructor(
    labelId: string,
    dtoField: string,
    labelFrom: string,
    labelTo: string,
    extra: FilterNumberIntervalOptions = {}
  ) {
    super(FilterTypeConstants.NUMBER_INTERVAL, labelId, dtoField, extra);
    this.toLabel = labelTo;
    this.fromLabel = labelFrom;
  }
  public setPayload(value: any): void {
    this._payload = value;
  }
  resetImpl(): void {
    this._payload = undefined;
  }

  /**
   * Getter labelFrom
   * @return
   */
  public get fromLabel(): string {
    return this._fromLabel;
  }

  /**
   * Getter labelTo
   * @return
   */
  public get toLabel(): string {
    return this._toLabel;
  }

  /**
   * Setter labelFrom
   * @param value
   */
  public set fromLabel(value: string) {
    this._fromLabel = value;
  }

  /**
   * Setter labelTo
   * @param value
   */
  public set toLabel(value: string) {
    this._toLabel = value;
  }
}
