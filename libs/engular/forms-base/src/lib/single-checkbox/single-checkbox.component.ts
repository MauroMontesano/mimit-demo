import { Component, Injector, Input } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';

/* 
@Component({
	selector: 'eng-single-checkbox',
	templateUrl: './single-checkbox.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SingleCheckboxComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SingleCheckboxComponent),
			multi: true,
		},
	],
}) */
@Component({
  template: '',
})
export abstract class SingleCheckboxComponent extends BaseInputComponent {
  @Input('checked-value') checkedValue: any = true;
  @Input('unchecked-value') uncheckedValue: any = false;
  @Input() line: false;
  @Input('i18n-extra') i18nExtra: any;

  writeValue(value: any): void {
    if (!value || (value != this.checkedValue && value != this.uncheckedValue)) {
      this.value = this.uncheckedValue;
    } else {
      this.value = value;
    }
  }
  inputTypeName(): string {
    return 'SingleCheckboxInputComponent';
  }

  extractInformationFromInternalInput($event: any) {
    this.log.info('new value', $event.target.value);
    return 'e non doveva fare questo giro';
  }
  onClick() {
    if (this.disabled || this.readonly) {
      return;
    }
    if (this.value === this.checkedValue) {
      this.log.info('deselect');
      this.value = this.uncheckedValue;
    } else {
      this.log.info('select');
      this.value = this.checkedValue;
    }
    if (this.onChangeCallBack) {
      this.onChangeCallBack(this.value);
    }
  }
  constructor(injector: Injector) {
    super(injector);
  }
}
