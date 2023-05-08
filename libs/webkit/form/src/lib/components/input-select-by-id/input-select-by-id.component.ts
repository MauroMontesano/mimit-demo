/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-input-rename */
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '@engular/forms-base';

declare const $: any;

@Component({
  selector: 'eaf-input-select-by-id',
  templateUrl: './input-select-by-id.component.html',
  styleUrls: ['./input-select-by-id.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectByIdComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputSelectByIdComponent),
      multi: true,
    },
  ],
})
export class InputSelectByIdComponent extends BaseInputComponent implements AfterViewInit, OnDestroy {
  constructor(injector: Injector, public elementRef: ElementRef) {
    super(injector);
  }

  @Input('disable-input') // disable it's special attribute -> see templete driven
  public override set disabled(value: boolean) {
    if (this._disabled === value) {
      return;
    }
    this._disabled = value;
    if (value && this.placeholderHiddenIfReadOnly) {
      this.placeholder = undefined;
    }

    this.manageDisableStatusOnLib(value);
  }
  public override get disabled() {
    return this._disabled;
  }
  @Input()
  multi = false;

  @Input()
  elementsToShow = 10;

  groupsOfOptions: any;
  groupsOfOptionsKeys: any;

  // tslint:disable-next-line: no-any
  @Input() set options(options: Array<any> | { [key: string]: Array<any> }) {
    // if (!options || options.length === 0) {
    //   this._options = [];
    //   return;
    // }
    let finalOptions: any;
    if (!Array.isArray(options)) {
      this.groupsOfOptionsKeys = [];
      this.groupsOfOptions = options;
      finalOptions = [];

      for (const key in options) {
        if (Array.isArray(options[key])) {
          this.groupsOfOptionsKeys.push(key);
          finalOptions.push(...options[key]);
        }
      }
    } else {
      finalOptions = options;
    }
    this.log.info('set options', finalOptions);
    if (!finalOptions) {
      return;
    }
    //if use did't set id field i set for him
    for (let i = 0; i < finalOptions.length; i++) {
      if (!finalOptions[i][this.fieldForId || 'id']) {
        finalOptions[i][this.fieldForId || 'id'] = i;
      }
    }
    this._options = finalOptions;

    if (this.initialized) {
      setTimeout(() => {
        console.log('refresh');
        this.log.info('refresh select picker', finalOptions);
        this.initialized.selectpicker('refresh');
        this.manageInitialValue();
      }, 1);
    }
  }
  get options(): Array<any> | { [key: string]: Array<any> } {
    return this._options;
  }

  protected initialized: any;
  // tslint:disable-next-line: no-any
  // tslint:disable-next-line: no-any
  public _options: Array<any> = [];
  // tslint:disable-next-line:no-input-rename
  @Input('field-for-id') fieldForId = '';
  // tslint:disable-next-line:no-input-rename
  @Input('field-for-option') fieldForOptionElement = 'descrizione';

  selectedIndex: any;
  selected: any;

  isWriteValueApply = true;
  /**
   * If the multiselect is filterable
   */
  @Input()
  filterable = false;

  /**
   * If filter is based on "contains" or "startWith"  search string
   */
  @Input()
  liveSearchStyle: 'contains' | 'startsWith' = 'contains';

  @Input()
  selectElementToDisplay = 5;

