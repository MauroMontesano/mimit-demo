import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCurrencyComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputCurrencyComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputCurrencyComponent extends BaseInputComponent {
  constructor(injector: Injector) {
    super(injector);
  }
  private DECIMAL_SEPARATOR = ',';
  converter: any;

  @Input()
  suffix = 'EUR';
  @Input()
  fractionSize = 2;
  @Input() maxLength: number | undefined;

  inputTypeName(): string {
    return 'InputCurrencyComponent';
  }

  ngOnInitForChildren() {
    this.placeholder += ' ' + this.suffix;
    this.converter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: this.suffix,
      maximumFractionDigits: this.fractionSize,
    });
  }

  writeValue(input: any): void {
    if (!input) {
      return;
    }
    this.input.nativeElement.value = this.converter.format(input);
  }

  onChangeValue(event: any) {
    const partenza = event.target.value;
    let pre: string | null = '';
    if (partenza === '' || partenza === ',') {
      this.value = null;
      pre = null;
    } else {
      const parti = partenza.split(this.DECIMAL_SEPARATOR);
      const intero = parti[0].replace(/[^-[0-9]*/g, '');
      const toSent = parseFloat(intero + '.' + parti[1]).toFixed(2);
      pre = '' + this.converter.format('' + toSent);
      this.value = toSent;
    }

    setTimeout(() => {
      if (this.onChangeCallBack) {
        this.onChangeCallBack(this.value);
      }
      if (this.onTouchCallBack) {
        this.onTouchCallBack(this.value);
      }
    }, 100);
    return pre;
  }

  onUnBlur(event: any) {
    this.input.nativeElement.value = this.onChangeValue(event) || '';
  }

  onFocus(event: any) {
    const partenza = event.target.value;
    if (!partenza || partenza === '') {
      return;
    }
    const parti = partenza.split(this.DECIMAL_SEPARATOR);
    const intero = parti[0].replace(/[^-[0-9]*/g, '');
    const decimali = (parti[1] || '').replace(/\D*/g, '');
    //decimali = decimali.substring(0, decimali.length - 2);
    this.input.nativeElement.value = intero + this.DECIMAL_SEPARATOR + decimali;
    console.error('onFocus', this.input.nativeElement.value, intero, decimali);
  }

  extractInformationFromInternalInput(event: any) {
    //non faccio nulla
  }
}
