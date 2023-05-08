import { Component, ViewEncapsulation, Injector } from '@angular/core';

import { BaseInputComponent } from '../base/base-input.component';

/* @Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'eng-input-space',
	templateUrl: './input-space.component.html',
})
 */
export abstract class InputSpace extends BaseInputComponent {
  writeValue(textInput: any): void {}

  constructor(injector: Injector) {
    super(injector);

    this.id = 'SPACE_' + Math.round(Math.random() * 1000);
  }

  inputTypeName(): string {
    return 'InputSpace';
  }

  ngOnInitForChildren() {}
  extractInformationFromInternalInput($event: any) {
    return 'SPACE';
  }
}
