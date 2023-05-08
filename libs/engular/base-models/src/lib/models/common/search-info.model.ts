export class SearchInfo {
  private _totalElements: number;
  private _totalPages: number;
  private _actualPage: number;
  private _criteria: any;

  constructor(totalElements: number, totalPages: number, actualPage: number, criteria: any) {
    this._totalElements = totalElements;
    this._totalPages = totalPages;
    this._actualPage = actualPage;
    this._criteria = criteria;
  }

  /**
   * Getter totalElements
   * @return
   */
  public get totalElements(): number {
    return this._totalElements;
  }

  /**
   * Getter totalPages
   * @return
   */
  public get totalPages(): number {
    return this._totalPages;
  }

  /**
   * Getter actualPage
   * @return
   */
  public get actualPage(): number {
    return this._actualPage;
  }

  /**
   * Getter criteria
   * @return
   */
  public get criteria(): any {
    return this._criteria;
  }

  /**
   * Setter totalElements
   *
   */
  public set totalElements(value: number) {
    this._totalElements = value;
  }

  /**
   * Setter totalPages
   *
   */
  public set totalPages(value: number) {
    this._totalPages = value;
  }

  /**
   * Setter actualPage
   *
   */
  public set actualPage(value: number) {
    this._actualPage = value;
  }

  /**
   * Setter criteria
   *
   */
  public set criteria(value: any) {
    this._criteria = value;
  }
}
