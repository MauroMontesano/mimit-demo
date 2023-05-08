import { AbstractControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { DateModel } from '@engular/base-models';

export class CustomValidators {
  /* Regex that we use: */
  public static fiscalCodeRegex(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp('[a-zA-Z]{6}\\d\\d[a-zA-Z]\\d\\d[a-zA-Z]\\d\\d\\d[a-zA-Z]');
    if (!regex.test(control.value)) {
      return {
        fiscalCode: true,
      };
    }
    return null;
  }

  public static onlyCharacters(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp('^[a-zA-Z]*$');
    if (!regex.test(control.value)) {
      return {
        onlyCharacters: true,
      };
    }
    return null;
  }

  // public static nameSurname(control: AbstractControl) {
  // 	if (!control || !control.value) {
  // 		return null;
  // 	}

  // 	const regex = new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$');
  // 	if (!regex.test(control.value)) {
  // 		return {
  // 			nameSurname: true,
  // 		};
  // 	}
  // 	return null;
  // }

  public static onlyNumbers(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp('^[0-9]*$');
    if (!regex.test(control.value)) {
      return {
        notNumber: true,
      };
    }
    return null;
  }
  /*
	public static prefixRegex(control: AbstractControl) {
		if (!control || !control.value) { return null; }
		const regex = new RegExp('^\\+?[0-9]*$');
		if (!regex.test(control.value)) {
			return {
				prefix: true,
			};
		}
		return null;
	}
 */

  public static minuteHourRegex(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }

    const regex = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    if (!regex.test(control.value)) {
      return {
        minuteHour: true,
      };
    }

    return null;
  }

  public static dateLessOrEqualThan(otherFormControl: AbstractControl | DateModel, what?: string): ValidatorFn {
    const prova = (control: AbstractControl) => {
      if (!control || !otherFormControl || !control.value) {
        return null;
      }

      const currentField = control.value;
      let otherField;
      if (otherFormControl instanceof DateModel) {
        otherField = otherFormControl;
      } else {
        otherField = otherFormControl.value;
      }

      if (currentField && otherField) {
        if (currentField.date && otherField.date) {
          if (currentField.date.isSameOrBefore(otherField.date, what)) {
            return {
              dateAfter: true,
            };
          }
        }
      }

      return null;
    };
    return prova;
  }

  public static dateLessThan(otherFormControl: AbstractControl | DateModel): ValidatorFn {
    const tobuild = (control: AbstractControl) => {
      if (!control || !otherFormControl || !control.value) {
        return null;
      }

      const currentField = control.value;
      let otherField;
      if (otherFormControl instanceof DateModel) {
        otherField = otherFormControl;
      } else {
        otherField = otherFormControl.value;
      }

      if (currentField && otherField) {
        if (currentField.date && otherField.date) {
          if (currentField.date.isBefore(otherField.date)) {
            return {
              dateSameOrAfter: true,
            };
          }
        }
      }

      return null;
    };
    return tobuild;
  }

  public static dateGreaterOrEqualThan(otherFormControl: AbstractControl | DateModel): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (!control || !otherFormControl || !control.value) {
        return null;
      }

      const currentField = control.value;
      let otherField;
      if (otherFormControl instanceof DateModel) {
        otherField = otherFormControl;
      } else {
        otherField = otherFormControl.value;
      }

      if (currentField && otherField) {
        if (currentField.date && otherField.date) {
          if (currentField.date.isSameOrAfter(otherField.date)) {
            return {
              dateBefore: true,
            };
          }
        }
      }

      return null;
    };
    return validator;
  }

  public static dateGreaterThan(otherFormControl: AbstractControl | DateModel, what?: string): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (!control || !otherFormControl || !control.value) {
        return null;
      }

      const currentField = control.value;
      let otherField;
      if (otherFormControl instanceof DateModel) {
        otherField = otherFormControl;
      } else {
        otherField = otherFormControl.value;
      }

      if (currentField && otherField) {
        if (currentField.date && otherField.date) {
          if (currentField.date.isAfter(otherField.date, what)) {
            return {
              dateSameOrBefore: true,
            };
          }
        }
      }

      return null;
    };
    return validator;
  }
  public static dateGreaterThanCurrent(otherFormControl: AbstractControl | DateModel): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (!control || !otherFormControl || !control.value) {
        return null;
      }

      const currentField = control.value;
      let otherField;
      if (otherFormControl instanceof DateModel) {
        otherField = otherFormControl;
      } else {
        otherField = otherFormControl.value;
      }

      if (currentField && otherField) {
        if (currentField.date && otherField.date) {
          if (currentField.date.isAfter(otherField.date)) {
            return {
              dateAfterToday: true,
            };
          }
        }
      }

      return null;
    };
    return validator;
  }

  public static dayBetweenTwoDates(otherFormControl: AbstractControl | DateModel, days: number): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (!control || !otherFormControl || !control.value) {
        return null;
      }
      const currentField = control.value;
      let otherField;
      if (otherFormControl instanceof DateModel) {
        otherField = otherFormControl;
      } else {
        otherField = otherFormControl.value;
      }
      if (currentField && otherField) {
        if (currentField.date && otherField.date) {
          if (currentField.date.clone().subtract(days, 'days').isAfter(otherField.date, 'days')) {
            return {
              dateNotEnoughDays: true,
            };
          }
        }
      }
      return null;
    };
    return validator;
  }

  public static validateTwoFields(otherFormControl: AbstractControl): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (control.value === '' && otherFormControl.value) {
        return { noOrBoth: true };
      } else if (control.value && (otherFormControl.value === '' || !otherFormControl.value)) {
        otherFormControl.setErrors({ noOrBoth: true });
        return null;
      } else {
        otherFormControl.setErrors(null);
        return null;
      }
    };
    return validator;
  }

  /**
   * Used to throw required error if other or this field is empty
   * (used in infotunato wizard step 1. deathDate and deathCause)
   * @param otherField
   * returns 2 errors: 'fieldRequired' if this field has no data and 'otherFieldRequired' if other field has no data
   */
  public static validateDependencyOfOtherField(otherField: AbstractControl): ValidatorFn {
    const validator = (field: AbstractControl) => {
      if ((!field.value || field.value === '') && otherField.value && otherField.value !== '') {
        return { required: true };
      } else if (field.value && field.value !== '' && (!otherField.value || otherField.value === '')) {
        return { otherFieldRequired: true };
      }
      return null;
    };
    return validator;
  }

  public static fiscalCode(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp(
      '^[a-zA-Z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[a-zA-Z][0-9mnpqrstuvLMNPQRSTUV]{2}[a-zA-Z][0-9mnpqrstuvLMNPQRSTUV]{3}[a-zA-Z]$'
    );
    if (!regex.test(control.value)) {
      return {
        fiscalCode: true,
      };
    }
    return null;
  }

  //   public static allFieldFilledOrEmpty(forms: AbstractControl[]): ValidatorFn {
  //     const validator = (control: AbstractControl) => {
  //       let totalFieldFullfilled = 0;

  //       forms.forEach((f) => {
  //         if (f.value) {
  //           totalFieldFullfilled++;
  //         }
  //       });

  //       if (totalFieldFullfilled === forms.length || totalFieldFullfilled === 0) {
  //         //no error
  //         if (control.errors && control.errors['allFieldsMustBeFilled']) {
  //           forms.forEach((f) => {

  //             const giveMeYourActualErrors:ValidationErrors|null = f.validator(f);
  //             f.setErrors(giveMeYourActualErrors);
  //           });
  //           return null;
  //         }
  //       } else {
  //         forms.forEach((f) => {
  //           const giveMeYourActualErrors = f.validator(f) || {};
  //           giveMeYourActualErrors['allFieldsMustBeFilled'] = true;
  //           f.setErrors(giveMeYourActualErrors);
  //         });
  //         return { allFieldsMustBeFilled: true };
  //       }
  //     };
  //     return validator;
  //   }

  public static maxLengthForNumbers(maxLength: number): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (control.value) {
        const value = control.value.toString();

        if (value.length > maxLength) {
          return { maxlength: true };
        } else {
          return null;
        }
      }
      return null;
    };
    return validator;
  }

  public static ibanValidator(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp(
      // '^IT[0-9]{2}[a-zA-Z][0-9]{10}[a-zA-Z0-9]{12}|^(?!IT)[a-zA-Z0-9]{1,34}$',
      /^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/g
    );
    if (!regex.test(control.value)) {
      return { ibanValidate: true };
    }
    return null;
  }

  public static oneOfFieldsRequired(): ValidatorFn {
    const custom = (formGroup: AbstractControl) => {
      if (formGroup instanceof UntypedFormGroup && formGroup.controls) {
        let filledInControllsLength = 0;
        Object.keys(formGroup.controls).forEach((controlName) => {
          const f = formGroup.get(controlName);

          if (f && f.value && f.value.trim()) {
            filledInControllsLength++;
          }
        });
        if (filledInControllsLength > 0) {
          return null;
        } else {
          return { oneOfFieldsRequired: true };
        }
      }
      return null;
    };
    return custom;
  }
  public static TimeNotValid(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    if (!regex.test(control.value)) {
      return {
        timeNotValid: true,
      };
    }
    return null;
  }

  public static NumberIntervalMaxLength(maxLength: number, which: 'From' | 'To'): ValidatorFn {
    const validator = (control: AbstractControl) => {
      console.error(control);
      if (!control || !control.value) {
        return null;
      }

      let who;
      if (which === 'From') {
        if (control.value.from && (control.value.from + '').length > maxLength) {
          who = 'From';
        }
      }
      if (which === 'To') {
        if (control.value.to && (control.value.to + '').length > maxLength) {
          who = 'To';
        }
      }
      return who ? { ['numberIntevalMaxLength' + who]: true } : null;
    };
    return validator;
  }

  public static numberIncrementByGivenValue(increment: number, previousValue: number): ValidatorFn {
    const validator = (control: AbstractControl) => {
      if (control.value && previousValue) {
        const value = control.value.toString() - previousValue;

        if (value - increment < 0) {
          return { numberIncrementByGivenValue: true };
        } else {
          return null;
        }
      }
      return null;
    };
    return validator;
  }

  public static emailValidator(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );
    if (!regex.test(control.value)) {
      return {
        validateEmail: true,
      };
    }
    return null;
  }

  public static capValidator(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp(/\b\d{5}\b/g);
    if (!regex.test(control.value)) {
      return {
        validateCAP: true,
      };
    }
    return null;
  }

  public static yearValidator(control: AbstractControl) {
    if (!control || !control.value) {
      return null;
    }
    const regex = new RegExp(/\b\d{4}\b/g);
    if (!regex.test(control.value)) {
      return { notYear: true };
    }
    return null;
  }

  /**
   * Used to throw required error if other or this field is empty
   * (used in infotunato wizard step 1. deathDate and deathCause)
   * @param otherField
   * returns 2 errors: 'fieldRequired' if this field has no data and 'otherFieldRequired' if other field has no data
   */
  public static validateRequiredDependsOfOtherField(otherField: AbstractControl, value: any): ValidatorFn {
    return CustomValidators.requiredConditionalValidator(() => {
      return otherField.value === value;
    });
  }

  /**
   * Used to throw required error if other or this field is empty
   * (used in infotunato wizard step 1. deathDate and deathCause)
   * @param otherField
   * returns 2 errors: 'fieldRequired' if this field has no data and 'otherFieldRequired' if other field has no data
   */
  public static requiredConditionalValidator(condition: (fieldControl: AbstractControl) => boolean): ValidatorFn {
    const validator = (field: AbstractControl) => {
      if ((!field.value || field.value === '') && condition(field)) {
        return { required: true };
      }
      return null;
    };
    return validator;
  }

  /**
   * Used to throw required error if other or this field is empty
   * (used in infotunato wizard step 1. deathDate and deathCause)
   * @param field
   * returns 2 errors: 'fieldRequired' if this field has no data and 'otherFieldRequired' if other field has no data
   */
  public static forceValidateToOtherField(field: AbstractControl): ValidatorFn {
    const validator = (otherField: AbstractControl) => {
      field.updateValueAndValidity();
      return null;
    };
    return validator;
  }

  public static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
