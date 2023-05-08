import { Component, forwardRef, Input, ViewEncapsulation, Injector } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseInputComponent } from '../base/base-input.component';

// @Component({
// 	selector: 'eng-textarea',
// 	templateUrl: './text-area.component.html',

// 	encapsulation: ViewEncapsulation.None,
// 	providers: [
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			useExisting: forwardRef(() => TextAreaComponent),
// 			multi: true,
// 		},
// 		{
// 			provide: NG_VALIDATORS,
// 			useExisting: forwardRef(() => TextAreaComponent),
// 			multi: true,
// 		},
// 	],
// })
@Component({
  template: '',
})
export abstract class TextAreaComponent extends BaseInputComponent {
  @Input()
  maxLength: number = 300;
  @Input()
  rows: number = 5;
  charsCount: number = this.maxLength;

  constructor(injector: Injector) {
    super(injector);
  }

  inputTypeName(): string {
    return 'InputComponent';
  }

  // ngOnInitForChildren() {
  // 	this.value = '';
  // }

  extractInformationFromInternalInput($event: any) {
    this.error = $event.target.value.length > this.maxLength ? 'maxlength' : null;
    this.charsCount = this.maxLength - $event.target.value.length;
    return $event.target.value;
  }

  // model -> view
  writeValue(textInput: string): void {
    this.log.info('writeValue ' + this.id + ':', textInput);
    this.value = textInput;

    if (this.value) {
      this.charsCount = this.maxLength - this.value.length;
      this.input.nativeElement.value = this.value;
    } else {
      this.charsCount = this.maxLength;
      this.input.nativeElement.value = '';
    }
  }
}