  optionLib: any = {
    noneSelectedText: 'Nessuna voce selezionata',
    liveSearch: false,
    liveSearchNormalize: true,
    liveSearchStyle: 'contains', //startsWith
    noneResultsText: 'Nessun elemento trovato per {0}',
    // container: '#wk-sport-cointainer',  disattivato, servirà se ci saranno problemi con le modali e la select
    dropupAuto: true,
    virtualScroll: '50',
  };
  protected manageDisableStatusOnLib(value: any) {
    if (this.initialized) {
      setTimeout(() => {
        console.log('disable era', !value, value);
        this.initialized.selectpicker('refresh');
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    if (!this.fieldForId) {
      throw new TypeError("'FieldForId' is required");
    }
    if (this.filterable) {
      this.optionLib['liveSearch'] = true;
      this.optionLib['liveSearchNormalize'] = true;
      this.optionLib['liveSearchStyle'] = this.liveSearchStyle;
      this.optionLib['noneResultsText'] = 'Nessun elemento trovato per {0}';
    }

    if (this.multi) {
      this.optionLib['selectedTextFormat'] = 'count > ' + this.selectElementToDisplay;
    }
    this.optionLib['size'] = this.elementsToShow;

    this.initialized = $(this.input.nativeElement).selectpicker(this.optionLib);
    if (this.options && this.options.length > 0) {
      this.manageInitialValue();
    }
    // window.addEventListener('scroll', this.manageWindowScroll);  disattivato, servirà se ci saranno problemi con le modali e la select
    this.log.debug('Lib inizialized', this.optionLib);
  }

  // is the method that writes a new value from the form model into the view or (if needed) DOM property.
  writeValue(value: string): void {
    this.log.info('writeValue ' + this.id + ':', value);
    if (value) {
      this.value = value;
      this.formControl.markAsDirty();
    } else {
      this.value = undefined;
    }
    this.isWriteValueApply = false;
    this.manageInitialValue();
  }

  inputTypeName(): string {
    return 'MultipleSelectComponent';
  }

  ngOnInitForChildren() {
    this.placeholderHiddenIfReadOnly = false;
    this.placeholder = this.placeholder ? this.placeholder : 'Seleziona';
    this.styleClass += 'bootstrap-select-wrapper' + this.multi ? 'select-multiple show-tick' : '';
  }

  setValueInLib() {
    if (this.initialized) {
      if (
        !this.formControl.dirty &&
        this.formControl.value !== undefined &&
        this.formControl.value !== null &&
        (!Array.isArray(this.formControl.value) || this.formControl.value.length > 0)
      ) {
        this.formControl.markAsDirty();
      }
      console.log('valore selezionato ', this.selected);
      let idValue: any;
      if (this.selected) {
        if (Array.isArray(this.selected)) {
          idValue = [];
          this.selected.forEach((element: any) => {
            idValue.push('' + element[this.fieldForId || 'id']);
          });
        } else {
          idValue = this.selected[this.fieldForId] ? this.selected[this.fieldForId] : undefined;
        }
      }
      if (idValue) {
        this.initialized.selectpicker('val', idValue);
        this.isWriteValueApply = true;
      } else {
        this.initialized.selectpicker('deselectAll');
        this.initialized.selectpicker('val', null);
      }
      if (!idValue && !this.isWriteValueApply) {
        this.updateValue(undefined);
        this.isWriteValueApply = true;
      }
    }
  }

  protected manageInitialValue() {
    if (this.value && typeof this.value !== 'object') {
      const tmp: any = {};
      tmp[this.fieldForId] = this.value;
      this.value = tmp;
    } else if (this.value && Array.isArray(this.value)) {
      const tempValue: any = [];
      this.value.forEach((e) => {
        const tmp: any = {};
        if (e && typeof e !== 'object') {
          tmp[this.fieldForId] = e;
          tempValue.push(tmp);
        } else {
          tempValue.push(e);
        }
      });
      this.value = tempValue;
    }
    console.log('value all init', this.value);
    if (this.value && this._options && this._options.length > 0) {
      this.log.info('Manage initial value', this.value, this.options);
      let found = false;
      if (Array.isArray(this.value)) {
        this.selected = [];
        for (let j = 0; j < this.value.length; j++) {
          for (let i = 0; !found && i < this.options.length; i++) {
            if (this._options[i][this.fieldForId] === this.value[j][this.fieldForId]) {
              found = true;
              this.selected.push(this._options[i]);
            }
          }
        }
        this.setValueInLib();
      } else {
        for (let i = 0; !found && i < this.options.length; i++) {
          if (this._options[i][this.fieldForId] === this.value[this.fieldForId]) {
            found = true;
            this.selected = this._options[i];
          }
        }
        this.setValueInLib();
      }
    } else {
      this.selected = undefined;
      this.selectedIndex = undefined;
      this.setValueInLib();
    }
  }

  updateValue(value: any) {
    if (!value) {
      return;
    }
    if (Array.isArray(value)) {
      const onlyIds: any = [];
      value.forEach((element: any) => {
        onlyIds.push(element[this.fieldForId]);
      });
      value = onlyIds;
    } else {
      const onlyId = value[this.fieldForId];
      value = onlyId;
    }
    if (value !== this.formControl.value) {
      if (this.onChangeCallBack) {
        this.onChangeCallBack(value);
      }
      if (this.onTouchCallBack) {
        this.onTouchCallBack(value);
      }
    }
  }

  public onChangeSelect = ($event: any) => {
    if (!this.isWriteValueApply) {
      this.isWriteValueApply = true;
      return;
    }
    const selection = this.initialized.selectpicker('val');
    // this.updateValue(this.findSelectObject(selection));
    // console.log('value3', selections, this.formControl.value);
    if (!Array.isArray(selection)) {
      this.updateValue(this.findSelectObject(selection));
    } else if (selection && selection.length > 0) {
      const value: any = [];
      selection.forEach((e) => {
        value.push(this.findSelectObject(e));
      });
      this.updateValue(value);
    } else if (this.initialized) {
      this.updateValue(undefined);
      // this.initialized.selectpicker('val', '');
    }
  };

  extractInformationFromInternalInput($event: any) {
    /*	//console.error('extractInformationFromInternalInput');
		let valueExtracted = this.findSelectObject($event.target.value);
		if (valueExtracted && this.fieldForId) {
			valueExtracted = valueExtracted[this.fieldForId];
		}
		this.log.debug('extractInformationFromInternalInput', valueExtracted);
		if(!this.multi && valueExtracted && ){
			valueExtracted[]
		}
		return valueExtracted;
		*/
    throw new Error('extractInformationFromInternalInput non ti aspettavi che entrasse e invece');
  }

  // cerca l'oggetto selezionato tra le options
  findSelectObject(id: any) {
    let objectFounded;
    if (
      typeof id === 'string' &&
      typeof this._options[0][this.fieldForId || 'id'] !== 'string' &&
      !isNaN(this._options[0][this.fieldForId || 'id'])
    ) {
      //fix per le stringhe che in realtà dovrebbero essere numeri
      id = +id;
    }
    if (Array.isArray(this.options)) {
      this.options.forEach((option) => {
        if (option[this.fieldForId || 'id'] === id) {
          objectFounded = option;
        }
      });
    }
    return objectFounded;
  }

  override ngOnDestroy() {
    // console.log('destroy select');
    // window.removeEventListener('scroll', this.manageWindowScroll);  disattivato, servirà se ci saranno problemi con le modali e la select
    this.initialized.selectpicker('destroy');
  }

  manageWindowScroll = () => {
    // if (this.elementRef && this.initialized && !this.checkInView(this.elementRef, false)) {
    //   // console.log('chiudi');
    //   //  this.initialized.selectpicker('show');
    //   this.elementRef.nativeElement.click();
    // }
  };

  //presa da  https://stackoverflow.com/questions/16308037/detect-when-elements-within-a-scrollable-div-are-out-of-view
  checkInView(elem: any, partial: any) {
    // disattivato, servirà se ci saranno problemi con le modali e la select
    const container = $(elem.nativeElement).closest('.scrollable')[0];
    if (!container) {
      return true;
    }

    const contTop = container.scrollTop;

    const isTotal = elem.nativeElement.offsetTop + elem.nativeElement.offsetHeight > contTop; //(elemTop >= 0 &&  elemBottom > contTop );
    // const isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.offsetHeight)) && partial ;
    // console.log('~', elem.nativeElement.offsetTop + elem.nativeElement.offsetHeight, contTop);
    return isTotal;
  }
}
