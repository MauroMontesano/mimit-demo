import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';

@Component({
  selector: 'eaf-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PanelComponent {
  @Input() actions: ActionItem[];
  @Input() headerActions: ActionItem[] = [];
  @Input('title') set manageTitle(value: any) {
    this.title = value;
  }
  @Input()
  disable: boolean;
  @Input('panel-title') title: string;
  _actions: any[];

  @Input()
  closable = false;

  @Input()
  isOpen = true;

  mapActionType(type: 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'WARNING'): string {
    let output: string;
    switch (type) {
      case 'LINK':
        output = 'link';
        break;
      case 'NORMAL':
        output = 'default';
        break;
      case 'PRIMARY':
        output = 'primary';
        break;
      case 'SECONDARY':
        output = 'secondary';
        break;
      case 'DANGER':
        output = 'danger';
        break;
      case 'WARNING':
        output = 'warning';
        break;
      default:
        output = '';
        break;
    }
    return output;
  }

  manageClick() {
    if (this.closable) {
      this.isOpen = !this.isOpen;
    }
  }
}
