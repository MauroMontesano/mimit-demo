import { AfterViewInit, Component, ElementRef, HostBinding, Injector, Input, OnInit } from '@angular/core';

import { LayoutSize } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';
import { LoggerService, LoggerWriter } from '@engular/logger';
@Component({
	template: ''
  })
// tslint:disable:no-input-rename
export abstract class BaseDetailComponent implements OnInit, AfterViewInit {
	/**
	 * Logger writer instance of components
	 */
	log: LoggerWriter;

	layoutConfiguration: LayoutConfiguration;

	/**
	 * Identify of field. It will use also for i18n. If there are more that one fields with same i18n key to guarantee that id remains unique you have to set also the input ext-id
	 */
	@Input('label')
	set label(value: string) {
		this._label = value;
		this.id = value.replace(/\W+/g, '-');
	}
	_label:string;
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
	 * Bootstrap size of input's label
	 */
	_sizeValue: LayoutSize;

	/**
	 * Define the bootstrap size of input
	 */
	@Input('size-value')
	set sizeValue(pipe: string | LayoutSize) {
		this._sizeValue = this.convertSize(pipe);
	}

	/**
	 * The value of field
	 */
	@Input('value')
	set value(value: string) {
		this._value = value;
	}

	_value: string;

	private _antiOverrideNgOnInit = true;

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
						'! Please use ngOnInitForChildren instead. This will also call ngOnInit phase but after few important steps.\nIf you think it isn\'t overridden check error in input: ' +
						this.label,
				);
			}
		}, 1000);
	}

	ngOnInit() {
		this._antiOverrideNgOnInit = false;
		this._size = this._size ? this._size : this.getDefaultSize();
		this._sizeValue = this._sizeValue ? this._sizeValue : this.getInnerDefaultSize();
		this._sizeLabel = this._sizeLabel ? this._sizeLabel : this.getInnerDefaultSize();

		this.id = this.id || this.inputTypeName() + this.extId;

		this.ngOnInitForChildren();

		// for testability
		this.forTestabilityExtid = this.extId;
		this.forTestabilityId = this.id;

		this.log.info('Input ' + this.label + ' active:', this);
	}

	ngAfterViewInit(): void {
		throw new Error(
			'Remember to implement ngAfterViewInit method in ' +
				this.inputTypeName() +
				'. Generally this is the right place for external lib init. If you don\'t need it simply override this method with an empty function.',
		);
	}
	/**
	 * Return the name of page
	 */
	abstract inputTypeName(): string;

	/**
	 * If your component have to do something in ngOnInitPhase
	 */
	abstract ngOnInitForChildren(): any;

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
