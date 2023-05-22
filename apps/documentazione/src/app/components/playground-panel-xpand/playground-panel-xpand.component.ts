import { Component, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';

@Component({
  selector: 'eaf-playground-panel-xpand',
  templateUrl: './playground-panel-xpand.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundPanelXpandComponent {
  tooMuchIcons: any = [];

  constructor() {
    const openpdf = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        console.error('click on action', a, item);
      },
      'file-pdf-o'
    );
    const openfolder = new ActionItem(
      'BUTTON.FOLDER',

      (item, a) => {
        console.error('click on action', a, item);
      },
      'folder'
    );
    const times = new ActionItem(
      'BUTTON.AAA',

      (item, a) => {
        console.error('click on action', a, item);
      },
      'times'
    );
    const archive = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        console.error('click on action', a, item);
      },
      'archive'
    );
    const file = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        console.error('click on action', a, item);
      },
      'file'
    );
    const bug = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        console.error('click on action', a, item);
      },
      'bug'
    );

    this.tooMuchIcons = [bug, file, archive, times, openfolder, openpdf];
  }
}
