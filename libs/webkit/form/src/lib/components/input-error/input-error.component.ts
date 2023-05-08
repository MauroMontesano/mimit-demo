import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InputErrorComponent as EngularInputError } from '@engular/forms-base';
@Component({
  selector: 'eaf-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputErrorComponent extends EngularInputError {
  @Input() id: string;
  constructor() {
    super();
  }
}
