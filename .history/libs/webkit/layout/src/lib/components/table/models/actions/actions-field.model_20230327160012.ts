import { ActionItem } from '@engular/base-models';
import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafAbstractTableField } from '../base/abstract-table-field.model';
import { EafActionsFieldOptions } from './actions-field.options';

export class EafActionsField extends EafAbstractTableField {
  private _canActionShowed: (modelOfRow: any, action: ActionItem) => boolean;
  constructor(
    label: string,
    public actions: ActionItem[],
    canActionShowed = (model?: any, action?: any) => true,
    extra: EafActionsFieldOptions = {}
  ) {
    super(EafTableFieldTypeConstant.ACTIONS, label, '', extra);
    this.sortable = false;
    this.canActionShowed = canActionShowed;
  }

  public set canActionShowed(callback: (modelOfRow: any, action: ActionItem) => boolean) {
    this._canActionShowed = callback;
  }
  public get canActionShowed(): (modelOfRow: any, action: ActionItem) => boolean {
    return this._canActionShowed;
  }
}
