import { Input, Injector, Component } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';

/* @Component({
	selector: 'eng-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
}) */
@Component({
  template: '',
})
export abstract class SelectComponent extends BaseInputComponent {
  private _options: any[];
  selectedIndex: number | undefined;
  override placeholderHiddenIfReadOnly = false;

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * The field name to use to extract the value to write in form control.
   * If undefined it will use the entire object
   */
  @Input('field-for-id') fieldForId: string;

  /**
   * The field name to use for the label of option. Default: 'descrizione'
   */
  @Input('field-for-option') fieldForOptionElement: string = 'descrizione';

  /**
   * The placeholder
   */
  @Input() override placeholder: string = 'INPUT.SELECT_PLACEHOLDER';

  /**
   * The options of select
   */
  @Input('options')
  set options(options: any[]) {
    this.log.info('set options', options);
    if (!options) {
      return;
    }
    // if use did't set id field i set for him
    for (let i = 0; i < options.length; i++) {
      if (!options[i][this.fieldForId || 'id']) {
        options[i][this.fieldForId || 'id'] = i;
      }
    }
    this._options = options;
    this.manageInitialValue();
  }

  get options() {
    return this._options;
  }

  protected manageInitialValue(): any {
    // @ale TODO da rivedere perchè c'è ridondanza
    // if we are post value from formcontroll and also options are loaded
    if (this.value && this._options && this._options.length > 0) {
      this.log.info('Manage initial value', this.value, this.options);
      /*this.options.forEach((option)=>{
				let rightValue=this.getRightValue(option);
				if(rightValue===this.value){
				}
			});*/
      if (this.value && typeof this.value !== 'object') {
        // CASE1 not object
        if (!this.fieldForId) {
          // but if give me id and not with field use you are an asino
          throw new Error("You did't set filedForId but you set a not object as init value of formcontrol");
        }
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i][this.fieldForId] == this.value) {
            this.selectedIndex = i;
            break;
          }
        }
      } else {
        if (!this.fieldForId) {
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] == this.value || this.isTwoObjectEquivalent(this.value, this.options[i])) {
              this.selectedIndex = i;
              break;
            }
          }
        } else {
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i][this.fieldForId] == this.value[this.fieldForId]) {
              this.selectedIndex = i;
              break;
            }
          }
        }
      }
    } else {
      this.selectedIndex = undefined;
    }
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
    for (const key in valueObject) {
      if (valueObject[key] !== optionObj[key]) {
        equivalent = false;
      }
    }
    return equivalent;
  }

  /**
   * Helper to extract from option element the right value based on fieldForId
   */
  protected getRightValue(option: any): any {
    if (this.fieldForId) {
      return option[this.fieldForId];
    } else {
      return option;
    }
  }

  writeValue(objOrId: any): void {
    this.log.info('writeValue ' + this.id + ':', objOrId);
    if (objOrId) {
      this.value = objOrId;
    } else {
      this.value = undefined;
    }

    this.manageInitialValue();
  }

  inputTypeName(): string {
    return 'SelectInputComponent';
  }

  extractInformationFromInternalInput($event: any) {
    let valueExtracted = this.findSelectObject($event.target.value);
    if (valueExtracted && this.fieldForId) {
      valueExtracted = valueExtracted[this.fieldForId];
    }
    this.log.debug('extractInformationFromInternalInput', valueExtracted);
    return valueExtracted;
  }

  findSelectObject(id: any) {
    let objectFounded;
    this.options.forEach((option) => {
      if (String(option[this.fieldForId || 'id']) === String(id)) {
        objectFounded = option;
      }
    });
    return objectFounded;
  }
}
