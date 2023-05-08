import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SingleCheckboxComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true,
    },
  ],
})
export class InputCheckboxComponent extends SingleCheckboxComponent {
  @Input() mode: 'checkbox' | 'switch' = 'checkbox';
  @Input() link: string;
  @Input() href: string;
  @Input() noShowText: boolean;
  @Input() floatRight: boolean;
  @Input() soloCheck: boolean;
  @Input() noLegend = false;

  ngOnInitForChildren() {
    //non faccio nulla
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
