import { BaseModel } from '@engular/base-models';
import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafAbstractTableField } from '../base/abstract-table-field.model';
import { EafAccordionFieldOptions } from './accordion-field.options';
export class EafAccordionField extends EafAbstractTableField {
  // modificato il field da SportBaseModel a BaseModel

  constructor(
    public condition: (field: BaseModel) => boolean = () => {
      return true;
    },
    extra: EafAccordionFieldOptions = {}
  ) {
    super(EafTableFieldTypeConstant.ACCORDION, '', '', extra);
    this.sortable = false;
  }
}
