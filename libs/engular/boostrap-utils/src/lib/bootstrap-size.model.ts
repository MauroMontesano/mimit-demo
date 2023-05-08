/**
 * Model the bootstrap size format
 */
export class BootstrapSize {
  private _xs: number;
  private _sm: number;
  private _md: number | undefined;
  private _lg: number;

  /**
   * Helper to insert the right class defition for bootstrap
   */
  public toClass(): string {
    let classString = '';
    if (this.xs) {
      classString += ' col-xs-' + this.xs;
    }
    if (this.sm) {
      classString += ' col-sm-' + this.sm;
    }
    if (this.md) {
      classString += ' col-md-' + this.md;
    }
    if (this.lg) {
      classString += ' col-lg-' + this.lg;
    }
    return classString;
  }

  /**
   * Helper to insert the right class definition for bootstrap
   */
  public static fromPipe(pipe: string): BootstrapSize {
    let values = pipe.split('|');
    if (values.length > 3) {
      return new BootstrapSize(+values[0], +values[1], +values[2]);
    } else {
      return new BootstrapSize(+values[0], +values[1], +values[3], +values[2]);
    }
  }

  /** pay attention to the order. for retrocompatible motivation md is the last */
  constructor(xs: number, sm: number, lg: number, md?: number) {
    this._xs = xs;
    this._sm = sm;
    this._lg = lg;
    this._md = md;
  }

  /**
   * Getter xs
   * @return
   */
  public get xs(): number {
    return this._xs;
  }

  /**
   * Getter sm
   * @return
   */
  public get sm(): number {
    return this._sm;
  }

  /**
   * Getter lg
   * @return
   */
  public get lg(): number {
    return this._lg;
  }

  /**
   * Setter xs
   * @param  value
   */
  public set xs(value: number) {
    this._xs = value;
  }

  /**
   * Setter sm
   * @param  value
   */
  public set sm(value: number) {
    this._sm = value;
  }

  /**
   * Setter lg
   * @param  value
   */
  public set lg(value: number) {
    this._lg = value;
  }

  /**
   * Getter md
   */
  public get md(): number | undefined {
    return this._md;
  }

  /**
   * Setter md
   */
  public set md(value: number | undefined) {
    this._md = value;
  }
}
