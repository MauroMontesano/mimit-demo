import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { DateModel } from '@engular/base-models';
import { InputDateComponent as EngularInputDate } from '@engular/forms-base';
import * as momentNs from 'moment';
declare const $: any;

const moment = momentNs;
@Component({
  selector: 'eaf-input-old-date',
  templateUrl: './input-old-date.component.html',
  styleUrls: ['./input-old-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOldDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputOldDateComponent),
      multi: true,
    },
  ],
})
export class InputOldDateComponent extends EngularInputDate {
  @Input('minDate') set setterMinDate(minDate: string | Date | momentNs.Moment | DateModel | undefined) {
    if (minDate && !(minDate instanceof DateModel)) {
      this.minDate = new DateModel(minDate);
    }
  }
  minDate: DateModel | undefined;
  @Input('maxDate') set setterMaXDate(maxDate: string | Date | momentNs.Moment | DateModel | undefined) {
    if (maxDate && !(maxDate instanceof DateModel)) {
      this.maxDate = new DateModel(maxDate);
    }
  }
  maxDate: DateModel | undefined;

  protected options: any = {
    inputFormat: [this.format],
    outputFormat: this.format,
    weekDayFormat: 'narrow',
    markup: 'bootstrap4',
    gainFocusOnConstruction: false,
    onUpdate: (value: unknown) => {
      this.onChange(value);
    },
    locale: 'it',
    useCurrent: false,
  };
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    // non faccio nulla
  }

  setFormatToDataPicker(format: string) {
    this.options.inputFormat = format;
    this.options.outputFormat = format;
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

    if (date && this.initialized) {
      this.log.debug('Set date in ' + this.id + ' by jquery');

      this.initialized.datepicker('setDate', date.toDate() || null);
      this.options['date'] = date || null;
      if (!date) {
        this.initialized.datepicker('destroy');
        this.initializeLibrary();
      }
    } else {
      this.log.debug('Set date in ' + this.id + ' by options');
      this.options['date'] = date;
    }
  }

  hideDataPicker() {
    this._disabled;
  }

  initializeLibrary() {
    this.options['min'] = this.minDate ? this.minDate.date.format(this.format.toUpperCase()).toUpperCase() : undefined;
    this.options['max'] = this.maxDate ? this.maxDate.date.format(this.format.toUpperCase()).toUpperCase() : undefined;
    this.setDateInDatePicker(this.options['date']);
    this.initialized = $(this.input.nativeElement).datepicker(this.options);
  }

  showDataPicker() {
    this.initialized.datepicker('show');
  }

  // hideDataPicker() {}

  override validate(c: AbstractControl): ValidationErrors {
    let finalError: ValidationErrors = super.validate(c) || {};

    if (this.input.nativeElement.value && this.value) {
      const validate = this.value;
      if (
        this.maxDate &&
        // moment(validate.toString(), this.format.toUpperCase()).isAfter(
        //   moment(this.options['max'], this.format.toUpperCase()) )
        this.value.date.isAfter(this.maxDate.date)
      ) {
        finalError = finalError || {};
        finalError['dateBefore'] = {
          message: 'ERROR.DATE.GREATER_OR_EQUAL_THAN',
          messageParams: { firstDate: validate, secondDate: this.options['max'] },
        };
      } else if (
        this.minDate &&
        // moment(validate.toString(), this.format.toUpperCase()).isBefore(
        //   moment(this.options['min'], this.format.toUpperCase())
        // )
        this.value.date.isBefore(this.minDate.date)
      ) {
        finalError = finalError || {};
        finalError['dateAfter'] = {
          message: 'ERROR.DATE.LESS_OR_EQUAL_THAN',
          messageParams: { firstDate: validate, secondDate: this.options['min'] },
        };
      }
    }
    return finalError;
  }

  override setDisabledState(isDisabled: boolean): void {
    // Metodi show / hide previsti dalla libreria ab-datepicker, ma non funzionanti (da verificare)
    // Risolto disabilitando e tramite CSS viene nascosto
    $(this.input.nativeElement).datepicker(isDisabled ? 'disable' : 'enable');

    super.setDisabledState(isDisabled);
  }

  ngDestroy() {
    this.initialized.datepicker('destroy');
  }
}
