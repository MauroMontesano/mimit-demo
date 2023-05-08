import { Component, ElementRef, HostBinding, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, UntypedFormControl, ValidationErrors, Validator } from '@angular/forms';
import { ActionItem, ErrorLabel, LayoutSize, TooltipModel } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';
import { LoggerService, LoggerWriter } from '@engular/logger';
import { debounceTime, Subject, Subscription } from 'rxjs';
@Component({
  template: '',
})
// eslint:disable:no-input-rename
export abstract class BaseInputComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  /**
   * Logger writer instance of components
   */
  log: LoggerWriter;

  layoutConfiguration: LayoutConfiguration;

  @HostBinding('class')
  @Input('class')
  styleClass: string = '';

  /**
   * Identify of field. It will use also for i18n. If there are more that one fields with same i18n key to guarantee that id remains unique you have to set also the input ext-id
   */
  @Input('label')
  set label(value: string) {
    this._label = value;
    this.id = value.replace(/\W+/g, '-');
  }
  public get label() {
    return this._label;
  }
  _label: string;
  id: string;

  /**
   * In case that there are more input with the same i18n in this way you can distinguish the different case
   */
  @Input()
  extId: string = '_' + Math.round(Math.random() * 100000);

  @HostBinding('attr.data-test-extId')
  forTestabilityExtid: string;
  @HostBinding('attr.data-test-id')
  forTestabilityId: string;

  /**
   * The placeholder
   */
  @Input()
  placeholder: string | undefined;

  @Input()
  protected placeholderHiddenIfReadOnly = true;

  /**
   * The form control
   */
  @Input('formControl')
  set setterFormControl(value: AbstractControl | undefined | null) {
    if (value) {
      this.formControl = value;
    }
  }

  formControl: AbstractControl = new UntypedFormControl();

  @Input('value')
  readonlyValue: string;

  /**
   * Bootstrap size of input
   */
  _size: LayoutSize;

  /**
   * Define the bootstrap size of input
   */

  @Input()
  set size(pipe: string | LayoutSize) {
    this._size = this.convertSize(pipe);
  }

  /**
   * Bootstrap size of input's label
   */
  _sizeLabel: LayoutSize;

  /**
   * Define the bootstrap size of input
   */
  @Input('size-label')
  set sizeLabel(pipe: string | LayoutSize) {
    this._sizeLabel = this.convertSize(pipe);
  }

  /**
   * Bootstrap size of input's messages
   */
  _sizeMessages: LayoutSize;

  /**
   * Define the bootstrap size of input
   */
  @Input('size-messages')
  set sizeMessages(pipe: string | LayoutSize) {
    this._sizeMessages = this.convertSize(pipe);
  }

  /**
   * Bootstrap size of input's input
   */
  _sizeInput: LayoutSize;

  /**
   * Define the bootstrap size of input
   */
  @Input('size-input')
  set sizeinput(pipe: string | LayoutSize) {
    this._sizeInput = this.convertSize(pipe);
  }

  /**
   * The error labels to use on component
   */
  @Input('error-labels')
  errorLabels: Array<ErrorLabel>;

  tooltip: TooltipModel;
  /**
   * Tooltip of field
   */
  @Input('tooltip')
  set setterTooltip(t: TooltipModel | string) {
    if (typeof t === 'string') {
      this.tooltip = new TooltipModel(t);
    } else {
      this.tooltip = t;
    }
  }
  // set tooltip(t: TooltipModel){
  //   this._tooltip = t;
  // }

  // get tooltip() {
  //   return this._tooltip;
  // }
  /**
   * It's the function to call to send updated value
   */
  protected onChangeCallBack: any;
  /**
   * It's the function to call to send updated value
   */
  protected onTouchCallBack: any;

  protected _disabled: boolean;
  /**
   * Indicate if the field is disabled
   */
  @Input('disable-input') // disable it's special attribute -> see templete driven
  public set disabled(value: boolean) {
    if (this._disabled === value) {
      return;
    }
    this._disabled = value;
    if (value && this.placeholderHiddenIfReadOnly) {
      this.placeholder = undefined;
    }
  }
  public get disabled() {
    return this._disabled;
  }

  protected _readonly: boolean;
  /**
   * Indicate if the field is readonly
   */
  @Input('readonly-input') // readonly it's special attribute -> see templete driven
  public set readonly(value: boolean) {
    this._readonly = value;
    if (value && this.placeholderHiddenIfReadOnly) {
      this.placeholder = undefined;
    }
  }
  public get readonly() {
    return this._readonly;
  }

  /**
   * Actions displayed on the right of input
   */
  @Input('actions')
  set setterAction(actions: ActionItem[]) {
    this.actions = actions;
    if (actions) {
      actions.forEach((a) => (a.type = 'PRIMARY'));
    }
  }
  actions: ActionItem[];

  /**
   * A warning message that will always display bottom the input
   */
  @Input('warning')
  warningMessage: string;

  /**
   * Indicate if the field is required
   */
  @Input('isRequired') // required it's special attribute -> see templete driven
  required: boolean;

  /**
   * Contains the validation error generated by this component
   */
  error: ValidationErrors | string | null;

  /**
   * The value of field
   */
  value: any;

  private _antiOverrideNgOnInit = true;

  /**
   * The input field
   */
  @ViewChild('input', { static: true })
  protected set input(input: ElementRef) {
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

  protected get input() {
    return this._input;
  }
  protected _input: ElementRef;

  constructor(injector: Injector) {
    this.log = LoggerService.getLogger(this.inputTypeName());
    this.layoutConfiguration = injector.get(LayoutConfiguration);
    setTimeout(() => {
      if (this._antiOverrideNgOnInit) {
        // tslint:disable-next-line:no-console
        console.error(
          'You have overridden ngOnInit on ' +
            this.inputTypeName() +
            "! Please use ngOnInitForChildren instead. This will also call ngOnInit phase but after few important steps.\nIf you think it isn't overridden check error in input: " +
            this.label
        );
      }
    }, 1000);
  }
  protected _$onChangeDebounce = new Subject<any>();
  protected _$onChangeDebounceSubscription: Subscription;
  ngOnInit() {
    this._antiOverrideNgOnInit = false;
    this._size = this._size ? this._size : this.getDefaultSize();
    this._sizeInput = this._sizeInput ? this._sizeInput : this.getInnerDefaultSize();
    this._sizeLabel = this._sizeLabel ? this._sizeLabel : this.getInnerDefaultSize();
    this._sizeMessages = this._sizeMessages ? this._sizeMessages : this.getInnerDefaultSize();
    this.log.debug('ReadOnly Value', this.readonlyValue);
    this.id = this.id || this.inputTypeName() + this.extId;

    if (this.readonlyValue) {
      this.formControl = new UntypedFormControl();
      this.writeValue(this.readonlyValue);
      this.readonly = true;
    }

    if (!this.formControl) {
      this.log.error('Form Control for ' + this.label + '(' + this.inputTypeName + ") isn't defined! ");
      return;
    }

    this.checkRequired();
    this.ngOnInitForChildren();

    // for testability
    this.forTestabilityExtid = this.extId;
    this.forTestabilityId = this.id;
    this.styleClass += 'eaf-input form-group  input-group-TODO-TS' + this._size.toClass();
    this.log.info('Input ' + this.label + ' active:', this);
  }

  // ngAfterViewInit(): void {
  //   throw new Error(
  //     'Remember to implement ngAfterViewInit method in ' +
  //       this.inputTypeName() +
  //       ". Generally this is the right place for external lib init. If you don't need it simply override this method with an empty function."
  //   );
  // }

  // view -> model
  registerOnChange(fn: any): void {
    this._$onChangeDebounceSubscription = this._$onChangeDebounce.pipe(debounceTime(320)).subscribe(($event) => {
      // console.log('azz', $event);
      fn($event);
    });

    this.onChangeCallBack = (value: any) => {
      // console.log('alee', value);
      this._$onChangeDebounce.next(value);
    };
  }

  // view -> model
  registerOnTouched(fn: any): void {
    this.onTouchCallBack = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onChange = ($event: any) => {
    this.value = this.extractInformationFromInternalInput($event);

    // if present, calls the onChangeCallback
    if (this.onChangeCallBack) {
      this.onChangeCallBack(this.value);
    }
  };

  ngOnDestroy() {
    if (this._$onChangeDebounceSubscription && !this._$onChangeDebounceSubscription.closed) {
      this._$onChangeDebounceSubscription.unsubscribe();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.disabled) {
      if (typeof this.error === 'string') {
        const err = {};
        err[this.error] = true;
        return err;
      }
      return this.error;
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.log.info('registerOnValidatorChange');
    this.checkRequired();
  }

  checkRequired() {
    if (this.required) {
      return;
    }
    let required = false;
    if (this.formControl && this.formControl.validator) {
      const validationResult = this.formControl.validator(new UntypedFormControl());
      required = validationResult !== null && validationResult['required'] === true;
    }
    this.required = required;
  }

  /*
      *********************************
        SOME FLOW METHOD TO IMPLEMENT
      *********************************
    */

  /**
   * Managing the setting of value from formControl to internal input
   */
  // model -> view
  abstract writeValue(textInput: any): void;

  /**
   * Return the name of page
   */
  abstract inputTypeName(): string;

  /**
   * If your component have to do something in ngOnInitPhase
   */
  abstract ngOnInitForChildren(): any;

  /**
   * This method will called when base input component receive the onChange from input
   *
   */
  abstract extractInformationFromInternalInput($event: any): any;

  private getDefaultSize(): LayoutSize {
    return this.layoutConfiguration.getInputDefaultSize();
  }

  private getInnerDefaultSize(): LayoutSize {
    return this.layoutConfiguration.getInnerDefaultSize();
  }

  protected convertSize(pipe: string | LayoutSize): LayoutSize {
    return this.layoutConfiguration.convertSize(pipe);
  }
}
