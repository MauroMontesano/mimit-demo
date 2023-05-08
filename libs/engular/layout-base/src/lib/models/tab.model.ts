import { BaseModel } from '@engular/base-models';

export class Tab extends BaseModel {
  private _title: string;
  private _templateNo: any;
  private _icon: string | undefined;
  private _hasError: boolean;
  private _disabled: boolean;
  private _visited: boolean;

  constructor(id: number, title: string, templateNo: any, icon?: string) {
    super(id);
    this._title = title;
    this._templateNo = templateNo;
    this._icon = icon;
  }

  /**
   * Getter title
   * @return
   */
  public get title(): string {
    return this._title;
  }

  /**
   * Getter templateNo
   * @return
   */
  public get templateNo(): any {
    return this._templateNo;
  }

  /**
   * Getter icon
   * @return
   */
  public get icon(): string | undefined {
    return this._icon;
  }

  /**
   * Getter hasError
   * @return
   */
  public get hasError(): boolean {
    return this._hasError;
  }

  /**
   * Getter disable
   * @return
   */
  public get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Setter title
   *
   */
  public set title(value: string) {
    this._title = value;
  }

  /**
   * Setter templateNo
   *
   */
  public set templateNo(value: any) {
    this._templateNo = value;
  }

  /**
   * Setter icon
   * @param  value
   */
  public set icon(value: string | undefined) {
    this._icon = value;
  }

  /**
   * Setter hasError
   *
   */
  public set hasError(value: boolean) {
    this._hasError = value;
  }

  /**
   * Setter disable
   *
   */
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  /**
   * Getter visited
   * @return
   */
  public get visited(): boolean {
    return this._visited;
  }

  /**
   * Setter visited
   * @param  value
   */
  public set visited(value: boolean) {
    this._visited = value;
  }
}
