import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { ButtonComponent as EngularButton } from '@engular/layout-base';

@Component({
  selector: 'eaf-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends EngularButton {
  constructor(injector: Injector) {
    super(injector);
  }

  @Input()
  label: string | undefined;

  @Input() onlyIcon = false;

  @Input()
  type = 'button';

  getBtnClasses() {
    if (this.size && this.color) {
      return 'btn-' + this.size + ' btn-' + this.color;
    } else if (this.size) {
      return 'btn-' + this.size;
    } else if (this.color) {
      return 'btn-' + this.color;
    } else {
      return '';
    }
  }
}
