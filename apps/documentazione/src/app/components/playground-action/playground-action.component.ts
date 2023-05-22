import { Component, ViewEncapsulation } from '@angular/core';
import { ActionItem, BaseModel } from '@engular/base-models';

@Component({
  selector: 'eaf-playground-action',
  templateUrl: './playground-action.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundActionComponent {
  modelAction: ActionItem;
  dynamicAction: ActionItem;
  onlyIconAction: ActionItem;
  basicAction: ActionItem;
  secondaryRedDisabledAction: ActionItem;
  actions = [];
  items = [
    { name: 'first', value: 'firstValue' },
    { name: 'second', value: 'secondValue' },
  ];

  constructor() {
    this.modelAction = new ActionItem(
      'Indietro',
      (item, a) => {
        this.modelActionMethod(item);
      },
      'fas fa-chevron-left',
      'LINK',
      undefined,
      false
    );
    this.dynamicAction = new ActionItem(
      'Will not be shown',
      (item, a) => {
        this.dynamicActionMethod(item);
      },
      'bathtub'
    );
    this.onlyIconAction = new ActionItem(
      'Neither this will be shown',
      () => {
        alert('action without parameters');
      },
      'bank'
    );
    this.basicAction = new ActionItem(
      'Basic action',
      () => {
        alert('Basic action triggered');
      },
      undefined,
      'PRIMARY'
    );
    this.secondaryRedDisabledAction = new ActionItem(
      'Secondary red action',
      () => {
        console.log('click');
      },
      'fas fa-trash'
    );
  }

  modelActionMethod(item: BaseModel) {
    alert(`You clicked on ${JSON.stringify(item)}`);
  }

  dynamicActionMethod(item: BaseModel) {
    alert(`Another thing done on ${JSON.stringify(item)}`);
  }
}
