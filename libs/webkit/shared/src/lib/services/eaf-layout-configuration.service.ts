import { Injectable } from '@angular/core';
import { ButtonLayout, LayoutSize } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';
import { EafButtonColor } from '../enums/eaf-button-color.enum';
import { EafButtonSize } from '../enums/eaf-sport-button-size.enum';
import { EafButtonLayout } from '../models/eaf-button-layout.model';
import { EafLayoutSize } from '../models/eaf-layout-size.model';

@Injectable({
  providedIn: 'root',
})
export class EafLayoutConfigurationService extends LayoutConfiguration {
  override getInputDefaultSize(): LayoutSize {
    return EafLayoutSize.generateFromString('12|12|6|4');
  }
  override getInnerDefaultSize(): LayoutSize {
    return EafLayoutSize.generateFromString('12|12|12|12');
  }
  override getButtonDefaultLayout(): ButtonLayout {
    return new EafButtonLayout(EafButtonColor.ACTION, EafButtonSize.DEFAULT);
  }

  override convertSize(pipe: string | LayoutSize): LayoutSize {
    if (pipe instanceof LayoutSize) {
      return pipe;
    }
    return EafLayoutSize.generateFromString(pipe);
  }

  override mapActionType(type: 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY'): string {
    let output: string;
    switch (type) {
      case 'LINK':
        output = 'link';
        break;
      case 'NORMAL':
        output = 'default';
        break;
      case 'PRIMARY':
        output = 'primary';
        break;
      case 'SECONDARY':
        output = 'secondary';
        break;
      default:
        output = '';
        break;
    }
    return output;
  }
}
