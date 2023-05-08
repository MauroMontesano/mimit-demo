import { Component, forwardRef, Injector, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextAreaComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true,
    },
  ],
})
export class InputTextareaComponent extends TextAreaComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    //non faccio nulla
  }
}
