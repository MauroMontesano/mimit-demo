import { Component, ElementRef, forwardRef, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { DateModel, ValidationError } from '@engular/base-models';
import { BaseInputComponent } from '@engular/forms-base';
@Component({
  selector: 'eaf-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateRangeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateRangeComponent),
      multi: true,
    },
  ],
})
export class InputDateRangeComponent extends BaseInputComponent {
  @Input('minDate') set setterMinDate(minDate: string | Date | DateModel | undefined) {
    if (minDate && !(minDate instanceof DateModel)) {
      this.minDate = new DateModel(minDate).toStringData();
    }
  }
  minDate: DateModel | string | undefined;

  minToDate: DateModel | string | undefined;

  @Input('atLeastOne') atLeastOne: boolean;

  @Input('maxDate') set setterMaXDate(maxDate: string | Date | DateModel | undefined) {
    if (maxDate && !(maxDate instanceof DateModel)) {
      this.maxDate = new DateModel(maxDate).toStringData();
    }
  }
  maxDate: DateModel | string | undefined;
  override error: string | ValidationError | any = { from: undefined, to: undefined };
  @ViewChild('inputFrom', { static: true })
  protected override set input(input: ElementRef) {
    this._input = input;
    if (!input) {
      return;
    }
  }
  protected override get input() {
    return this._input;
  }
  protected override _input: ElementRef;

  @ViewChild('inputTo', { static: true })
  protected set input2(input2: ElementRef) {
    this._input2 = input2;
    if (!input2) {
      return;
    }
  }
  protected get input2() {
    return this._input2;
  }
  protected _input2: ElementRef;

  constructor(injector: Injector) {
    super(injector);
  }

  @Input() disableFrom = false;
  @Input() disableTo = false;
  @Input()
  fromLabel = 'INPUT.DDATE.FROM';
  @Input()
  regex: RegExp | string | string[] = 'YYYY-MM-DD';
  @Input()
  toLabel = 'INPUT.DDATE.TO';
  @Input('labels') labels = true;

  errorMessage: string | undefined;

  writeValue(date: any): void {
    if (date) {
      if (date.from && date.from instanceof DateModel === false) {
        throw Error('You have to use only DateModel as input for from value of input-date-interval:' + this.id);
      }

      if (date.to && date.to instanceof DateModel === false) {
        throw Error('You have to use only DateModel as input for To value of input-date-interval:' + this.id);
      }

      this.value = date;
    }
  }

  onChangeDate($event: any, which: string) {
    setTimeout(() => {
      // inizializza value se vuoto
      this.value = this.value || {};

      // value = { from: ... , to: ....}
      this.value[which] = this.extractInformationFromInternalInputDouble(
        which === 'from' ? this.input.nativeElement.value : this.input2.nativeElement.value,
        which
      );
      if (this.value.from) {
        this.minToDate = this.value.from.toStringData();
      } else {
        this.minToDate = undefined;
      }

      if (this.atLeastOne) {
        if (this.value.from && !this.value.to) {
          this.error['to'] = { atLeastOne: true };
        } else if (this.value.to && !this.value.from) {
          this.error['from'] = { atLeastOne: true };
        } else {
          this.error['to'] = null;
          this.error['from'] = null;
        }
      }
      // nessuno dei due valori From e To
      if (!this.value.from || !this.value.to) {
        // sblank value
        // this.value = undefined;
        if (this.onChangeCallBack) {
          this.onChangeCallBack(null);
        }
      } else {
        this.log.debug('which', which, this.value[which]);
        if (this.onChangeCallBack) {
          this.onChangeCallBack(this.value);
        }
      }
    }, 250);
  }

  extractInformationFromInternalInputDouble(value: any, field: string): DateModel | null {
    if (this.testDateParsing(value)) {
      // data valida
      this.error[field] = null;
      return new DateModel(value, { regex: 'YYYY-MM-DD' });
    } else if (!this.disabled && !this.error) {
      // data non valida e devo mostrare errore
      // setta l'array error[]
      this.error[field] = field.toUpperCase() + '_DATE_INVALID';
      // this.validate();
      return null;
    } else {
      // non devo mostrare errori
      this.error[field] = null;
      return null;
    }
  }

  override validate(c: AbstractControl): ValidationErrors | null {
    if (!this.disabled) {
      if (this.error && (this.error['from'] || this.error['to'])) {
        // const err = {};
        // err[this.error] = true;
        return this.error;
      }
      return null;
    }
    return null;
  }
  testDateParsing(date: string) {
    // If regex is a regex test it, otherwise it could be a string/array of formats to be tested with moment
    if (this.regex instanceof RegExp) {
      return this.regex.test(date);
    } else {
      return date ? new DateModel(date, { regex: this.regex }).date.isValid() : false;
    }
  }

  inputTypeName(): string {
    return 'DateTimeInputComponent';
  }

  ngOnInitForChildren() {
    // non faccio nulla
  }

  extractInformationFromInternalInput($event: any) {
    // non faccio nulla
  }
}
