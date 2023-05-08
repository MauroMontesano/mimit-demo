import { AbstractTableField, TooltipModel } from '@engular/base-models';
import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafTableFieldOptions } from './table-field.options';

export abstract class EafAbstractTableField extends AbstractTableField {
  protected _fieldTypeEaf: EafTableFieldTypeConstant;
  filterable = false;
  tooltip?: TooltipModel;
  size?: string;
  allSelected?: boolean;
  selectedValue?: any;
  template?: any;

  constructor(
    fieldType: EafTableFieldTypeConstant,
    label: string,
    propertyNameToUse: string,

    extra: EafTableFieldOptions = {}
  ) {
    super(undefined, label, propertyNameToUse, extra.sortable, extra);
    this._fieldTypeEaf = fieldType;
    this.filterable = extra.filterable;
    this.tooltip = extra.tooltip;
    this.size = extra.size;
  }

  override get fieldType(): EafTableFieldTypeConstant {
    //return (this._fieldTypeEaf as unknown) as TableFieldTypeConstants;
    return this._fieldTypeEaf;
  }

  destroy() {
    //
  }

  handleClick(x: any) {
    //
  }

  toggle(x: any) {
    //
  }

  isSelected(x: any) {
    //
  }

  link(x: any) {
    return '';
  }

  cssCLass(x: any) {
    //
  }
}
