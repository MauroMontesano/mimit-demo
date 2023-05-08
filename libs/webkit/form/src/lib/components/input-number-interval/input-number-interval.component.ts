import { Component, forwardRef, Injector, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberIntervalComponent as EngularInputNumberInterval } from '@engular/forms-base';
@Component({
  selector: 'eaf-input-number-interval',
  templateUrl: './input-number-interval.component.html',
  styleUrls: ['./input-number-interval.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberIntervalComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputNumberIntervalComponent),
      multi: true,
    },
  ],
})
export class InputNumberIntervalComponent extends EngularInputNumberInterval {
  constructor(injector: Injector) {
    super(injector);
  }
}
