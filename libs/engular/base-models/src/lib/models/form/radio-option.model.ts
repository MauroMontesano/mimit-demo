import { TooltipModel } from './tooltip.model';
export class RadioOption {
  private _label: string;
  private _disabled: boolean;
  private _payload: any;
  private _tooltip: TooltipModel | undefined;

  constructor(label: string, payload: any, tooltip?: TooltipModel) {
    this._label = label;
    this._payload = payload;
    this._tooltip = tooltip;
  }

  static fromIdValueArray(array: { id: number; value: string }[]) {
    const final: any[] = [];
    array.forEach((e) => {
      final.push(new RadioOption(e.value, e.id));
    });
    return final;
  }

  get tooltip(): TooltipModel | undefined {
    return this._tooltip;
  }

  set tooltip(tooltip: TooltipModel | undefined) {
    this._tooltip = tooltip;
  }

  /**
   * Getter label
   * @return
   */
  public get label(): string {
    return this._label;
  }

  /**
   * Getter payload
   * @return
   */
  public get payload(): any {
    return this._payload;
  }

  /**
   * Setter label
   *
   */
  public set label(value: string) {
    this._label = value;
  }

  /**
   * Setter payload
   *
   */
  public set payload(value: any) {
    this._payload = value;
  }

  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public get disabled() {
    return this._disabled;
  }
}
