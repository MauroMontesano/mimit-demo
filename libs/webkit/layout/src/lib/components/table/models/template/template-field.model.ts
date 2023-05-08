import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafAbstractTableField } from '../base/abstract-table-field.model';
import { EafTemplateFieldOptions } from './template-field.options';

export class EafTemplateField extends EafAbstractTableField {
  constructor(label: string, public override template: any, extra: EafTemplateFieldOptions = {}) {
    super(EafTableFieldTypeConstant.TEMPLATE, label, '', extra);
  }
}
