import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent extends InputComponent {
  @Input() maxLength: number | undefined;
  @Input() inputSize: 'sm' | 'lg';
  @Input() type = 'text';
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    //non faccio nulla
  }
}
