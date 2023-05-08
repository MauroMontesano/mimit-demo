import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { AbstractTableField } from '../base/abstract-table-field.model';
import { TemplateFieldOptions } from './template-field.options';

export class TemplateField extends AbstractTableField {
  constructor(label: string, public template: any, extra: TemplateFieldOptions = {}) {
    super(TableFieldTypeConstants.TEMPLATE, label, undefined, false, extra);
  }
}
