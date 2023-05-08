import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutSize } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';
import { EafLayoutSize } from '@webkit/shared';

@Component({
  selector: 'eaf-input-linebreak',
  templateUrl: './input-linebreak.component.html',
  styleUrls: ['./input-linebreak.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputLinebreakComponent implements OnInit {
  @HostBinding('class')
  @Input('class')
  styleClass = '';

  /**
   * Bootstrap size of input
   */
  _size: LayoutSize = new EafLayoutSize(12, 12, 12, 12);
  /**
   * Define the bootstrap size of input
   */

  @Input()
  set size(pipe: string | LayoutSize) {
    this._size = this.convertSize(pipe);
  }

  get size() {
    return this._size;
  }

  constructor(private layoutConfiguration: LayoutConfiguration) {
    //non faccio nulla
  }

  ngOnInit() {
    this.styleClass += 'eaf-input form-group  input-group-TODO-TS' + this._size.toClass();
  }

  protected convertSize(pipe: string | LayoutSize): LayoutSize {
    return this.layoutConfiguration.convertSize(pipe);
  }
}
