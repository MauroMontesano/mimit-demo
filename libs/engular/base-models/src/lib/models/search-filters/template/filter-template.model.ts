import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { FilterBase } from '../base/filter-base.model';
import { FilterTypeConstants } from '../../../constants/filter-type.const';
import { FilterTemplateOptions } from './filter-template.options';

export class FilterTemplate extends FilterBase {
  public valueChanges = new Observable((subscriber) => (this.sub = subscriber));
  private sub: Subscriber<any>;

  constructor(
    labelId: string,
    dtoField: string,
    public template: any,
    public control: AbstractControl,
    extra: FilterTemplateOptions
  ) {
    super(FilterTypeConstants.TEMPLATE, labelId, dtoField, extra);
  }

  resetImpl(): void {
    this._payload = undefined;
  }

  setPayload(value: any): void {
    this._payload = value;
  }
}
