import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { DateModel } from '@engular/base-models';
import { BaseInputComponent } from '../base/base-input.component';

/* @Component({
	selector: 'eng-input-date',
	templateUrl: './input-date.component.html',

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
}) */
@Component({
  template: '',
})
export abstract class InputDateComponent extends BaseInputComponent implements AfterViewInit {
  /**
   * The placeholder
   */
  @Input()
  override placeholder = 'GG/MM/AAAA';

  @Input()
  regex: RegExp | string | string[];

  protected initialized: any;

  @Input()
  set format(format: string) {
    this._format = format;
    this.setFormatToDataPicker(format);
  }

  get format() {
    return this._format;
  }

  _format = 'dd/MM/yyyy';

  writeValue(date: DateModel): void {
    if (date && date instanceof DateModel === false) {
      throw Error('You have to use only DateModel as input for input-data:' + this.id);
    }
    if (date) {
      this.value = date;
      // setTimeout(() => {
      this.input.nativeElement.value = this.value.toString();
      // }, 2000);
      this.setDateInDatePicker(date);
    } else {
      this.input.nativeElement.value = '';
      this.setDateInDatePicker(null);
    }
  }

  inputTypeName(): string {
    return 'DateInputComponent';
  }

  ngAfterViewInit(): void {
    this.initializeLibrary();
  }

  extractInformationFromInternalInput($event: string | any): DateModel | undefined {
    let valueToUpdate = $event;
    if (typeof $event !== 'string') {
      $event.stopPropagation();
      valueToUpdate = $event.target.value;
    }
    if (!valueToUpdate) {
      this.error = null;
      return undefined;
    }

    if (this.testDateParsing(valueToUpdate)) {
      this.error = null;
      return new DateModel(valueToUpdate);
    } else if (!this.disabled && !this.error) {
      this.error = { invalidDate: true };
      return undefined;
    } else {
      return undefined;
    }
  }

  testDateParsing(date: string) {
    // If regex is a regex test it, otherwise it could be a string/array of formats to be tested with moment
    if (this.regex instanceof RegExp) {
      return this.regex.test(date);
    } else {
      return new DateModel(date, { regex: this.regex }).date.isValid();
    }
  }

  public override onChange = ($event: any) => {
    // setTimeout(() => {
    const old = this.value;
    this.value = this.extractInformationFromInternalInput($event);

    if (this.onChangeCallBack && (!this.value || !old || this.value.toString() !== old.toString())) {
      // console.error('onchage', this.value ? this.value.toDate() : '', old ? old.toString() : '');
      this.onChangeCallBack(this.value);
    }
    // }, 250);
  };

  constructor(injector: Injector) {
    super(injector);
  }
  abstract setFormatToDataPicker(format: string): any;

  abstract setDateInDatePicker(date: DateModel | undefined | null): any;
  abstract initializeLibrary(): any;
  abstract showDataPicker(): any;
  abstract hideDataPicker(): any;
}
