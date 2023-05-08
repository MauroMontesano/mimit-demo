import { Component, Injector, Input } from '@angular/core';
import { CheckboxOption } from '@engular/base-models';
import { BaseInputComponent } from '../base/base-input.component';

// @Component({
// 	selector: 'eng-checkbox',
// 	templateUrl: './checkbox.component.html',

// 	encapsulation: ViewEncapsulation.None,
// 	providers: [
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			useExisting: forwardRef(() => CheckboxComponent),
// 			multi: true,
// 		},
// 		{
// 			provide: NG_VALIDATORS,
// 			useExisting: forwardRef(() => CheckboxComponent),
// 			multi: true,
// 		},
// 	],
// })
@Component({
  template: '',
})
export abstract class CheckboxComponent extends BaseInputComponent {
  private _options: CheckboxOption[];

  @Input()
  line: boolean = false;

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

  values: any[] = [];

  /**
   * The options of select
   * @param options
   */
  @Input('options')
  set options(options: CheckboxOption[]) {
    // this.log.info('set options', options);
    // if (!options) {
    // 	return;
    // }

    // this._options = options;
    // this.manageInitialization();
    this.log.info('set options', options);
    if (!options) {
      return;
    }
    const newArray: CheckboxOption[] = [];
    options.forEach((e) => {
      const copy = Object.create(e);
      for (const key in e) {
        if (e[key]) {
          copy[key] = e[key];
        }
      }
      newArray.push(copy);
    });
    this._options = newArray;
    this.manageInitialization();
  }
  get options(): CheckboxOption[] {
    return this._options;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  manageInitialization() {
    if (!this.values || !this.options || this.options.length === 0) {
      return;
    }

    this.values.forEach((v) => {
      let found = false;
      this.options.forEach((o: CheckboxOption) => {
        if (o.payload === v || this.isTwoObjectEquivalent(v, o) || this.isTwoObjectEquivalent(v, o.payload)) {
          found = true;
          o.checked = true;
        }
      });
      if (!found) {
        this.log.error('' + this.id + ' - Not found checkbox with value:', v);
      }
    });
  }

  isTwoObjectEquivalent(valueObject: any, optionObj: any) {
    let equivalent = true;

    if (valueObject instanceof Object === false) {
      return false;
    }
    // check for id if exist
    if (valueObject['id']) {
      return valueObject['id'] === optionObj['id'];
    }
    for (let key in valueObject) {
      if (valueObject[key] !== optionObj[key]) {
        equivalent = false;
      }
    }
    return equivalent;
  }

  /**
   * The placeholder
   */
  @Input()
  override placeholder: string = 'INPUT.SELECT_PLACEHOLDER';

  writeValue(objOrId: any): void {
    if (!objOrId) {
      this.values = [];
      this.options.forEach((o: CheckboxOption) => {
        o.checked = false;
      });
      this.log.debug('reset field');
      return;
    }
    if (objOrId instanceof Array === false) {
      objOrId = [objOrId];
    }
    this.log.info('writeValue ' + this.id + ':', objOrId);
    this.values = objOrId;
    this.manageInitialization();
  }
  inputTypeName(): string {
    return 'CheckboxInputComponent';
  }

  extractInformationFromInternalInput($event: any) {
    this.log.info('new value', $event.target.value);

    return 'e non doveva fare questo giro';
  }

  onClick(option: CheckboxOption) {
    if (this.disabled || this.readonly) {
      return;
    }
    this.log.info('click a checkbox:', option);
    if (option.checked) {
      this.log.info('deselect');
      let index = this.values.indexOf(option.payload);

      if (index > -1) {
        this.values.splice(index, 1);
      }
      option.checked = false;
    } else {
      this.log.info('select');
      this.values.push(option.payload);
      option.checked = true;
    }
    this.log.info('sent', this.values);
    if (this.onChangeCallBack) {
      this.onChangeCallBack(this.values);
    }
  }
}
