import { AfterViewInit, Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DateModel, ValidationError } from '@engular/base-models';
import { ErrorLabelConstants } from '@engular/forms-errors';
import { BaseInputComponent } from '../base/base-input.component';

// @Component({
// 	selector: 'eng-input-double-date',
// 	templateUrl: './input-double-date.component.html',

// 	encapsulation: ViewEncapsulation.None,
// 	providers: [
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			useExisting: forwardRef(() => InputDoubleDateComponent),
// 			multi: true,
// 		},
// 		{
// 			provide: NG_VALIDATORS,
// 			useExisting: forwardRef(() => InputDoubleDateComponent),
// 			multi: true,
// 		},
// 	],
// })
@Component({
  template: '',
})
export abstract class InputDateIntervalComponent extends BaseInputComponent implements AfterViewInit {
  @Input()
  override placeholder = 'GG/MM/AAAA';

  @Input()
  fromLabel = 'INPUT.DDATE.FROM';

  @Input()
  toLabel = 'INPUT.DDATE.TO';

  @Input()
  regex: RegExp | string | string[];

  override error: string | ValidationError | any = { from: undefined, to: undefined };

  @Input()
  set format(format: string) {
    this._format = format;
    this.setFormatToDataPicker(format);
  }

  get format() {
    return this._format;
  }

  _format = 'dd/MM/yyyy';
  /**
   * The input field (FROM)
   */
  @ViewChild('inputFrom', { static: true })
  protected override set input(input: ElementRef) {
    this._input = input;
    if (!input) {
      return;
    }
    // this.input.nativeElement.onblur = () => {
    //   if (this.onTouchCallBack) {
    //     this.onTouchCallBack();
    //   }
    // };
  }
  protected override get input() {
    return this._input;
  }
  protected override _input: ElementRef;

  /**
   * The input field (TO)
   */
  @ViewChild('inputTo', { static: true })
  protected set input2(input2: ElementRef) {
    this._input2 = input2;
    if (!input2) {
      return;
    }
    // this.input2.nativeElement.onblur = () => {
    //   if (this.onTouchCallBack) {
    //     this.onTouchCallBack();
    //   }
    // };
  }
  protected get input2() {
    return this._input2;
  }
  protected _input2: ElementRef;

  // any ???
  protected initialized1: any;
  protected initialized2: any;

  constructor(injector: Injector) {
    super(injector);
    this.error = { from: undefined, to: undefined };
  }

  /**
   * Metodo per scrivere il valore dentro value, a seconda che gli venga passato
   * un date { from: ... , to: ... }
   */
  writeValue(date: any): void {
    let useLastTest = false;
    if (date) {
      // verifica date FROM: se non � un DateModel
      if (date.from && date.from instanceof DateModel === false) {
        const lastTest = new DateModel(date.from);
        if (lastTest.toDate()) {
          date.from = lastTest;
          useLastTest = true;
        } else {
          throw Error('You have to use only DateModel as input for from value of input-date-interval:' + this.id);
        }
      }

      // verifica date FROM: se non � un DateModel
      if (date.to && date.to instanceof DateModel === false) {
        const lastTest = new DateModel(date.to);
        if (lastTest.toDate()) {
          date.to = lastTest;
          useLastTest = true;
        } else {
          throw Error('You have to use only DateModel as input for To value of input-date-interval:' + this.id);
        }
      }

      // la data ha superato i controlli
      this.value = date;

      // la data date.from viene riversata nell'input (from)
      this.setDateInDatePicker(
        this.input.nativeElement,
        this.initialized1,
        this.value.from ? this.value.from : undefined
      );

      // la data date.to viene riversata nell'input 2 (to)
      this.setDateInDatePicker(this.input2.nativeElement, this.initialized2, this.value.to ? this.value.to : undefined);

      // bho
      if (useLastTest) {
        if (this.onChangeCallBack) {
          this.onChangeCallBack(date);
        }
      }
    } else {
      // parametro date in input assente:
      // gli input interni vengono sblankati settando undefined
      this.setDateInDatePicker(this.input.nativeElement, this.initialized1, undefined);
      this.setDateInDatePicker(this.input2.nativeElement, this.initialized2, undefined);
    }
  }

