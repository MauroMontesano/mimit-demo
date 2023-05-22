import { Component } from '@angular/core';
import { ActionItem } from '@engular/base-models';

@Component({
  selector: 'eaf-playground-panel',
  templateUrl: './playground-panel.component.html',
})
export class PlaygroundPanelComponent {
  actions = [
    new ActionItem(
      'Preview',
      () => {
        alert('eye');
      },
      undefined,
      'PRIMARY'
    ),
    new ActionItem(
      'Delete',
      () => {
        alert('delete');
      },
      undefined
    ),
  ];
  headerActions = [
    new ActionItem(
      'Preview',
      () => {
        alert('planet saved');
      },
      'tree'
    ),
    new ActionItem(
      'Delete',
      () => {
        alert('WOOF!');
      },
      'paw'
    ),
  ];
}
