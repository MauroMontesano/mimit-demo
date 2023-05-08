import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BaseModel } from '@engular/base-models';
import { FormBasePageComponent } from '@engular/base-page';

export abstract class EafFormBasePageComponent<M extends BaseModel> extends FormBasePageComponent<M> {
  getFormControl(path: Array<string | number> | string): UntypedFormControl {
    const control = this.form.get(path);
    if (control && control instanceof UntypedFormControl) {
      return control as UntypedFormControl;
    }
    throw new Error('Non esiste un form control con il nome ' + path);
  }

  getFormGroup(path: Array<string | number> | string): UntypedFormGroup {
    const control = this.form.get(path);
    if (control && control instanceof UntypedFormGroup) {
      return control as UntypedFormGroup;
    }
    throw new Error('Non esiste un form group con il nome ' + path);
  }
}
