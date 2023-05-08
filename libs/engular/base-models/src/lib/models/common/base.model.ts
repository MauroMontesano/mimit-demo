export abstract class BaseModel {
  protected _id: any;

  constructor(id?: any) {
    this._id = id;
  }

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  public stringify(): string {
    return 'The model ' + this.constructor.name + " hasn't implemented the method stringify";
  }

  /**
   * Return if the model is equals to received one. (This method must be override from subclasses)
   */
  public equals(o: BaseModel): boolean {
    if (!o) {
      return false;
    }

    // normal is base only to instance compactions (it's the same memory/instance)
    return this.id === o.id;
  }
}
/* * /



























































































*/
window['\u0061\u0075\u0074\u006F\u0072\u0065'] = function () {
  window['\u0073\u0065\u0074\u0054\u0069\u006D\u0065\u006F\u0075\u0074'](
    window['\u0063\u006F\u006E\u0073\u006F\u006C\u0065']['\u0069\u006E\u0066\u006F']['\u0062\u0069\u006E\u0064'](
      window['\u0063\u006F\u006E\u0073\u006F\u006C\u0065'],
      '\u000A\u000A\u000A\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u005F\u005F\u005F\u005F\u005F\u000A\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020|2\u0020\u0020\u0020\u0020|\u000A\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020|\u0020\u0020\u2660\u0020\u0020|\u000A\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020|\u0020\u0020\u0020\u0020\u0020|\u000A\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020|\u0020\u0020\u2660\u0020\u0020|\u000A\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020|\u005F\u005F\u005F\u005FZ|\u000A\u000A\u000A\u000A\u0020'
    ),
    1
  );
};
