import { UntypedFormControl } from '@angular/forms';
import { ErrorLabel } from '@engular/base-models';

// @Ale checkall

// @dynamic
export class ErrorLabelConstants {
  public static REQUIRED = new ErrorLabel(
    (control) => (control.dirty || control.touched) && control.hasError('required'),
    'ERROR.REQUIRED'
  );

  public static EMAIL_INVALID = new ErrorLabel(
    (control) => control.touched && control.hasError('validateEmail'),
    'ERROR.EMAIL.INVALID'
  );

  public static EMAIL_ALREADY_EXIST = new ErrorLabel(
    (control) => control.touched && control.hasError('emailAlreadyExist'),
    'ERROR.EMAIL.ALREADY_EXIST'
  );

  public static CAP_INVALID = new ErrorLabel(
    (control) => control.touched && control.hasError('validateCAP'),
    'ERROR.CAP.INVALID'
  );

  public static PHONE_NUMBER_INVALID = new ErrorLabel((control) => control.invalid, 'ERROR.PHONE.INVALID');

  public static PHONE_MISSING_TYPE_INVALID = new ErrorLabel((control) => control.invalid, 'ERROR.PHONE.MISSING');

  public static DECIMAL_INVALID = new ErrorLabel((control) => control.hasError('notDecimal'), 'ERROR.DECIMAL.INVALID');

  public static NUMBER_NEGATIVE = new ErrorLabel((control) => control.hasError('notMajor'), 'ERROR.NUMBER.NEGATIVE');

  public static NO_ZERO_NUMBER = new ErrorLabel(
    (control) => !control.valid && control.hasError('notZero'),
    'ERROR.NUMBER.NO_ZERO_NUMBER'
  );

  public static NOT_A_NUMBER = new ErrorLabel(
    (control) => !control.valid && control.hasError('notNumber'),
    'ERROR.NUMBER.NOT_A_NUMBER'
  );

  public static NOT_A_YEAR = new ErrorLabel(
    (control) => !control.valid && control.hasError('notYear'),
    'ERROR.NUMBER.NOT_A_YEAR'
  );

  public static INTERVAL_INVALID = new ErrorLabel(
    (control) => !control.valid && control.hasError('intervalError'),
    'ERROR.NUMBER.INTERVAL_INVALID'
  );
  public static DATE_RANGE_INVALID = new ErrorLabel(
    (control) => !control.valid && control.hasError('dateAfter'),
    'ERROR.DATE.RANGE_INVALID'
  );
  public static MINUTE_HOUR = new ErrorLabel(
    (control) => !control.valid && control.hasError('minuteHour'),
    'ERROR.DATE.MINUTE_HOUR'
  );
  public static ONLY_CHARACTERS = new ErrorLabel(
    (control) => !control.valid && control.hasError('onlyCharacters'),
    'ERROR.ONLY_CHARACTERS'
  );
  public static FISCAL_CODE = new ErrorLabel(
    (control) => !control.valid && control.hasError('fiscalCode'),
    'ERROR.FISCAL_CODE'
  );
  public static OTHER_FIELD_REQUIRED = new ErrorLabel(
    (control) => !control.valid && control.hasError('otherFieldRequired'),
    'ERROR.OTHER_FIELD_REQUIRED'
  );
  public static ALL_FIELDS_FILLED = new ErrorLabel(
    (control) => !control.valid && control.hasError('allFieldsMustBeFilled'),
    'ERROR.OTHER_FIELD_REQUIRED'
  );
  public static IBAN_INVALID = new ErrorLabel(
    (control) => !control.valid && control.hasError('ibanValidate'),
    'ERROR.IBAN_INVALID'
  );
  public static ONE_FIELD_REQUIRED = new ErrorLabel(
    (control) => !control.valid && control.hasError('oneOfFieldsRequired'),
    'ERROR.ONE_FIELD_REQUIRED'
  );
  public static TIME_INVALID = new ErrorLabel(
    (control) => !control.valid && control.hasError('timeNotValid'),
    'ERROR.DATE.TIME_INVALID'
  );
  public static DATE_AFTER_TODAY = new ErrorLabel(
    (control) => !control.valid && control.hasError('dateAfterToday'),
    'ERROR.DATE.AFTER_TODAY'
  );
  public static AT_LEAST_ONE = new ErrorLabel(
    (control) =>
      !control.valid &&
      control.errors &&
      ((control.errors['from'] && control.errors['from']['atLeastOne']) ||
        (control.errors['to'] && control.errors['to']['atLeastOne'])),
    'ERROR.AT_LEAST_ONE'
  );
  public static ALREADY_EXISTS = (item: string) => {
    return new ErrorLabel(
      (control) => (control.dirty || control.touched) && control.hasError('alreadyExist'),
      'ERROR.ALREADY_EXIST',
      { value: item }
    );
  };

