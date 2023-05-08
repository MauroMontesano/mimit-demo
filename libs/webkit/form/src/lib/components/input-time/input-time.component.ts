import { Component, ElementRef, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateModel } from '@engular/base-models';
import { BaseInputComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true,
    },
  ],
})
export class InputTimeComponent extends BaseInputComponent {
  @ViewChild('inputDate', { static: true }) inputDate: ElementRef;
  @ViewChild('inputTime', { static: true }) inputTime: ElementRef;
  @Input('labels') labels = true;
  @Input('minDate') set setterMinDate(minDate: string | Date | DateModel | undefined) {
    if (minDate && !(minDate instanceof DateModel)) {
      this.minDate = new DateModel(minDate).toInputDateFormat();
    }
  }
  minDate: DateModel | string | undefined;
  @Input('maxDate') set setterMaXDate(maxDate: string | Date | DateModel | undefined) {
    if (maxDate && !(maxDate instanceof DateModel)) {
      this.maxDate = new DateModel(maxDate).toInputDateFormat();
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
      this.inputTime.nativeElement.value = this.value.date.format('HH:mm');
      // this.setDateInDatePicker(date);
    } else {
      this.inputDate.nativeElement.value = '';
      this.inputTime.nativeElement.value = '';
      // this.setDateInDatePicker(null);
    }
  }

  onChangeDataOrTime($event: any) {
    const date = this.inputDate.nativeElement.value;
    const time = this.inputTime.nativeElement.value;
    this.error = null;
    if (this.onChangeCallBack) {
      if (date && time) {
        const finalDate = new DateModel(date + ' ' + time, { regex: 'YYYY-MM-DD HH:mm' });
        this.onChangeCallBack(finalDate);
      } else if (!date && !time) {
        this.onChangeCallBack(null);
      } else {
        this.onChangeCallBack(null);
        this.error = { SelectBoth: true };
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
