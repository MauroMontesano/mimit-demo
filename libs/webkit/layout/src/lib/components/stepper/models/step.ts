import { BaseModel } from '@engular/base-models';

export class Step extends BaseModel {
  private _title: string;
  private _hasError: boolean;
  private _hasWarning: boolean;
  private _disable: boolean;
  private _visited: boolean;
  private _visible: boolean;

  constructor(
    id: any,
    title: string,
    disabled: boolean = false,
    hasError: boolean = false,
    hasWarning: boolean = false,
    visited: boolean = false,
    visible = true
  ) {
    super(id);
    this._id = id;
    this._title = title;
    this._hasError = hasError;
    this._hasWarning = hasWarning;
    this._disable = disabled;
    this._visited = visited;
    this._visible = visible;
  }

  // public toJSON() {
  // 	return JSON.stringify(this).replace(/"_/g, '"');
  // }

  public get visited(): boolean {
    return this._visited;
  }

  public set visited(value: boolean) {
    this._visited = value;
  }

  public override set id(value: number) {
    this._id = value;
  }

  public override get id(): number {
    return this._id;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get title(): string {
    return this._title;
  }

  public set hasError(value: boolean) {
    this._hasError = value;
  }

  public get hasError(): boolean {
    return this._hasError;
  }

  public set disable(value: boolean) {
    this._disable = value;
  }

  public get disable(): boolean {
    return this._disable;
  }

  public get disabled(): boolean {
    return this._disable;
  }

  public get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    this._visible = value;
  }

  public get hasWarning(): boolean {
    return this._hasWarning;
  }

  public set hasWarning(value: boolean) {
    this._hasWarning = value;
  }
}
