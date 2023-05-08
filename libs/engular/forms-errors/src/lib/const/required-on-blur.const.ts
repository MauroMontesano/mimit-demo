import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
export const requiredOnBlur: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return (control.touched || control.dirty) && !control.value ? { required: true } : null;
};
