import { LayoutSize } from '@engular/base-models';

export class EafLayoutSize implements LayoutSize {
  constructor(tiny: number, small: number, medium: number, large: number) {
    this._tiny = tiny;
    this._large = large;
    this._small = small;
    this._medium = medium;
  }

  /**
   * Getter tiny
   */
  public get tiny(): number {
    return this._tiny;
  }

  /**
   * Setter tiny
   */
  public set tiny(value: number) {
    this._tiny = value;
  }

  /**
   * Getter small
   */
  public get small(): number {
    return this._small;
  }

  /**
   * Setter small
   */
  public set small(value: number) {
    this._small = value;
  }

  /**
   * Getter medium
   */
  public get medium(): number {
    return this._medium;
  }

  /**
   * Setter medium
   */
  public set medium(value: number) {
    this._medium = value;
  }

  /**
   * Getter large
   */
  public get large(): number {
    return this._large;
  }

  /**
   * Setter large
   */
  public set large(value: number) {
    this._large = value;
  }
  // private _mini: number;
  private _tiny: number;
  private _small: number;
  private _medium: number;
  private _large: number;
  private _custom: string | undefined;

  static generateFromSize(tiny: number, small: number, medium: number, large: number): EafLayoutSize {
    return new EafLayoutSize(tiny, small, medium, large);
  }

  static generateFromCustom(custom: string) {
    const tmp = new EafLayoutSize(0, 0, 0, 0);
    tmp._custom = custom;
  }

  static generateFromString(pipe: string) {
    const values = pipe.split('|');
    return new EafLayoutSize(+values[0], +values[1], +values[2], +values[3]);
  }

  /**
   * Helper to insert the right class definition for bootstrap
   */
  public fromString(pipe: string): EafLayoutSize {
    const values = pipe.split('|');
    return new EafLayoutSize(+values[0], +values[1], +values[2], +values[3]);
  }

  /**
   * Helper to insert the right class defition for bootstrap
   */
  public toClass(): string {
    let classString = '';
    if (this._custom) {
      return this._custom;
    }

    if (this.tiny) {
      classString += ' col-' + this.tiny;
    }
    if (this.small) {
      classString += ' col-sm-' + this.small;
    }
    if (this.medium) {
      classString += ' col-md-' + this.medium;
    }
    if (this.large) {
      classString += ' col-lg-' + this.large;
    }

    return classString;
  }
}
