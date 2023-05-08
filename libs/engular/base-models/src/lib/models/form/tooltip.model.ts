/**
 * Modeling the tooltip
 */
export class TooltipModel {
  /**
   * Tooltip content
   */
  private _content: string;

  /**
   * Tooltip title
   */
  private _title: string | undefined;

  /**
   * Values for i18n placeholder
   */
  private _i18NPlaceHolder: any = {};

  /**
   * Getter content
   * @return
   */
  public get content(): string {
    return this._content;
  }

  /**
   * Getter title
   * @return
   */
  public get title(): string | undefined {
    return this._title;
  }

  /**
   * Getter i18NPlaceHolder
   * @return
   */
  public get i18NPlaceHolder(): any {
    return this._i18NPlaceHolder;
  }

  /**
   * Setter content
   *
   */
  public set content(value: string) {
    this._content = value;
  }

  /**
   * Setter title
   *
   */
  public set title(value: string | undefined) {
    this._title = value;
  }

  /**
   * Setter i18NPlaceHolder
   *
   */
  public set i18NPlaceHolder(value: any) {
    this._i18NPlaceHolder = value;
  }

  constructor(content: string, i18nPlaceholder: any = {}, title?: string) {
    this.content = content;
    this.i18NPlaceHolder = i18nPlaceholder;
    this.title = title;
  }
}
