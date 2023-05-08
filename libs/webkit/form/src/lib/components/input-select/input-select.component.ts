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
@Component({
  selector: 'eaf-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent extends BaseInputComponent implements AfterViewInit, OnDestroy {
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
  }
  public override get disabled() {
    return this._disabled;
  }
  @Input()
  multi = false;

  @Input()
  nullable = true;

  @Input('elementsToShow')
  set breakingElementsToShow(value: number) {
    alert('elementsToShow rimosso lo stai utilizzando su ' + this.label);
  }

  groupsOfOptions: any;
  groupsOfOptionsKeys: any;

  // tslint:disable-next-line: no-any
  @Input() set options(options: Array<any> | { [key: string]: Array<any> }) {
    if (!options || options.length === 0) {
      return;
    }
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

    // if (this.initialized) {
    //   setTimeout(() => {
    //     // console.log('refresh');
    //     this.log.info('refresh select picker', finalOptions);
    //     this.initialized.selectpicker('refresh');
    //     this.manageInitialValue();
    //   }, 1);
    // }
  }
  get options(): Array<any> | { [key: string]: Array<any> } {
    return this._options;
  }

  // protected initialized: any;
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
  @Input('filterable')
  set breakingFilterable(value: boolean) {
    alert('filterable rimosso lo stai utilizzando su ' + this.label);
  }

  /**
   * If filter is based on "contains" or "startWith"  search string
   */

  @Input('liveSearchStyle')
  set breakingLiveSearchStyle(value: boolean) {
    alert('liveSearchStyle rimosso lo stai utilizzando su ' + this.label);
  }

  @Input('selectElementToDisplay')
  set breakingSelectElementToDisplay(value: boolean) {
    alert('selectElementToDisplay rimosso lo stai utilizzando su ' + this.label);
  }

  // optionLib: any = {
  //   noneSelectedText: 'Nessuna voce selezionata',
  //   liveSearch: false,
  //   liveSearchNormalize: true,
  //   liveSearchStyle: 'contains', //startsWith
  //   noneResultsText: 'Nessun elemento trovato per {0}',
  //   // container: '#wk-sport-cointainer',  disattivato, servirà se ci saranno problemi con le modali e la select
  //   dropupAuto: true,
  //   virtualScroll: '50',
  // };
  // protected manageDisableStatusOnLib(value: any) {
  //   if (this.initialized) {
  //     setTimeout(() => {
  //       // console.log('disable era', !value, value);
  //       this.initialized.selectpicker('refresh');
  //     }, 0);
  //   }
  // }

  // inizializzaLibreria() {
  //   this.initialized = $(this.input.nativeElement).selectpicker(this.optionLib);
  //   this.initialized.on('changed.bs.select', (e: any, clickedIndex: any, isSelected: any, previousValue: any) => {
  //     // console.log('on change', e, clickedIndex, isSelected, previousValue);
  //     // console.log('new value', this.initialized.selectpicker('val'));
  //     if (this._options) {
  //       this.onChangeSelect({});
  //     }
  //   });
  // }

  ngAfterViewInit(): void {
    const a = 1;
    // if (this.filterable) {
    //   this.optionLib['liveSearch'] = true;
    //   this.optionLib['liveSearchNormalize'] = true;
    //   this.optionLib['liveSearchStyle'] = this.liveSearchStyle;
    //   this.optionLib['noneResultsText'] = 'Nessun elemento trovato per {0}';
    // }

    // if (this.multi) {
    //   this.optionLib['selectedTextFormat'] = 'count > ' + this.selectElementToDisplay;
    // }
    // this.optionLib['size'] = this.elementsToShow;
    // if (this.options) {
    //   this.manageInitialValue();
    //   this.inizializzaLibreria();
    // }
    // // window.addEventListener('scroll', this.manageWindowScroll);  disattivato, servirà se ci saranno problemi con le modali e la select
    // this.log.debug('Lib inizialized', this.optionLib);
  }

  // is the method that writes a new value from the form model into the view or (if needed) DOM property.
  writeValue(objOrId: any): void {
    this.log.info('writeValue ' + this.id + ':', objOrId);
    if (objOrId) {
      this.value = objOrId;
      this.isWriteValueApply = false;
      this.formControl.markAsDirty();
    } else {
      this.value = undefined;
    }
    this.manageInitialValue();
  }

  inputTypeName(): string {
    return 'MultipleSelectComponent';
  }

  ngOnInitForChildren() {
    this.placeholderHiddenIfReadOnly = false;

    this.placeholder = this.placeholder ? this.placeholder : 'Seleziona';
    // this.styleClass += 'bootstrap-select-wrapper' + this.multi ? 'select-multiple show-tick' : '';
  }

  // setValueInLib() {
  //   if (this.initialized) {
  //     if (
  //       !this.formControl.dirty &&
  //       this.formControl.value !== undefined &&
  //       this.formControl.value !== null &&
  //       (!Array.isArray(this.formControl.value) || this.formControl.value.length > 0)
  //     ) {
  //       this.formControl.markAsDirty();
  //     }
  //     //	setTimeout(() => {
  //     let stringIds: any;
  //     if (this.selected) {
  //       stringIds = [];
  //       this.selected.forEach((element: any) => {
  //         stringIds.push('' + element[this.fieldForId || 'id']);
  //       });
  //     }
  //     if (stringIds) {
  //       // console.log(stringIds);

  //       this.initialized.selectpicker('val', stringIds);
  //       this.isWriteValueApply = true;
  //     } else {
  //       this.initialized.selectpicker('deselectAll');
  //       this.initialized.selectpicker('val', null);
  //     }
  //     if (!stringIds && !this.isWriteValueApply) {
  //       // console.log('updatevalue undefined if not stringids');
  //       this.updateValue(undefined);
  //       this.isWriteValueApply = true;
  //     }
  //     //console.log('mmm',this.isWriteValueApply, this.id)
  //     //	}, 2000);
  //   }
  // }

  // tslint:disable-next-line: cyclomatic-complexity
  protected manageInitialValue() {
    //fix per singoli valori quando non c'è la multiselect
    if (Array.isArray(this.value) === false && this.value) {
      if (this.fieldForId) {
        const tmp: any = {};
        tmp[this.fieldForId] = this.value;
        this.value = [tmp];
      } else {
        this.value = [this.value];
      }
    }

    //TODO da rivedere perchè c'è ridondanza
    //if we are post value from formcontroll and also options are loaded
    if (this.value && this.value.length > 0 && this._options && this._options.length > 0) {
      this.log.info('Manage initial value', this.value, this.options);
      /*this.options.forEach((option)=>{
				let rightValue=this.getRightValue(option);
				if(rightValue===this.value){

				}
			});*/
      if (this.value[0] && typeof this.value[0] !== 'object') {
        //CASE1 not object
        // console.log('not obj', this.value, this._options);

        if (!this.fieldForId) {
          //but if give me id and not with field use you are an asino
          throw new Error(`You didn't set fieldForId and you did set a non-object as the init value of formcontrol`);
        }
        this.selected = [];
        for (let j = 0; j < this.value.length; j++) {
          let found = false;

          for (let i = 0; !found && i < this.options.length; i++) {
            if (this._options[i][this.fieldForId] === this.value[j]) {
              found = true;
              this.selected.push(this._options[i]);
            }
          }
        }
        // console.log('selected', this.selected);
        // this.setValueInLib();
      } else {
        if (!this.fieldForId) {
          this.selected = [];
          for (let j = 0; j < this.value.length; j++) {
            let found = false;

            for (let i = 0; !found && i < this.options.length; i++) {
              if (this._options[i] === this.value[j] || this.isTwoObjectEquivalent(this.value[j], this._options[i])) {
                found = true;
                this.selected.push(this._options[i]);
              }
            }
          }
          // this.setValueInLib();
        } else {
          this.selected = [];
          for (let j = 0; j < this.value.length; j++) {
            let found = false;

            for (let i = 0; !found && i < this.options.length; i++) {
              if (this._options[i][this.fieldForId] === this.value[j][this.fieldForId]) {
                found = true;
                this.selected.push(this._options[i]);
              }
            }
          }
          // for (let i = 0; i < this.options.length; i++) {
          // 	if (this.options[i][this.fieldForId] === this.value[this.fieldForId]) {
          // 		this.selectedIndex = i;
          // 		break;
          // 	}
          // }
          // this.setValueInLib();
        }
      }
    } else {
      this.selected = undefined;
      this.selectedIndex = undefined;
      // this.setValueInLib();
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

  // public getSelectedOptions(): any {
  // 	if (this.initialized) {
  // 		return $(this.input.nativeElement).val();
  // 	}
  // 	return null;
  // }

  updateValue(value: any) {
    if (!value || value.length === 0 || !value[0]) {
      this.value = null;
    } else if (this.fieldForId) {
      const onlyIds: any = [];
      value.forEach((element: any) => {
        onlyIds.push(element[this.fieldForId]);
      });
      this.value = onlyIds;
    } else {
      this.value = value;
    }
    if (this.value && !this.multi) {
      this.value = this.value[0];
    }
    // console.log('value2', value, this.formControl.value, this.id);
    if (this.value !== this.formControl.value) {
      if (this.onChangeCallBack) {
        this.onChangeCallBack(this.value);
      }
      if (this.onTouchCallBack) {
        this.onTouchCallBack(this.value);
      }
    }
  }

  public onChangeSelect = ($event: any) => {
    // this.change.emit($event);
    // this.selectedOptions: string[] = this.getSelectedOptions();
    // console.log('pre value3');
    // if (!this.isWriteValueApply) {
    //   this.isWriteValueApply = true;
    //   return;
    // }
    // console.log('onChangeSelect', $event.target.options);
    const a = 1;
    // if (a === 1) {
    //   return;
    // }
    const selections: any = [...$event.target.options] // convert to real Array
      .filter((option: any) => option.selected)
      .map((option: any) => option.value);
    // console.log('value3', selections, this.formControl.value);
    if (!Array.isArray(selections)) {
      // console.log('updatevalue onchange if not array', selections);

      this.updateValue([this.findSelectObject(selections)]);
    } else if (selections && selections.length > 0) {
      const value: any = [];
      selections.forEach((e) => {
        value.push(this.findSelectObject(e));
      });
      // console.log('updatevalue onchange if array', value);
      this.updateValue(value);
    }
    //  else if (this.initialized) {
    //   // console.log('updatevalue onchange if this.init', undefined);
    //   this.updateValue(undefined);
    //   // this.initialized.selectpicker('val', '');
    // }

    /* if (this.onChangeCallBack) {
			this.onChangeCallBack(this.value);
		}
		if (this.onTouchCallBack) {
			this.onTouchCallBack(this.value);
		} */
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
    // console.log('extract Information', $event);
    throw new Error('extractInformationFromInternalInput non ti aspettavi che entrasse e invece');
  }

  // cerca l'oggetto selezionato tra le options
  findSelectObject(id: any) {
    let objectFounded;
    if (
      typeof id === 'string' &&
      this._options &&
      this._options[0] &&
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
    const a = 1;
    // console.log('destroy select');
    // window.removeEventListener('scroll', this.manageWindowScroll);  disattivato, servirà se ci saranno problemi con le modali e la select
    // this.initialized.selectpicker('destroy');
  }

  manageWindowScroll = () => {
    // if (this.elementRef && this.initialized && !this.checkInView(this.elementRef, false)) {
    //   // console.log('chiudi');
    //   //  this.initialized.selectpicker('show');
    //   this.elementRef.nativeElement.click();
    // }
  };

  //presa da  https://stackoverflow.com/questions/16308037/detect-when-elements-within-a-scrollable-div-are-out-of-view
  // checkInView(elem: any, partial: any) {
  //   // disattivato, servirà se ci saranno problemi con le modali e la select
  //   const container = $(elem.nativeElement).closest('.scrollable')[0];
  //   if (!container) {
  //     return true;
  //   }

  //   const contTop = container.scrollTop;

  //   const isTotal = elem.nativeElement.offsetTop + elem.nativeElement.offsetHeight > contTop; //(elemTop >= 0 &&  elemBottom > contTop );
  //   // const isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.offsetHeight)) && partial ;
  //   // console.log('~', elem.nativeElement.offsetTop + elem.nativeElement.offsetHeight, contTop);
  //   return isTotal;
  // }
}
