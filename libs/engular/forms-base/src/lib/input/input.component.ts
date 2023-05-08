import { Component, forwardRef, ViewEncapsulation, Injector } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseInputComponent } from '../base/base-input.component';

// @Component({
// 	encapsulation: ViewEncapsulation.None,
// 	selector: 'eng-input',
// 	templateUrl: './input.component.html',
// 	//styleUrls: ['./input.component.scss'],
// 	providers: [
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			useExisting: forwardRef(() => InputComponent),
// 			multi: true,
// 		},
// 		{
// 			provide: NG_VALIDATORS,
// 			useExisting: forwardRef(() => InputComponent),
// 			multi: true,
// 		},
// 	],
// })
@Component({
  template: '',
})
export abstract class InputComponent extends BaseInputComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  inputTypeName(): string {
    return 'InputComponent';
  }

  extractInformationFromInternalInput($event: any) {
    return $event.target.value;
  }

  // model -> view
  writeValue(textInput: string): void {
    this.log.info('writeValue ' + this.id + ':', textInput);
    this.value = textInput;
    if (this.value) {
      this.input.nativeElement.value = this.value;
    } else {
      this.input.nativeElement.value = '';
    }
  }
}
