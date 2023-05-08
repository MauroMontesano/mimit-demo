import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '@engular/forms-base';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, toArray } from 'rxjs/operators';
declare const $: any;

@Component({
  selector: 'eaf-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true,
    },
  ],
})
export class InputAutocompleteComponent
  extends BaseInputComponent
  implements AfterViewInit, AfterViewChecked, OnDestroy
{
  @Input('pending')
  pending!: boolean;

  // 'disabled' name generates a warning in the browser console
  @Input('disableInput') // disable it's special attribute -> see templete driven
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

  protected _options: any[] = [];

  callSubscription: Subscription | undefined;
  searchDebounceSubscripton: Subscription | undefined;
  searchDebounce: Subject<{ request: any; success: any }> | undefined;
  @Input() renderItem!: (item: any) => string | TemplateRef<any>;
  @Input()
  fieldForLabel: any;
  NOT_FOND_KEY = 'Nessun risultato trovato';
  // vista: false;
  @Input()
  closeOnScoll = true;
  oldInputString: any;
  instance: any;
  inizialized = false;

  /**
   * It's to specify the observable for search. The default simple filter the option
   */
  @Input()
  remote: ((param: string) => Observable<any[]>) | undefined;

  protected localRemote = (param: string) => {
    return from(this.options).pipe(
      filter((f: any) => {
        return param === '' || ('' + f.label.toLowerCase()).indexOf(param.toLowerCase()) >= 0;
      }),
      map((f) => {
        return f;
      }),
      toArray()
    );
  };
  /**
   * The options of select
   * @param options
   */

  @Input('options')
  set options(options: any[]) {
    this.log.info('set options', options);
    if (!options) {
      return;
    }
    this._options = options;
  }
  get options() {
    return this._options;
  }

  constructor(injector: Injector, readonly componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
    this.ngOnInitForChildren();
  }

  public onChange2 = ($event: any, label: any) => {
    // extracts the input value

    const value = this.extractInformationFromInternalInput($event);
    if (label === this.NOT_FOND_KEY) {
      this.gestisciBlur(label);
      return;
    }
    this.value = value;
    this.oldInputString = label;

    console.log('onchange', this.value);
    // if present, calls the onChangeCallback
    if (this.onChangeCallBack) {
      this.onChangeCallBack(this.value);
    }
  };

  initializeLib() {
    this.instance = $('#' + this.id + this.extId)
      .autocomplete({
        select: (event: any, ui: any) => {
          // console.log('select');
          this.onChange2(ui.item.option.value, ui.item.option.label);
        },
        source: (request: any, success: any) => {
          this.searchDebounce?.next({ request, success });
        },
        close: (event: any) => {
          // console.log('close');
          this.gestisciBlur(event.target.value);
        },
        create: () => {
          // console.log(ui, event);
        },
        //  forceFixPosition: "auto",
        // appendTo: '#' + this.id + this.extId + 'container',
      })

      .blur((event: any) => {
        this.gestisciBlur(event.target.value);
      });
    if (this.instance && this.instance.data && this.instance.data('ui-autocomplete') && this.renderItem) {
      this.instance.data('ui-autocomplete')._renderItem = (ul: any, item: any) => {
        return $('<li></li>').data('item.autocomplete', item).append(this.renderItem(item)).appendTo(ul);
      };
    }
    if (!this.inizialized) {
      this.inizialized = !!(this.instance.data && this.instance.data('ui-autocomplete'));
    }
  }

  ngAfterViewChecked() {
    if (!this.inizialized) {
      this.initializeLib();
      console.log('ngAfterViewChecked inizialize autocomplete');
    }
  }

  private gestisciBlur(input: any) {
    if (input === this.NOT_FOND_KEY) {
      // function to not remove the value or placeholder from input field
      setTimeout(() => {
        if (this.value !== undefined) {
          $('#' + this.id + this.extId + '-autocomplete').val(
            // this.value[this.fieldForOptionElement],
            this.value
          );
          this.input.nativeElement.value = this.oldInputString;
        } else {
          //if(event)event.target.value = '';
          this.input.nativeElement.value = '';
          $('#' + this.id + this.extId + '-autocomplete').prop('placeholder', this.placeholder);
        }
      }, 1);
    } else {
      if (input !== '') {
        this.input.nativeElement.value = this.oldInputString || '';
      } else {
        this.input.nativeElement.value = '';
        this.oldInputString = '';

        this.value = undefined;
        console.log('e qui si passa');
        if (this.onChangeCallBack) {
          this.onChangeCallBack(this.value);
        }
        if (this.onTouchCallBack) {
          this.onTouchCallBack(this.value);
        }
      }
    }
  }

  ngOnInitForChildren() {
    this.searchDebounce = new Subject();
    this.searchDebounceSubscripton = this.searchDebounce.pipe(debounceTime(500)).subscribe((search) => {
      const request = search.request;
      const success = search.success;
      this.pending = true;
      if (this.callSubscription) {
        this.callSubscription.unsubscribe();
      }
      this.callSubscription = (this.remote || this.localRemote)(request.term)
        .pipe(
          map((input: any[]) => {
            return input.map((res) => {
              return {
                label: res.label,
                value: res.label,
                option: {
                  label: res.label,
                  value: res.value, // pass the whole object
                  selected: false,
                },
              };
            });
          }),
          map((input: any[]) => {
            console.log('risultati', input);
            if (!input || input.length === 0) {
              return [
                {
                  label: 'Nessun risultato trovato',
                  value: undefined,
                  option: {
                    label: 'Nessun risultato trovato',
                    value: undefined, // pass the whole object
                    selected: false,
                  },
                },
              ];
            }
            return input;
          })
        )
        .subscribe(
          (dati) => {
            // check if first item is equal to the value entered by the user
            // if (
            // 	dati !== null &&
            // 	dati !== undefined &&
            // 	dati.length === 1 &&
            // 	dati[0].label === request.term
            // ) {
            // 	const instanceAutocomplete = this.instance || window['$'](
            // 		'#' + this.id + this.extId + '-autocomplete',
            // 	).autocomplete('instance');
            // 	instanceAutocomplete.selectedItem = dati[0];
            // 	this.onChange(dati[0].value);
            // }
            this.pending = false;
            success(dati);
          },
          () => {
            this.pending = false;
          }
        );
    });
    window.addEventListener('scroll', this.manageWindowScroll);
  }

  setValueInLib(value: any) {
    $('#' + this.id + this.extId + '-autocomplete').val(value);
    let valueString = '';
    if (value) {
      if (value.label) {
        valueString = value.label;
      } else if (value[this.fieldForLabel]) {
        valueString = value[this.fieldForLabel];
      }
    }
    this.input.nativeElement.value = valueString;
    this.oldInputString = valueString;
  }

  protected manageInitialValue(): any {
    if (this.value) {
      this.setValueInLib(this.value);
    } else {
      this.setValueInLib(undefined);
    }
  }

  inputTypeName(): string {
    return 'ComboboxAutocompleteComponent';
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

  extractInformationFromInternalInput($event: any) {
    if ($event instanceof Event === false) {
      this.log.debug('extractInformationFromInternalInput', $event);
      if (!$event || $event === '') {
        return undefined;
      }
      return $event;
    }
  }

  ngAfterViewInit() {
    this.initializeLib();
    this.manageInitialValue();
    // init property disable and placeholder

    this.formControl.valueChanges.subscribe(() => {
      if (this.formControl.disabled !== this.disabled) {
        this.disabled = this.formControl.disabled;
      }
    });
  }

  override ngOnDestroy() {
    if (this.inizialized) {
      $('#' + this.id + this.extId).autocomplete('destroy');
      $('#' + this.id + this.extId).removeData('autocomplete');
    }
    window.removeEventListener('scroll', this.manageWindowScroll);
  }

  manageWindowScroll = () => {
    if (this.closeOnScoll && this.inizialized) {
      this.instance.autocomplete('close');
    }
  };
}
