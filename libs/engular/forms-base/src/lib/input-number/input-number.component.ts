import { Component, Injector, Input } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';

/* @Component({
	selector: 'eng-input-number',
	templateUrl: './input-number.component.html',

	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputNumberComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => InputNumberComponent),
			multi: true,
		},
	],
}) */
@Component({
  template: '',
})
export abstract class InputNumberComponent extends BaseInputComponent {
  @Input()
  override placeholder: string = '';

  @Input() min = 0;
  @Input() max: number;
  @Input() integer: number;
  @Input() decimal: number;

  regexString = '^-?[0-9]+';
  regexPulizia = /^-?[0-9]+/g;
  regex = new RegExp('');

  writeValue(value: number): void {
    if (value) {
      this.value = value;
      this.input.nativeElement.value = value.toString();
    } else {
      this.input.nativeElement.value = '';
    }
  }
  inputTypeName(): string {
    return 'InputNumberComponent';
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.decimal && this.integer) {
      this.decimal = this.decimal || 0;
      this.integer = this.integer || 9999999999;
      // let clearRegex = '[^\\d,-]';
      // let clearRegex = '/(?!^-)(?!(\d{0-'+ this.integer + '}\.\d{0-' + this.decimal + '}))\D/g';
      this.regexString = '^-?\\d{0,' + this.integer + '}((\\.|\\,)\\d{0,' + this.decimal + '})?';
    } else if (this.integer) {
      this.regexString = '^-?\\d{0,' + this.integer + '}';
    }
    this.regexPulizia = new RegExp(this.regexString);
    this.regex = new RegExp(this.regexString);
  }

  onBlur($event: any) {
    if ($event.target.value === '-') {
      $event.target.value = '';
    }
    this.onChange($event);
  }

  extractInformationFromInternalInput($event: any) {
    const stringaPulita = $event.target.value.match(this.regexPulizia);
    this.input.nativeElement.value = stringaPulita ? stringaPulita[0] : '';

    if (!this.checkMinValue() || !this.checkMaxValue()) {
      this.error = 'intervalError';
      // return null;
      return +this.input.nativeElement.value.replace(',', '.');
    }
    if (this.input.nativeElement.value.length > 0 && this.regex.test(this.input.nativeElement.value)) {
      this.error = null;
      return +this.input.nativeElement.value.replace(',', '.');
    } else if (this.input.nativeElement.value.length > 0 && !this.disabled && !this.error) {
      this.error = 'notNumber';
      return undefined;
    } else {
      return null;
    }
  }

  checkMinValue(): boolean {
    if (this.min !== null && this.min !== undefined) {
      if (Number(this.input.nativeElement.value) < Number(this.min)) {
        return false;
      }
    }
    return true;
  }

  checkMaxValue(): boolean {
    if (this.max !== null && this.max !== undefined) {
      if (Number(this.input.nativeElement.value) > Number(this.max)) {
        return false;
      }
    }
    return true;
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
