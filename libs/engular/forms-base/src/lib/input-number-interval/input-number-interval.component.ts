import { Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationError } from '@engular/base-models';
import { ErrorLabelConstants } from '@engular/forms-errors';
import { BaseInputComponent } from '../base/base-input.component';

/* @Component({
	selector: 'eng-input-number-interval',
	templateUrl: './input-number-interval.component.html',

	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputNumberIntervalComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => InputNumberIntervalComponent),
			multi: true,
		},
	],
}) */
@Component({
  template: '',
})
export abstract class InputNumberIntervalComponent extends BaseInputComponent {
  @Input()
  override placeholder = '';
  override error: string | ValidationError | any = { from: undefined, to: undefined };

  @ViewChild('input', { static: true })
  protected override set input(input: ElementRef) {
    this._input = input;
    if (!input) {
      return;
    }
    this.input.nativeElement.onblur = () => {
      if (this.onTouchCallBack) {
        this.onTouchCallBack();
      }
    };
  }

  protected override get input() {
    return this._input;
  }
  protected override _input: ElementRef;
  /**
   * The input field
   */
  @ViewChild('input2', { static: true })
  protected set input2(input: ElementRef) {
    this._input2 = input;
    if (!input) {
      return;
    }
    this.input2.nativeElement.onblur = () => {
      if (this.onTouchCallBack) {
        this.onTouchCallBack();
      }
    };
  }

  protected get input2() {
    return this._input2;
  }
  protected _input2: ElementRef;

  @Input()
  fromLabel = 'INPUT.FROM';
  @Input()
  toLabel = 'INPUT.TO';

  regex = /^-?[0-9]+$/;

  onIntervalChange(e: any) {
    this.log.info('onIntervalChange', e);
    if (e.type === 'blur' && e.target.value === '-') {
      e.target.value = '';
      this.log.info('blue events. clear', e.target);
    }

    const { id, value } = e.target;
    this.value = this.value || { from: undefined, to: undefined };

    const splitted = id.split('-');
    if (splitted.includes('from')) {
      this.input.nativeElement.value = value.replace(/(?!^-)\D/g, '');
      this.value.from = this.extractInformationFromInternalInput(this.input.nativeElement);
    } else {
      this.input2.nativeElement.value = value.replace(/(?!^-)\D/g, '');
      this.value.to = this.extractInformationFromInternalInput(this.input2.nativeElement);
    }

    if (!this.value.from && !this.value.to) {
      this.value = undefined;
      if (this.onChangeCallBack) {
        this.onChangeCallBack(this.value);
      }
    }
    if (this.value) {
      this.log.info('notify the new value is', this.value);
      if (this.onChangeCallBack) {
        this.onChangeCallBack(this.value);
      }
    }
  }

  writeValue(value: any): void {
    this.log.info('write new value', value);
    if (value) {
      this.input.nativeElement.value = value.from ? value.from.toString() : '';
      this.input2.nativeElement.value = value.to ? value.to.toString() : '';
    } else {
      this.input.nativeElement.value = '';
      this.input2.nativeElement.value = '';
    }
    this.log.info('write new value - result', this.input.nativeElement.value, this.input2.nativeElement.value);
  }
  inputTypeName(): string {
    return 'InputNumberIntervalComponent';
  }
  ngOnInitForChildren() {
    this.errorLabels = this.errorLabels || [];
    this.errorLabels.push(ErrorLabelConstants.INTERVAL_INVALID);
  }
  extractInformationFromInternalInput(nativeElement: any): any {
    const field = nativeElement.id.split('-')[1];
    this.log.info(
      'extract information:',
      field,
      nativeElement.value,
      nativeElement.value.length,
      this.regex.test(nativeElement.value)
    );
    if (nativeElement.value.length > 0 && this.regex.test(nativeElement.value)) {
      this.error = null;
      return +nativeElement.value;
    } else if (nativeElement.value.length > 0 && !this.disabled && !this.error) {
      this.error = field.toUpperCase() + '_notNumber';
      return undefined;
    } else {
      return null;
    }
  }
  override validate(): ValidationErrors {
    let finalError;
    if (this.error && typeof this.error === 'string') {
      finalError = finalError || {};
      finalError[this.error] = true;
    }
    if (this.input.nativeElement.value && this.input2.nativeElement.value && this.value) {
      if (this.value.to < this.value.from) {
        finalError = finalError || {};
        finalError['intervalError'] = true;
      }
    }
    if (finalError) {
      this.log.info('error:', finalError);
    }

    return finalError as ValidationError;
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
