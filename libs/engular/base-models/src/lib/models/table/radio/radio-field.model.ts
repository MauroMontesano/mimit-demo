import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { AbstractTableField } from '../base/abstract-table-field.model';
import { RadioFieldOptions } from './radio-field.options';

export class RadioField extends AbstractTableField {
  private _selectedValue: any;

  constructor(
    label: string,
    public override propertyNameToUse: string,
    public handleClick: (result: any) => void,
    selectedValue?: any,
    extra: RadioFieldOptions = {}
  ) {
    super(TableFieldTypeConstants.RADIO, label, propertyNameToUse, false, extra);
    this._selectedValue = selectedValue;
  }

  isSelected(item: any) {
    return item[this.propertyNameToUse] === this._selectedValue;
  }
}
