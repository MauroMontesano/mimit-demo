import { Component, Injector, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActionRetrieved, BaseModel, ErrorMessage, Message, MessageType } from '@engular/base-models';
import { Observable } from 'rxjs';
import { ActionRetrievedType } from '../../constants/action-retrieved-type.const';
import { ErrorLabelsMaps } from '../../models/error-labels-map.interface';
import { TooltipMaps } from '../../models/tooltip-map.interface';
import { DetailBasePageComponent } from '../detail-base-page/detail-base-page.component';

@Component({
  template: '',
})
export abstract class FormBasePageComponent<M extends BaseModel | BaseModel[]>
  extends DetailBasePageComponent<M>
  implements OnInit
{
  /**
   * FormBuilder service instance
   */
  protected fb: UntypedFormBuilder;

  /**
   * The form
   */
  @Input()
  form: UntypedFormGroup;

  /**
   * The errors label for forms
   */
  errorLabels: ErrorLabelsMaps = {};

  /**
   * The tooltips for input
   */
  tooltips: TooltipMaps = {};

  /**
   * Indicate if there is there is some submitting operation
   */
  submitLoading: boolean = false;

  /**
   * Indicate if the form in insert modality or in edit mode
   */
  public isNewInsert() {
    return this.model === undefined && this.idModel === undefined;
  }

  constructor(injector: Injector) {
    super(injector);
    this.fb = injector.get(UntypedFormBuilder);
  }

  // override method
  @Input()
  override set model(value: M) {
    if (!value) {
      return;
    }
    this.log.debug('set model', value);
    this._model = value;
    if (this._model) {
      this.manageModel();
    } else {
      this.log.debug('no fullfill model received. I skip the fill form');
    }
    if (this.form && this.model) {
      // for update of model not for init see init for init
      this.fillForm(this.form, this._model);
      this.manageDetailPageCase();
    }
  }
  override get model(): M {
    return this._model;
  }

  override ngOnInit() {
    this.LOAD_MODEL_ON_INIT = false;
    const key = this.getPathKeyForTakeId();
    if (key && !this.idModel) {
      this.pathIdSubscription = this.activatedRoute.paramMap.subscribe((param: any) => {
        const id = param.params[key];
        if (id) {
          this.idModel = isNaN(id) ? id : parseInt(id);
        } else {
          // okay we are in a insert
        }
      });
    }

    this.form = this.createForm(this.form ? this.form : this.fb.group({}));
    this.errorLabels = this.rememberToCreateAndUseErrorLabels(this.errorLabels) || this.errorLabels;
    this.tooltips = this.rememberToCreateAndUseTooltips(this.tooltips) || this.tooltips;

    if (this.form && this.model) {
      this.fillForm(this.form, this.model);
      this.manageDetailPageCase();
    }
    // the order is important
    super.ngOnInit();
  }

  onSubmit(callbackForButton?: { onComplete: (mex?: Message) => any }): void {
    this.submitLoading = true;
    const model = this.extractDataToSubmit(this.form);
    let operation: Observable<M>;
    if (this.isNewInsert()) {
      operation = this.save(model);
    } else {
      if (!Array.isArray(model)) {
        model['id'] = this.idModel;
      }
      operation = this.update(model);
    }

    operation.subscribe(
      (modelFromBackend) => {
        // TODO here i can manage visualization of confirm
        this.submitComplete(modelFromBackend);
        this.notifyAction(new ActionRetrieved(ActionRetrievedType.SUBMIT_COMPLETE, modelFromBackend));
        if (callbackForButton) {
          callbackForButton.onComplete();
        }
      },
      (error: Error) => {
        this.submitLoading = false;
        // TODO here i can also manage visualization of error in form and by mex
        if (error instanceof ErrorMessage) {
          this.submitError(error);
          this.notifyAction(new ActionRetrieved(ActionRetrievedType.SUBMIT_ERROR, error));
          if (callbackForButton) {
            callbackForButton.onComplete();
          }
        } else {
          // WHY not managing this error? so i show a message for dev
          this.messageService.throwMessageSimple('ERROR.NOT_MANAGED', MessageType.ERROR_BLOCK, {
            errorDetails: JSON.stringify(error),
          });
          const errorMex = new ErrorMessage(error.message);
          errorMex.title = 'ERRORE.GENERICO_SERVER';
          errorMex.message = error.message;
          this.submitError(errorMex);
          if (callbackForButton) {
            callbackForButton.onComplete(errorMex);
          }
        }
      },
      () => {
        this.submitLoading = false;
      }
    );
  }

  protected manageDetailPageCase() {
    this.log.info('manageDetailPageCase', this.lookupType, this.activatedRoute.snapshot.data['lookupType']);
    this.lookupType = this.activatedRoute.snapshot.data['lookupType'] || this.lookupType;
    if (
      this.lookupType === this.LOOKUP_TYPE_CONSTANTS.DETAIL_MODE ||
      this.lookupType === this.LOOKUP_TYPE_CONSTANTS.INNER_DETAIL
    ) {
      this.form.disable();
      this.log.debug('form', this.form);
    }
  }

  /*
	************************************************
		TEMPLATE METHOD AT GO GO
		http://wikipedia.org/wiki/Template_method
	************************************************
            		 _________________________.
                    / _____________________  /|
                   / / ___________________/ / |
                  / / /| |               / /  |
                 / / / | |              / / . |
                / / /| | |             / / /| |
               / / / | | |            / / / | |
              / / /  | | |           / / /| | |
             / /_/___| | |__________/ / / | | |
            /________| | |___________/ /  | | |
            | _______| | |__________ | |  | | |
            | | |    | | |_________| | |__| | |
            | | |    | |___________| | |____| |
            | | |   / / ___________| | |_  / /
            | | |  / / /           | | |/ / /
            | | | / / /            | | | / /
            | | |/ / /             | | |/ /
            | | | / /              | | ' /
            | | |/_/_______________| |  /
            | |____________________| | /
            |________________________|/

*/

  /**
   * Demand the creation of form at children class.
   * @returns the form used in this component
   */
  abstract createForm(form: UntypedFormGroup): UntypedFormGroup;
  /**
   * This method will called if the component is in edit modality and allow to children component to fill form with right information
   * @param form the form to update
   * @param model the model loaded from back-end
   */
  abstract fillForm(form: UntypedFormGroup, model: M): void;

  /**
   * This method will called to extract information from form to send it to back-end for insert or update
   * @param form
   * @returns the model to sent to back-end for insert or update
   */
  abstract extractDataToSubmit(form: UntypedFormGroup): M;

  /**
   * This method will called to save model in insert case
   * @param model the model to save
   * @returns the observable from service
   */
  abstract save(model: M): Observable<M>;

  /**
   * This method will called to update model in edit case
   * @param model the model to update
   * @returns the observable from service
   */
  abstract update(model: M): Observable<M>;

  /**
   * This method will called when the call at back-end complete without problem.
   * @param model the model received from back-end
   * @returns the observable from service
   */
  abstract submitComplete(model: M): void;

  /**
   * This method will called when the call at back-end throw exception.
   * @param model the model received from back-end
   * @returns the observable from service
   */
  abstract submitError(error: ErrorMessage): void;

  /**
   * This method will called to remember to create the errorLabels
   */
  abstract rememberToCreateAndUseErrorLabels(errorLabel: ErrorLabelsMaps): ErrorLabelsMaps;

  /**
   * This method will called to remember to create the tooltips
   */
  abstract rememberToCreateAndUseTooltips(tooltip: TooltipMaps): TooltipMaps;
}
