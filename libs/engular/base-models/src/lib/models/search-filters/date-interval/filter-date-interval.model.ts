import { FilterTypeConstants } from '../../../constants/filter-type.const';
import { FilterBase } from '../base/filter-base.model';
import { FilterDateIntervalOptions } from './filter-date-interval.options';

export class FilterDoubleDate extends FilterBase {
  private _fromLabel: string;
  private _toLabel: string;
  private _atLeastOne?: boolean;

  constructor(
    labelId: string,
    dtoField: string,
    labelFrom: string,
    labelTo: string,
    extra: FilterDateIntervalOptions = {},
    atLeastOne?: boolean
  ) {
    super(FilterTypeConstants.DATE_INTERVAL, labelId, dtoField, extra);
    this.toLabel = labelTo;
    this.fromLabel = labelFrom;
    this.atLeastOne = atLeastOne;
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
   * Getter atLeastOne
   * @return
   */
  public get atLeastOne(): boolean | undefined {
    return this._atLeastOne;
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

  /**
   * Setter atLeastOne
   * @return
   */
  public set atLeastOne(value: boolean | undefined) {
    this._atLeastOne = value;
  }
}
