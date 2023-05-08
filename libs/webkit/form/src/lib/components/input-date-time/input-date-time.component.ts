import { Component, ElementRef, forwardRef, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { DateModel } from '@engular/base-models';
import { BaseInputComponent } from '@engular/forms-base';
@Component({
  selector: 'eaf-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateTimeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateTimeComponent),
      multi: true,
    },
  ],
})
export class InputDateTimeComponent extends BaseInputComponent {
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
  @ViewChild('inputDate', { static: true }) inputDate: ElementRef;
  @ViewChild('inputTime', { static: true }) inputTime: ElementRef;
  @Input()
  dateLabel = 'INPUT.DDATE.DATE';
  @Input()
  timeLabel = 'INPUT.DDATE.TIME';
  @Input('labels') labels = true;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    // non faccio nulla
  }

  setDateInDatePicker(date: DateModel) {
    if (date && date instanceof DateModel === false) {
      console.error(
        "Attenzione l'input date accetta solo input di tipo DateModel. Controlla l'input con id:" +
          this.id +
          ' perchè ha inviato',
        date
      );
    }
  }

  writeValue(date: DateModel): void {
    if (date && date instanceof DateModel === false) {
      throw Error('You have to use only DateModel as input for input-data:' + this.id);
    }
    if (date) {
      this.value = date;
      this.inputDate.nativeElement.value = this.value.date.format('YYYY-MM-DD');
      this.inputTime.nativeElement.value = this.value.date.format('HH:mm');
    } else {
      this.inputDate.nativeElement.value = '';
      this.inputTime.nativeElement.value = '';
    }
  }

  inputTypeName(): string {
    return 'DateTimeInputComponent';
  }
  extractInformationFromInternalInput($event: any) {
    //
  }

  override validate(c: AbstractControl): ValidationErrors {
    const finalError: ValidationErrors = super.validate(c) || {};
    return finalError;
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
}
