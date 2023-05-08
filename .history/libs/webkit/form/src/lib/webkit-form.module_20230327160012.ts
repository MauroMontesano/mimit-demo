import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebkitSharedModule } from '@webkit/shared';
import { ButtonComponent } from './components/button/button.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
import { InputDateRangeComponent } from './components/input-date-range/input-date-range.component';
import { InputDateTimeComponent } from './components/input-date-time/input-date-time.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { InputLinebreakComponent } from './components/input-linebreak/input-linebreak.component';
import { InputLoadingComponent } from './components/input-loading/input-loading.component';
import { InputMulticheckboxComponent } from './components/input-multicheckbox/input-multicheckbox.component';
import { InputNumberIntervalComponent } from './components/input-number-interval/input-number-interval.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { InputOldDateRangeComponent } from './components/input-old-date-range/input-old-date-range.component';
import { InputOldDateTimeComponent } from './components/input-old-date-time/input-old-date-time.component';
import { InputOldDateComponent } from './components/input-old-date/input-old-date.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { InputSelectByIdComponent } from './components/input-select-by-id/input-select-by-id.component';
import { InputSelectOldComponent } from './components/input-select-old/input-select-old.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { InputTooltipComponent } from './components/input-tooltip/input-tooltip.component';
import { InputUploadComponent } from './components/input-upload/input-upload.component';
import { DeepObjectPipe } from './deep-object.pipe';

@NgModule({
  imports: [CommonModule, WebkitSharedModule, FormsModule, ReactiveFormsModule],
  declarations: [
    InputTextComponent,
    InputErrorComponent,
    InputTooltipComponent,
    InputOldDateComponent,
    InputNumberComponent,
    InputNumberIntervalComponent,
    ButtonComponent,
    InputTextareaComponent,
    InputPasswordComponent,
    InputLoadingComponent,
    InputCurrencyComponent,
    InputOldDateRangeComponent,
    InputCheckboxComponent,
    InputSelectOldComponent,
    InputSelectByIdComponent,
    DeepObjectPipe,
    InputRadioComponent,
    InputMulticheckboxComponent,
    InputAutocompleteComponent,
    InputLinebreakComponent,
    InputUploadComponent,
    InputOldDateTimeComponent,
    InputTimeComponent,
    InputSelectComponent,
    InputDateComponent,
    InputDateRangeComponent,
    InputDateTimeComponent,
  ],
  exports: [
    InputTextComponent,
    InputErrorComponent,
    InputOldDateComponent,
    InputNumberComponent,
    InputNumberIntervalComponent,
    ButtonComponent,
    InputTextareaComponent,
    InputPasswordComponent,
    InputLoadingComponent,
    InputCurrencyComponent,
    InputOldDateRangeComponent,
    InputOldDateTimeComponent,
    InputTooltipComponent,
    InputCheckboxComponent,
    InputSelectOldComponent,
    InputSelectByIdComponent,
    InputRadioComponent,
    InputMulticheckboxComponent,
    InputAutocompleteComponent,
    InputLinebreakComponent,
    InputUploadComponent,
    InputTimeComponent,
    FormsModule,
    ReactiveFormsModule,
    InputSelectComponent,
    InputDateComponent,
    InputDateRangeComponent,
    InputDateTimeComponent,
  ],
})
export class WebkitFormModule {}
