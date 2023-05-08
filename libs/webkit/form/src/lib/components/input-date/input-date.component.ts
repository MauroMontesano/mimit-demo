import { Component, ElementRef, forwardRef, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateModel } from '@engular/base-models';
import { BaseInputComponent } from '@engular/forms-base';
@Component({
  selector: 'eaf-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent extends BaseInputComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  @ViewChild('inputDate', { static: true }) inputDate: ElementRef;
  @Input('labels') labels = true;
  @Input('minDate') set setterMinDate(minDate: string | Date | DateModel | undefined) {
    if (minDate && !(minDate instanceof DateModel)) {
      this.minDate = new DateModel(minDate).toStringData();
    }
  }
  minDate: DateModel | string | undefined;
  @Input('maxDate') set setterMaXDate(maxDate: string | Date | DateModel | undefined) {
    if (maxDate && !(maxDate instanceof DateModel)) {
      this.maxDate = new DateModel(maxDate).toStringData();
    }
  }
  maxDate: DateModel | string | undefined;
  errorMessage: string | undefined;

  writeValue(date: DateModel): void {
    if (date && date instanceof DateModel === false) {
      throw Error('You have to use only DateModel as input for input-data:' + this.id);
    }
    if (date) {
      this.value = date;
      this.inputDate.nativeElement.value = this.value.date.format('YYYY-MM-DD');
    } else {
      this.inputDate.nativeElement.value = '';
    }
  }

  onChangeDate($event: any) {
    const date = this.inputDate.nativeElement.value;
    this.error = null;
    if (this.onChangeCallBack) {
      if (date) {
        const finalDate = new DateModel(date, { regex: 'YYYY-MM-DD' });
        this.onChangeCallBack(finalDate);
      } else {
        this.onChangeCallBack(null);
      }
    }
  }

  inputTypeName(): string {
    return 'DateTimeInputComponent';
  }

  ngOnInitForChildren() {
    // non faccio nulla
  }

  extractInformationFromInternalInput($event: any) {
    // let valueToUpdate = $event;
    // console.log($event.target);
    // if ($event.target.id === 'ex-date-time-date') {
    //   this.date = $event.target.value;
    // } else {
    //   this.time = $event.target.value;
    // }
    // if (typeof $event !== 'string') {
    //   $event.stopPropagation();
    //   valueToUpdate = $event.target.value;
    // }
    // if (!valueToUpdate) {
    //   this.error = null;
    //   return undefined;
    // }
    // console.log(this.date, this.time);
    // return this.date;
    // if (this.testDateParsing(valueToUpdate)) {
    //   this.error = null;
    //   return new DateModel(valueToUpdate);
    // } else if (!this.disabled && !this.error) {
    //   this.error = { invaliDDate: true };
    //   return undefined;
    // } else {
    //   return undefined;
    // }
  }
}
