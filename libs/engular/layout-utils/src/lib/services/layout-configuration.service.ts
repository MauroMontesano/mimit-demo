import { Injectable } from '@angular/core';
import { LayoutSize, ButtonLayout } from '@engular/base-models';

@Injectable({ providedIn: 'root' })
export class LayoutConfiguration {
  getInputDefaultSize(): LayoutSize {
    console.error('remeber to overload the LayoutConfiguration');
    throw new Error('remeber to overload the LayoutConfiguration');
  }
  getInnerDefaultSize(): LayoutSize {
    console.error('remeber to overload the LayoutConfiguration');
    throw new Error('remeber to overload the LayoutConfiguration');
  }
  getButtonDefaultLayout(): ButtonLayout {
    console.error('remeber to overload the LayoutConfiguration');
    throw new Error('remeber to overload the LayoutConfiguration');
  }
  convertSize(pipe: string | LayoutSize): LayoutSize {
    console.error('remeber to overload the LayoutConfiguration');
    throw new Error('remeber to overload the LayoutConfiguration');
  }
  mapActionType(type: string): string {
    console.error('remember to overload the LayoutConfiguration');
    throw new Error('remeber to overload the LayoutConfiguration');
  }
}