  inputTypeName(): string {
    return 'DateIntervalInputComponent';
  }

  /**
   * Inizializza gli input
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initialized1 = this.initializeLibrary('from');
      this.initialized2 = this.initializeLibrary('to');
    }, 1);
  }

  extractInformationFromInternalInput() {}

  /**
   * Valida la data
   * Ritorna value convertito in un DateModel se � una data valida, altrimenti setta gli errori e ritorna undefined
   */
  extractInformationFromInternalInputDouble(value: any, field: string): DateModel | null {
    if (this.testDateParsing(value)) {
      // data valida
      this.error[field] = null;
      return new DateModel(value);
    } else if (!this.disabled && !this.error) {
      // data non valida e devo mostrare errore
      // setta l'array error[]
      this.error[field] = field.toUpperCase() + '_DATE_INVALID';
      // this.validate();
      return null;
    } else {
      // non devo mostrare errori
      return null;
    }
  }

  /**
   * Ritorna true se la data � valida
   */
  testDateParsing(date: string) {
    // If regex is a regex test it, otherwise it could be a string/array of formats to be tested with moment
    if (this.regex instanceof RegExp) {
      return this.regex.test(date);
    } else {
      return date ? new DateModel(date, { regex: this.regex }).date.isValid() : false;
    }
  }

  /**
   * Al cambiamento della data inserita in uno dei due input:
   * - Valida la data e setta il value se la data � valida, altrimenti setta gli errori
   * - Lancia la callback sull'onChange
   */
  onChangeDDate = ($event: any, which: string) => {
    setTimeout(() => {
      // inizializza value se vuoto
      this.value = this.value || {};

      // value = { from: ... , to: ....}
      this.value[which] = this.extractInformationFromInternalInputDouble(
        which === 'from' ? this.input.nativeElement.value : this.input2.nativeElement.value,
        which
      );

      // nessuno dei due valori From e To
      if (!this.value.from && !this.value.to) {
        // sblank value
        this.value = undefined;
        if (this.onChangeCallBack) {
          this.onChangeCallBack(this.value);
        }
      }

      // se non c'� il value
      if (this.value) {
        console.debug('which', which, this.value[which]);
        this.log.debug('which', which, this.value[which]);
        if (this.onChangeCallBack) {
          this.onChangeCallBack(this.value);
        }
      }
    }, 250);
  };

  /**
   * Effettua la validazione e ritorna gli errori
   */
  override validate(): ValidationErrors | null {
    let finalError: ValidationErrors = {};

    // se ci sono stati errori nella data From
    if (this.error.from) {
      // setta l'errore { from: true } nell'oggetto finalError

      finalError[this.error.from] = true;
    }

    // se ci sono stati errori nella data To
    if (this.error.to) {
      // setta l'errore { to: true } nell'oggetto finalError

      finalError[this.error.to] = true;
    }

    // se l'input ha entrambi i valori digitati, ed il value � valorizzato per entrambe le date
    if (this.input.nativeElement.value && this.input2.nativeElement.value && this.value.to && this.value.from) {
      // valida se la data From � precedente alla data To
      if (this.value.to.date.isBefore(this.value.from.date)) {
        // setta l'errore { dateAfter: true } nell'oggetto finalError
        finalError = finalError || {};
        this.error.dataAfter = true;
        finalError['dateAfter'] = true;
      }
    }
    return finalError;
  }

  /**
   * Aggiunge sempre nelle etichette di validazione la DATE_LESS_OR_EQUAL_THAN
   */
  ngOnInitForChildren() {
    this.errorLabels = this.errorLabels || [];
    this.errorLabels.push(ErrorLabelConstants.DATE_LESS_OR_EQUAL_THAN('"da"', '"a"'));
  }

  abstract setFormatToDataPicker(format: string): any;
  abstract setDateInDatePicker(where: any, initializedElement: any, date: DateModel | string | Date | undefined): void;
  abstract initializeLibrary(where: any): ElementRef;
  abstract showDataPicker(where: any): any;
  abstract hideDataPicker(where: any): any;
}