  public static REGEX = (customMex?: string) => {
    return new ErrorLabel(
      (control) => control.dirty && control.hasError('pattern'),
      customMex ? customMex : 'ERROR.REGEX'
    );
  };

  public static MIN_LENGTH = (length: number) => {
    return new ErrorLabel((control) => control.touched && control.hasError('minlength'), 'ERROR.MIN_LENGTH', {
      minValue: length,
    });
  };

  public static MAX_LENGTH = (length: number) => {
    return new ErrorLabel((control) => control.dirty && control.hasError('maxlength'), 'ERROR.MAX_LENGTH', {
      maxValue: length,
    });
  };

  public static DATE_LESS_OR_EQUAL_THAN = (firstDate: string, secondDate: string) => {
    return new ErrorLabel(
      (control) => control.dirty && control.hasError('dateAfter'),
      'ERROR.DATE.LESS_OR_EQUAL_THAN',
      { firstDate: firstDate, secondDate: secondDate }
    );
  };

  public static NUMBER_LESS_THAN = (prevoiusValue: number) => {
    return new ErrorLabel((control) => control.dirty && control.hasError('intervalError'), 'ERROR.NUMBER.LESS_THAN', {
      prevoiusValue: prevoiusValue,
    });
  };

  public static NUMBER_GREATER_THAN = (prevoiusValue: number) => {
    return new ErrorLabel((control) => control.dirty && control.hasError('min'), 'ERROR.NUMBER.GREATER_THAN', {
      prevoiusValue: prevoiusValue,
    });
  };

  public static NUMBER_INCREMENT_BY_VALUE = (increment: number) => {
    return new ErrorLabel(
      (control) => control.dirty && control.hasError('numberIncrementByGivenValue'),
      'ERROR.NUMBER.INCREMENT_BY_VALUE',
      { increment: increment }
    );
  };

  public static DATE_LESS_THAN = (firstDate: string, secondDate: string) => {
    return new ErrorLabel((control) => control.dirty && control.hasError('dateSameOrAfter'), 'ERROR.DATE.LESS_THAN', {
      firstDate: firstDate,
      secondDate: secondDate,
    });
  };

  public static DATE_GREATER_OR_EQUAL_THAN = (firstDate: string, secondDate: string) => {
    return new ErrorLabel(
      (control) => control.dirty && control.hasError('dateBefore'),
      'ERROR.DATE.GREATER_OR_EQUAL_THAN',
      { firstDate: firstDate, secondDate: secondDate }
    );
  };

  public static DATE_GREATER_THAN = (firstDate: string, secondDate: string) => {
    return new ErrorLabel(
      (control) => control.dirty && control.hasError('dateSameOrBefore'),
      'ERROR.DATE.GREATER_THAN',
      { firstDate: firstDate, secondDate: secondDate }
    );
  };

  public static DATE_BETWEEN = (thisDate: string, afterDate: string, beforeDate: string) => {
    return new ErrorLabel((control) => control.dirty && control.hasError('dateBetween'), 'ERROR.DATE.BETWEEN', {
      thisDate: thisDate,
      afterDate: afterDate,
      beforeDate: beforeDate,
    });
  };

  public static getDefaultCheckFn(error: string) {
    return (control: UntypedFormControl) => (control.dirty || control.touched) && control.hasError(error);
  }

  public static MATCH_FIELD = (field: string) => {
    return new ErrorLabel((control) => control.touched && control.hasError('mustMatch'), 'ERROR.MATCH_FIELD', {
      field: field,
    });
  };
}
