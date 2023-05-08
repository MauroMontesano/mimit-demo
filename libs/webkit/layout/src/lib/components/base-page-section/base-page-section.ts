import { Injectable, Input } from '@angular/core';
import { EafLayoutSize } from '@webkit/shared';

@Injectable()
export abstract class BasePageSection {
  @Input() id: string = 'BASE_PAGE_SECTION' + Math.round(Math.random() * 10000);

  _size: EafLayoutSize = new EafLayoutSize(12, 12, 12, 12);

  @Input()
  set size(pipes: string | EafLayoutSize) {
    if (pipes instanceof EafLayoutSize) {
      this._size = pipes;
    } else {
      this._size = EafLayoutSize.generateFromString(pipes);
    }
  }
}
