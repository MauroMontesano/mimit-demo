import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { AbstractTableField } from './abstract-table-field.model';
import { TableFieldOptions } from './table-field.options';

/*
a definizione della tabella [label, fieldType, fieldToUse,extra]
la definizione delle azioni e della condizione di visualizzazione con
*/
export class TableField extends AbstractTableField {
  constructor(
    fieldType: TableFieldTypeConstants,

    label: string,
    propertyNameToUse: string,
    sortable: boolean = true,
    extra: TableFieldOptions
  ) {
    super(fieldType, label, propertyNameToUse, sortable, extra);
  }
}
