import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent extends InputComponent {
  @Input() maxLength: number | undefined;
  @Input() hide: boolean;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInitForChildren() {
    //non faccio nulla
  }
}
