import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';

@Component({
  selector: 'eaf-actions-dropdown',
  templateUrl: './actions-dropdown.component.html',
  styleUrls: ['./actions-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionsDropdownComponent {
  actions: any = { visible: [], drop: [] };
  dropdownOpen = false;
  openMenuAction = new ActionItem('Altre azioni', () => this.openDropdown(), 'ellipsis-v');

  @Input()
  model: any;

  @Input()
  maxAction = 4;

  @Input()
  extraClass: string;

  @Input()
  labeledMenu = false;

  @Input('actions')
  set calculateActionForRow(actionsInput: ActionItem[]) {
    this.actions = { visible: [], drop: [] };
    let counter = 0;
    actionsInput.forEach((action) => {
      counter++;
      if (counter < this.maxAction) {
        this.actions.visible.push(action);
      } else {
        this.actions.drop.push(action);
      }
    });
  }

  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
