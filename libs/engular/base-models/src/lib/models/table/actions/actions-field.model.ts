import { TableFieldTypeConstants } from '../../../constants/table-field-type.const';
import { ActionItem } from '../../common/action-item.model';
import { AbstractTableField } from '../base/abstract-table-field.model';
import { ActionsFieldOptions } from './actions-field.options';

export class ActionsField extends AbstractTableField {
  private _canActionShowed: (modelOfRow: any, action: ActionItem) => boolean;
  constructor(
    label: string,
    public actions: ActionItem[],
    canActionShowed = (model: any, action: ActionItem) => true,
    extra: ActionsFieldOptions = {}
  ) {
    super(TableFieldTypeConstants.ACTIONS, label, undefined, false, extra);

    this.canActionShowed = canActionShowed;
  }

  public set canActionShowed(callback: (modelOfRow: any, action: ActionItem) => boolean) {
    this._canActionShowed = callback;
  }
  public get canActionShowed(): (modelOfRow: any, action: ActionItem) => boolean {
    return this._canActionShowed;
  }
}
