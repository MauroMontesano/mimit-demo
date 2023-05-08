import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberComponent as EngularInputNumber } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent extends EngularInputNumber {
  @Input() iconBox = '';
  @Input() noLabel = false;
  @Input() inputSize: 'sm' | 'lg';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    //non faccio nulla
  }
}
