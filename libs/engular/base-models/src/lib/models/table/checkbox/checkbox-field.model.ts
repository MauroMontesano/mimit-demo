import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { BaseModel } from '../../common/base.model';
import { AbstractTableField } from '../base/abstract-table-field.model';
import { CheckboxFieldOptions } from './checkbox-field.options';

export class CheckboxField extends AbstractTableField {
  private _selectedItems: BaseModel[];

  constructor(label: string, propertyNameToUse: string, selectedItems: BaseModel[], extra: CheckboxFieldOptions = {}) {
    super(TableFieldTypeConstants.CHECKBOX, label, propertyNameToUse, false, extra);
    this.selectedItems = selectedItems || [];
  }

  get selectedItems() {
    return this._selectedItems;
  }

  set selectedItems(val: BaseModel[]) {
    this._selectedItems = val;
  }

  isSelected(item: any) {
    if (!this.selectedItems || this.selectedItems.length === 0) {
      return false;
    }
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (this.selectedItems && this.selectedItems[i].equals(item)) {
        return true;
      }
    }
    return false;
  }

  select(item: any) {
    this.selectedItems.push(item);
  }

  deselect(item: any) {
    const filteredItems = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (!this.selectedItems[i].equals(item)) {
        filteredItems.push(this.selectedItems[i]);
      }
    }
    this.selectedItems = filteredItems;
  }
}
