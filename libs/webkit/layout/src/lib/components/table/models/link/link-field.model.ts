import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafAbstractTableField } from '../base/abstract-table-field.model';
import { EafLinkFieldOptions } from './link-field.options';

export class EafLinkField extends EafAbstractTableField {
  constructor(
    label: string,
    propertyNameToUse: string,
    public override link: (result: any) => string,
    extra: EafLinkFieldOptions = {}
  ) {
    super(EafTableFieldTypeConstant.LINK, label, propertyNameToUse, extra);
  }
}
