import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafAbstractTableField } from '../base/abstract-table-field.model';
import { EafRadioFieldOptions } from './radio-field.options';

export class EafRadioField extends EafAbstractTableField {
  private _selectedValue: any;

  constructor(
    label: string,
    public override propertyNameToUse: string,
    public override handleClick: (result: any) => void,
    selectedValue?: any,
    extra: EafRadioFieldOptions = {}
  ) {
    super(EafTableFieldTypeConstant.RADIO, label, propertyNameToUse, extra);
    this._selectedValue = selectedValue;
    this.sortable = false;
  }

  override isSelected(item: any) {
    return item[this.propertyNameToUse] === this._selectedValue;
  }
}
