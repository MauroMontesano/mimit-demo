import { AbstractControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

export class EafForm {
  private _form: AbstractControl;

  constructor(form: AbstractControl) {
    this._form = form;
  }

  get form(): AbstractControl {
    return this._form;
  }

  getFormControl(path: Array<string | number> | string): UntypedFormControl {
    let control = this._form.get(path);
    if (control && control instanceof UntypedFormControl) {
      return control as UntypedFormControl;
    }
    throw new Error('Non esiste un form control con il nome ' + path);
  }

  getFormGroup(path: Array<string | number> | string): UntypedFormGroup {
    let control = this._form.get(path);
    if (control && control instanceof UntypedFormGroup) {
      return control as UntypedFormGroup;
    }
    throw new Error('Non esiste un form group con il nome ' + path);
  }
}
