import { BaseModel } from '@engular/base-models';
import { Subject } from 'rxjs';
import { EafTableFieldTypeConstant } from '../../consts/eaf-table-field-type.const';
import { EafAbstractTableField } from '../base/abstract-table-field.model';
import { EafIconFieldOptions } from './icon-field.options';

export class EafIconField extends EafAbstractTableField {
  // modificato il field da SportBaseModel a BaseModel

  private _selectedItems!: BaseModel[];
  private _subject!: Subject<{ type: string; payload: any }>;

  override allSelected = false;

  constructor(
    label: string,
    protected icon: (item: BaseModel) => { icon: string; color: 'muted' | 'success' | 'primary' | 'warning' },
    extra: EafIconFieldOptions = {}
  ) {
    super(EafTableFieldTypeConstant.ICON, label, label, extra);
    this.sortable = false;
  }

  override cssCLass(item: any) {
    if (!item) {
      return;
    }
    const obj = this.icon(item);
    if (obj) {
      return ' fa-2x  fa fa-' + obj.icon + ' text-' + obj.color;
    }
    return '';
  }

  get selectedItems() {
    return this._selectedItems;
  }

  set selectedItems(val: BaseModel[]) {
    this._selectedItems = val;
  }

  override destroy() {
    if (this._subject) {
      this._subject.complete();
    }
  }
  getObservable() {
    if (!this._subject) {
      //ottimizzazione
      this._subject = new Subject();
    }
    return this._subject.asObservable();
  }

  selectAll() {
    this.allSelected = true;
    this._subject.next({ type: 'selectAll', payload: undefined });
  }

  deselectAll() {
    this.allSelected = false;
    this.selectedItems.length = 0;
    this._subject.next({ type: 'deselectAll', payload: undefined });
  }

  override isSelected(item: any) {
    if (this.allSelected) {
      return true;
    }
    if (!this.selectedItems || this.selectedItems.length === 0) {
      return false;
    }
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (this.selectedItems && this.selectedItems[i].equals(item)) {
        return true;
      }
    }
    return false;
  }

  select(item: any) {
    this.selectedItems.push(item);
  }

  deselect(item: any) {
    const filteredItems = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (!this.selectedItems[i].equals(item)) {
        filteredItems.push(this.selectedItems[i]);
      }
    }
    this.allSelected = false;
    this.selectedItems = filteredItems;
  }

  override toggle(item: any) {
    let operation;
    if (!this.isSelected(item)) {
      this.select(item);
      operation = 'select';
    } else {
      this.deselect(item);
      operation = 'deselect';
    }

    const event = { payload: item, type: operation };

    if (this._subject) {
      this._subject.next(event);
    }
  }
}
