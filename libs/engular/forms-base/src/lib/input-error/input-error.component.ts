import { Component, Input, ViewEncapsulation } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { ErrorLabel } from '@engular/base-models';

/*
@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'eng-input-error',
	templateUrl: 'input-error.component.html',
	styleUrls: ['input-error.component.scss'],
}) */
@Component({
  template: '',
})
export class InputErrorComponent {
  @Input()
  control: AbstractControl;
  @Input('error-labels')
  errors: Array<ErrorLabel> = [];
}
