import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { AbstractTableField } from '../base/abstract-table-field.model';
import { LinkFieldOptions } from './link-field.options';

export class LinkField extends AbstractTableField {
  constructor(
    label: string,
    propertyNameToUse: string,
    public link: (result: any) => string,
    extra: LinkFieldOptions = {}
  ) {
    super(TableFieldTypeConstants.LINK, label, propertyNameToUse, false, extra);
  }
}
