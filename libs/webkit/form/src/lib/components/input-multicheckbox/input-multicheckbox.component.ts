import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-multicheckbox',
  templateUrl: './input-multicheckbox.component.html',
  styleUrls: ['./input-multicheckbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMulticheckboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputMulticheckboxComponent),
      multi: true,
    },
  ],
})
export class InputMulticheckboxComponent extends CheckboxComponent {
  @Input() mode: 'checkbox' | 'switch' = 'checkbox';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    //non faccio nulla
  }
}
