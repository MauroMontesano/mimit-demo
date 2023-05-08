import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { DateModel } from '@engular/base-models';
import { InputDateIntervalComponent } from '@engular/forms-base';
import * as momentNs from 'moment';
declare const $: any;

const moment = momentNs;

@Component({
  selector: 'eaf-old-input-date-range',
  templateUrl: './input-old-date-range.component.html',
  styleUrls: ['./input-old-date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOldDateRangeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputOldDateRangeComponent),
      multi: true,
    },
  ],
})
export class InputOldDateRangeComponent extends InputDateIntervalComponent {
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

  @Input() disableFrom = false;
  @Input() disableTo = false;

  protected options: any = {
    inputFormat: [this.format],
    outputFormat: this.format,
    weekDayFormat: 'narrow',
    markup: 'bootstrap4',
    gainFocusOnConstruction: false,
    locale: 'it',
    useCurrent: false,
  };

  constructor(injector: Injector) {
    super(injector);
  }

  // ngAfterViewInit() {}

  // ngOnInitForChildren() {}

  setFormatToDataPicker(format: string) {
    this.options.inputFormat = [format];
    this.options.outputFormat = format;
  }

  setDateInDatePicker(where: any, initializedElement: any, date: DateModel) {
    if (initializedElement) {
      this.log.debug('Set date in ' + this.id + ' by jquery', date);

      initializedElement.datepicker('setDate', date.toDate() || null);
      where['optionDate'] = date || null;

      if (!date) {
        if (this.initialized1 === initializedElement) {
          initializedElement.datepicker('destroy');
          this.initializeLibrary('from');
        } else {
          initializedElement.datepicker('destroy');
          this.initializeLibrary('to');
        }

        // .data('datepicker')
      } else {
        this.formControl.markAsDirty();
      }
    } else {
      this.log.debug('Set date in ' + this.id + ' by options', date);
      where['optionDate'] = date;
    }
  }

  initializeLibrary(where: string) {
    this.options['min'] = this.minDate ? this.minDate.date.format(this.format.toUpperCase()).toUpperCase() : undefined;
    this.options['max'] = this.maxDate ? this.maxDate.date.format(this.format.toUpperCase()).toUpperCase() : undefined;

    let element;
    const options = { ...this.options };
    options['onUpdate'] = (value: unknown) => {
      this.onChangeDDate(value, where);
    };
    if (where === 'from') {
      element = this.input.nativeElement;
    } else {
      element = this.input2.nativeElement;
    }

    const initialized = $(element).datepicker(options);
    if (element['optionDate']) {
      this.setDateInDatePicker(element, initialized, element['optionDate']);
    }
    return initialized;
  }

  showDataPicker(where: any) {
    // if (where === 'from') {
    //   this.initialized1.datepicker('show');
    // } else {
    //   this.initialized2.datepicker('show');
    // }
    console.error('non chiamare showDataPicker');
  }
  hideDataPicker(where: any) {
    this.initialized1.datepicker('destroy');
    this.initialized2.datepicker('destroy');
    console.error('non chiamare hideDataPicker');
  }

  override validate(): ValidationErrors | null {
    if (this.value && this.value.from && this.value.to && this.value.from.date.isAfter(this.value.to.date)) {
      //controllo che siano in intervallo
      return { dateAfter: true };
    }

    return null;
  }

  override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    super.setDisabledState(isDisabled);
    // Metodi show / hide previsti dalla libreria ab-datepicker, ma non funzionanti (da verificare)
    // Risolto disabilitando e tramite CSS viene nascosto
    $(this.input.nativeElement).datepicker(isDisabled ? 'disable' : 'enable');
    $(this.input2.nativeElement).datepicker(isDisabled ? 'disable' : 'enable');

    super.setDisabledState(isDisabled);
  }

  ngDestroy() {
    this.initialized1.datepicker('destroy');
    this.initialized2.datepicker('destroy');
  }
}
