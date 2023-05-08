import { Component, EventEmitter, HostBinding, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionRetrieved, LookupTypeConstants } from '@engular/base-models';
import { MessageService } from '@engular/core-services';
import { LoggerService, LoggerWriter } from '@engular/logger';
@Component({
  template: '',
})
export abstract class BasePageComponent implements OnInit, OnDestroy {
  /**
   *  ActivatedRoute service instance
   */
  protected activatedRoute: ActivatedRoute;
  /**
   * Router service instance
   */
  protected router: Router;
  /**
   * Used to manage if page is loading @SEE pageLoading get property
   */
  private _pageLoading: boolean; // control on async validation services

  /**
   * Internal count of the number of async task. Based on that _pageLoading will be set to true or false
   */
  private _pageLoadingCounter: number;

  /**
   * Internal storage for lookupType modality of page
   * @SEE LookupTypeConstants to know the available value
   */
  private _lookupType: string;

  /**
   * Internal variable to avoid override of ngOnInit method
   */
  private _antiOverrideNgOnInit = true;

  /**
   * Internal variable to avoid override of ngOnDestroy method
   */
  private _antiOverrideNgOnDestroy = false;

  /**
   * Logger instance
   */
  protected log: LoggerWriter;

  /**
   * Public refer to LookupTypeConstants enum to use in html
   */
  LOOKUP_TYPE_CONSTANTS = LookupTypeConstants;

  /**
   * Callback that sends to the outer parent component witch action apply (in not page modality)
   */
  @Output()
  protected callbackAction: EventEmitter<ActionRetrieved> = new EventEmitter<ActionRetrieved>();

  @HostBinding('class')
  @Input('class')
  styleClass: string;

  /**
   * Define the working modality of page [Default is page]. Respect that the component behave or layout can change.
   */
  @Input()
  set lookupType(value: string) {
    this._lookupType = value;
  }

  get lookupType(): string {
    return this._lookupType;
  }

  protected titleService: Title;

  /*
      *********************************
        SERVICE INSTANCE
      *********************************
  	*/
  protected messageService: MessageService;
  constructor(private injector: Injector) {
    this.messageService = this.injector.get(MessageService);
    this.titleService = this.injector.get(Title);
    this.log = LoggerService.getLogger(this.pageName());
    this.activatedRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this._pageLoadingCounter = 0;

    setTimeout(() => {
      if (this._antiOverrideNgOnInit) {
        console.error(
          'You have problem with ngOnit on ' +
            this.pageName() +
            '!\n If You have overridden ngOnInit please use ngOnInitForChildren instead. It also will be called in ngOnInit phase but after few important steps.\n' +
            'Otherwise check initialization problems at component starting phase'
        );
      }
      if (this._antiOverrideNgOnDestroy) {
        console.error(
          'You have override NgOnDestroy on ' +
            this.pageName() +
            '! Please use ngOnDestroyForChildren instead. It will call also in NgOnDestroy phase but after few important steps.'
        );
      }
    }, 1000);
  }

  /**
   * Function to use to notify an action to the outer parent component
   */
  notifyAction(action: ActionRetrieved) {
    this.callbackAction.emit(action);
  }

  /**
   * Simplify the manual notification (For very rare custom cases)
   * @param name name of action to notify
   * @param payload payload for apply the action
   */
  notifyActionSimple(name: string, payload?: any) {
    this.notifyAction(new ActionRetrieved(name, payload));
  }

  /**
   * Increase the loading counter and turn on the page loading
   */
  startPageLoading() {
    this._pageLoadingCounter++;
    this.checkPageLoading();
  }

  /**
   * Decrease the loading counter, If counter arrive to 0 the page stop to loading
   */
  stopPageLoading() {
    if (this._pageLoadingCounter > 0) {
      this._pageLoadingCounter--;
    }
    this.checkPageLoading();
  }

  private checkPageLoading() {
    if (this._pageLoadingCounter === 0) {
      this._pageLoading = false;
    } else {
      this._pageLoading = true;
    }
  }

  /**
   * Gets if page is loading or not
   */
  get pageLoading() {
    return this._pageLoading;
  }

  ngOnInit() {
    this._antiOverrideNgOnInit = false;
    this.lookupType = this.lookupType || LookupTypeConstants.NO_LOOKUP;
    this.styleClass = this.styleClass || '';
    this.styleClass = this.styleClass + ' ' + this.generateCssClass();
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }
    this.ngOnInitForChildren();
  }

  ngOnDestroy(): void {
    // delete all subscription
    for (const prop in this) {
      const property = this[prop];
      if (property && typeof property['unsubscribe'] === 'function') {
        property['unsubscribe']();
      }
    }
    this.ngOnDestroyForChildren();
    this.log.info('destroyed');
  }

  /**
   * This method generate the css classes to append on component
   */
  protected generateCssClass(): string {
    const classFromComponentName = this.pageName().replace(/\W*/g, '-').toLowerCase();
    const classFromLooktype = this.lookupType.replace(/\W*/g, '-').toLowerCase();

    return `lookup-type-${classFromLooktype} ${classFromComponentName}`;
  }

  /*
      *********************************
        SOME FLOW METHOD TO IMPLEMENT
      *********************************
  	*/
  /**
   * Return the name of page
   */
  abstract pageName(): string;

  /**
   * If your component have to do something in ngOnInitPhase
   */
  abstract ngOnInitForChildren(): void;

  /**
   * If your component have to do something in ngOnDestroyPhase
   */
  abstract ngOnDestroyForChildren(): void;
}
