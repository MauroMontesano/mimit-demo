import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { TableFieldOptions } from './table-field.options';

export abstract class AbstractTableField {
  label: string;
  protected _fieldType: TableFieldTypeConstants | undefined;
  propertyNameToUse: string | undefined;
  sortable: boolean;
  sortDtoField: string | undefined;

  constructor(
    fieldType: TableFieldTypeConstants | undefined,
    label: string,
    propertyNameToUse: string | undefined,
    sortable: boolean = true,
    extra: TableFieldOptions = {}
  ) {
    this._fieldType = fieldType;
    this.label = label;
    this.propertyNameToUse = propertyNameToUse;
    this.sortable = sortable;
    this.sortDtoField = extra.sortDtoField;
  }

  get fieldType(): TableFieldTypeConstants | any {
    return this._fieldType;
  }
}
