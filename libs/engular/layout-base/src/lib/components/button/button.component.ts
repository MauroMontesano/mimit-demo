import { Component, EventEmitter, HostBinding, Injector, Input, OnInit, Output } from '@angular/core';

import { ButtonLayout } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';
@Component({
  template: '',
})
export abstract class ButtonComponent implements OnInit {
  protected layoutConfiguration: LayoutConfiguration;

  constructor(injector: Injector) {
    this.layoutConfiguration = injector.get(LayoutConfiguration);
    this.layout = this.layoutConfiguration.getButtonDefaultLayout();
  }

  /**
   * In case that there are more button with the same i18n in this way you can distinguish the different case
   */
  @Input() extId: string = '_' + Math.round(Math.random() * 100000);
  @HostBinding('attr.data-test-extId') forTestabilityExtid: string;
  @HostBinding('attr.data-test-id') forTestabilityId: string;
  /**
	/**
	 * i18n Title
	 */
  @Input()
  set title(title: string) {
    this._title = title;
    this.id = title.replace(/ /g, '_');
  }
  get title() {
    return this._title;
  }
  id: string;
  _title = 'INSERT TITLE PROPERTY';

  /**
   * Fa-icon name to use for left side
   */
  @Input() icon: string;

  /**
   * Fa-icon name to use for right side
   */
  @Input() iconRight: string;

  /**
   * If have to seem like a link
   */
  @Input() isLink = false;

  /**
   * Define the bootstrap size of button
   */
  @Input() size: string;

  /**
   * Define the bootstrap color of button
   */
  @Input() color: string;

  @Input()
  set layout(layout: ButtonLayout) {
    this._layout = layout || this._layout;
    this.size = layout.sizeToClass();
    this.color = layout.colorToClass();
  }
  get layout() {
    return this._layout;
  }

  private _layout: ButtonLayout;

  /**
   * Button class in addition to default
   */
  @Input() extraClass = '';

  /**
   * Define the bootstrap color of button
   */
  @Input() disabled: boolean;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  manageClick($event: any) {
    $event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.click.emit(this);
  }

  ngOnInit() {
    // for testability
    this.forTestabilityExtid = this.extId;
    this.forTestabilityId = this.title;
  }
}
