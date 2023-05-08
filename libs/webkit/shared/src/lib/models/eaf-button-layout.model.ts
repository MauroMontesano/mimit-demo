import { ButtonLayout } from '@engular/base-models';
import { EafButtonColor } from '../enums/eaf-button-color.enum';
import { EafButtonSize } from '../enums/eaf-sport-button-size.enum';

export class EafButtonLayout implements ButtonLayout {
  size: EafButtonSize;
  color: EafButtonColor;
  extraClass: string | undefined;

  constructor(color: EafButtonColor, size: EafButtonSize, extraClass?: string) {
    //TODO aggiunge regex per classi consentite
    this.size = size;
    this.color = color;
    this.extraClass = extraClass;
  }

  sizeToClass(): string {
    let style = '';
    switch (this.size) {
      case EafButtonSize.LARGE:
        style = 'lg';
        break;
      case EafButtonSize.SMALL:
        style = 'sm';
        break;
      case EafButtonSize.XSMALL:
        style = 'xs';
        break;
      default:
        style = '';
        break;
    }
    return this.extraClass ? (style + ' ' + this.extraClass).trim() : style.trim();
  }
  colorToClass(): string {
    let style = '';
    switch (this.color) {
      case EafButtonColor._FEATURED:
      case EafButtonColor.ACTION:
        style = 'primary';
        break;
      case EafButtonColor.WARNING:
        style = 'warning';
        break;
      case EafButtonColor.DANGER:
        style = 'danger';
        break;
      case EafButtonColor._COMPLETE:
      case EafButtonColor.CONFIRM:
        style = 'success';
        break;
      default:
        style = '';
    }
    return style;
  }
}
