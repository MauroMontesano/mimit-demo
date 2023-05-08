import { Component, Input } from '@angular/core';
import { LayoutSize } from '@engular/base-models';
@Component({
  template: '',
})
export abstract class ProgressBarComponent {
  _size: LayoutSize | null = null;

  @Input()
  set size(pipe: string | LayoutSize) {
    this._size = this.convertSize(pipe);
  }

  @Input()
  label: string;

  @Input('percent')
  set percent(value: number) {
    value = value || 0;
    this.classProgress = this.getClassFromPercent(value);
  }

  @Input()
  classProgress: string;

  protected abstract getClassFromPercent(percent: number): string;
  protected abstract convertSize(pipe: string | LayoutSize): LayoutSize;
}
