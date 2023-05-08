import { Component, Injector, Input } from '@angular/core';
import { RadioOption } from '@engular/base-models';
import { BaseInputComponent } from '../base/base-input.component';

/* @Component({
	selector: 'eng-radio',
	templateUrl: './radio.component.html',

	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => RadioComponent),
			multi: true,
		},
	],
}) */
@Component({
  template: '',
})
export abstract class RadioComponent extends BaseInputComponent {
  private _options: RadioOption[];

  @Input()
  line = false;
  /**
   * The field name to use to extract the value to write in form control.
   * If undefined it will use the entire object
   */
  @Input('field-for-id')
  fieldForId: string;

  /**
   * The field name to use for the label of option. Default: 'descrizione'
   */
  @Input('field-for-option')
  fieldForOptionElement: string = 'descrizione';

  /**
   * The options of select
   * @param options
   */
  @Input('options')
  set options(options: RadioOption[]) {
    this.log.info('set options', options);
    if (!options) {
      return;
    }

    this._options = options;
  }
  get options() {
    return this._options;
  }

  /**
   * The placeholder
   */
  @Input()
  override placeholder: string = 'INPUT.SELECT_PLACEHOLDER';

  writeValue(objOrId: any): void {
    this.log.info('writeValue ' + this.id + ':', objOrId);
    this.value = objOrId;
  }
  inputTypeName(): string {
    return 'RadioInputComponent';
  }

  extractInformationFromInternalInput($event: any) {
    this.log.info('new value', $event.target.value);

    return 'e non doveva fare questo giro';
  }

  onClick(option: RadioOption) {
    if (this.disabled || this.readonly) {
      return;
    }
    this.log.info('Choosed a radio button:', option);
    this.value = option.payload;
    if (this.onChangeCallBack) {
      this.onChangeCallBack(this.value);
    }
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
