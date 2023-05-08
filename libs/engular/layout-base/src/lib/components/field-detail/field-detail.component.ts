import { HostBinding, Input, OnInit, Injector, Component } from '@angular/core';
import { LayoutSize } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';
@Component({
  template: '',
})
export abstract class FieldDetailComponent implements OnInit {
  protected layoutConfiguration: LayoutConfiguration;
  constructor(injector: Injector) {
    this.layoutConfiguration = injector.get(LayoutConfiguration);
  }

  @Input('label')
  set label(value: string) {
    this.id = value.replace(/\W*/g, '-');
    this._label = value;
  }
  _label: string;
  id: string;

  @Input()
  extId: string = '_' + Math.round(Math.random() * 100000);

  @HostBinding('attr.data-test-extId')
  forTestabilityExtid: string;

  @HostBinding('attr.data-test-id')
  forTestabilityId: string;

  @Input('value')
  value: any;

  /**
   * Bootstrap size of input
   */

  _size: LayoutSize = this.getDefaultSize();

  /**
   * Define the bootstrap size of input
   */

  @Input()
  set size(pipe: string | LayoutSize) {
    this._size = this.convertSize(pipe);
  }

  ngOnInit() {
    this.forTestabilityExtid = this.extId;
    this.forTestabilityId = this.label;
  }

  protected getDefaultSize(): LayoutSize {
    return this.layoutConfiguration.getInputDefaultSize();
  }
  protected convertSize(pipe: string | LayoutSize): LayoutSize {
    return this.layoutConfiguration.getInputDefaultSize();
  }
}
