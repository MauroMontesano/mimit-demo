import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BaseModel } from '@engular/base-models';
import { Observable, Subscription } from 'rxjs';
import { BasePageComponent } from '../base-page/base-page.component';

/*
  ,---------------------------------------------------++++------.
  | ,-------------------.                              `T$b. PL |
  | |       _.$._       | NAME(-S):      Mario           `T$b.  |
  | |    &;;$$$$$;;&    | SURNAME:       Rossi             `T$b.|
  | |   d&&&&&:&&&&&b   | NICKNAME:      mario.rossi         `T$l
  | |  d$P^'`:;:`'^T&b  | SIG:           MRC (gan)(997)        `l
  | |  &;,--.   .--.:&  | ADRESS:        Universe (this)        |
  | |  :; (o>`  ` / :|  | MOBILE NUMBER: +48 608093718          |
  | | :|      \     |;  | HOME NUMBER:   [classified]           |
  | |   :    ,_l    ;   | WORK NUMBER:   n/a                    |
  | |    \  .___.  /    | E-MAIL(-S):    mario.rossi@eng.it     |
  | |     :.  -  .;     |                                       |
  | |   _.; `---' :._   |                                       |
  | |gd$$$$.     .$$$$bp|                                       |
  | '^^^^^^^^=-=^^^^^^^^'                                       |
  |  |_  |,  _   __  _ '                                        |
  |  :_l :_ :_l_ /_ |/ |                                        |
  |                  "-'                                        |
  |-----------------------------------+------------+------------|
  | DetailBasePageComponent          |NO: PL000001 | 18/05/2018 |
  '----------------------------------^------------^-------------'
*/

/**
 * This is the base page component for page that need to show model.
 * The model can arrive from back-end or from parent component (in lookup modality) so the order to get model is:
 * 1)In input gets the complete model (finish)
 * 2)If no model in input -> I load id from input and use it to call back-end
 * 3)If no id in input -> i try to read id from path (based on idKey param)
 *
 * 2 -> ngOnInit -> setIdKey -> _idModel (is present) -> stop but in setIdModel -> call to backend
 * 2 -> ngOnInit -> setIdKey  -> !_idModel (not present ) -> get id from path -> setIdModel -> call to backend
 *
 */
@Component({
  template: '',
})
export abstract class DetailBasePageComponent<M extends BaseModel | BaseModel[]>
  extends BasePageComponent
  implements OnInit
{
  /**
   * MODIFY ONLY IF YOU KNOW WHAT ARE YOU DOING (ASK TO ALE)
   */
  protected LOAD_MODEL_ON_INIT = true;

  /**
   * The model loaded. If set by input we are in the 1th case
   *
   */
  protected _model: M;

  /**
   * Output to sent to the outer parent component the model or the fact the loading it's completed (only in lookup mode)
   * it's  public to made it subscrible also from other observer
   */
  @Output() modelLoaded: EventEmitter<M> = new EventEmitter<M>();

  /**
   * Subscription to read path parameter
   *
   */
  protected pathIdSubscription: Subscription;

  /**
   * Id of model loaded
   */
  private _idModel: any;

  /**
   * This method set idKey the key to use to read id from path in case that we are in the 3th case
   */
  private set idKey(key: string) {
    if (key && !this._idModel) {
      this.pathIdSubscription = this.activatedRoute.paramMap.subscribe((param: any) => {
        const id = param.params[key];
        if (id) {
          this.idModel = isNaN(id) ? id : parseInt(id);
        } else {
          this.log.error(`I can't found ${key} in the router path params`);
        }
      });
    }
  }

  @Input()
  protected set idModel(value: any) {
    if (value) {
      this._idModel = value;
      this.loadModelFromBackEnd(value);
    }
  }

  protected get idModel(): any {
    return this._idModel;
  }

  protected onLoadModelError(error: any) {}

  /**
   * Managed the loading phase of the model from back-end.
   * @param id number
   */
  protected loadModelFromBackEnd(id: any): void {
    this.startPageLoading();
    this.loadModel(id).subscribe(
      (model: M) => {
        this.model = model;
        this.modelLoaded.emit(model);
      },
      (error) => {
        this.stopPageLoading();
        this.onLoadModelError(error);
      },
      () => {
        this.stopPageLoading();
      }
    );
  }

  @Input()
  set model(value: M) {
    this.log.debug('set model detail base', value);
    this._model = value;
    if (this._model) {
      this.manageModel();
    }
  }

  get model(): M {
    return this._model;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    if (this.LOAD_MODEL_ON_INIT && !this._model) {
      this.idKey = this.getPathKeyForTakeId();
    } else if (this.LOAD_MODEL_ON_INIT) {
      // also if i have the model in input i call the set to innest possible business logic
      // not insert @input directly in set because there are life cycle problem
      this.model = this._model;
    }
    super.ngOnInit();
  }
  /**
   * This method can be override by extend class to made operation on / or when the model will loaded.
   */
  protected manageModel(): void {}

  /*
	************************************************
		TEMPLATE METHOD
		http://wikipedia.org/wiki/Template_method
	************************************************

	*/

  /**
   * Method that will called when model have to be loaded from back-end and have to return a promise of <M>
   * @param id
   * @return Promise<M>
   */
  protected abstract loadModel(id: any): Observable<M>;

  /**
   * It's a life-cycle method to get from children class the key to use to get id of model to load
   */
  protected abstract getPathKeyForTakeId(): string;
}
