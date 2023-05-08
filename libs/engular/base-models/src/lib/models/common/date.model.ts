// import * as momentNs from 'moment';
// import 'moment-timezone';
// const moment = momentNs;
import moment from 'moment';
// import 'moment-timezone';

export class DateModel {
  private _id: number | null | undefined;
  private _date: moment.Moment;

  constructor(date: moment.Moment | Date | string | number, extra: { regex?: string | string[]; id?: number } = {}) {
    if (!date) {
      return;
    }
    if (typeof date === 'string') {
      this._date = moment(date, extra.regex || ['D/M/YYYY', 'D/M/YY', 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true);
    } else {
      this._date = moment(date);
    }
    this._id = extra.id;
  }

  get id(): number | null | undefined {
    return this._id;
  }

  set id(value: number | null | undefined) {
    this._id = value;
  }

  get date(): moment.Moment {
    return this._date;
  }

  set date(value: moment.Moment) {
    this._date = value;
  }

  toString(): string {
    return this._date ? this._date.format('DD/MM/YYYY') : '';
  }

  toStringTimeDate(): string {
    return this._date ? this._date.format('DD/MM/YYYY HH:mm') : '';
  }

  toTimeString(): string {
    return this._date ? this._date.format('DD/MM/YYYY HH:mm') : '';
  }

  toInputDateFormat(): string {
    return this._date ? this._date.format('YYYY-MM-DD') : '';
  }

  toStringData(): string {
    return this._date ? this._date.format('YYYY-MM-DD') : '';
  }
  toDate(): Date {
    return this._date?.toDate();
  }

  toDTO() {
    return this._date.valueOf();
  }

  toLong() {
    return this._date ? this._date.valueOf() : undefined;
  }

  toISOString() {
    return this._date ? this._date.toISOString() : undefined;
  }
}
