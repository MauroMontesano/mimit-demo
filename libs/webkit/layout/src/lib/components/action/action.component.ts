import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';

@Component({
  selector: 'eaf-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionComponent {
  /*
action item, name should be entered because it is title and label, action is standard and
icon should be in "fa-regular fa-file-pdf-o" or "fa-regular fa-file-pdf-o fa-5x" format
*/
  layoutConfiguration: LayoutConfiguration;
  // multiIcon: boolean | any;
  @Input()
  model: any;
  @Input()
  onlyIcon = false;
  @Input()
  disabled = false;
  @Input()
  dynamicTitle: string | undefined;
  @Input()
  extraClass = '';
  @Input()
  loading = false;
  @Input()
  title: string;

  constructor(injector: Injector) {
    this.layoutConfiguration = injector.get(LayoutConfiguration);
  }

  _action: ActionItem;

  get action(): ActionItem {
    return this._action;
  }

  @Input()
  set action(action: ActionItem) {
    this._action = action;
    // const iconToCheck: any = action.icon;
    // this.multiIcon = iconToCheck instanceof Array;
  }

  manageClick($event: any) {
    $event.stopPropagation();
    if (!this.disabled) {
      this.action.callAction(this.model);
    }
  }

  mapActionType(
    type: 'LINK' | 'NORMAL' | 'PRIMARY' | 'SECONDARY' | 'EAF-SECONDARY' | 'EAF-SECONDARY-RED' | 'DANGER' | 'WARNING'
  ): string {
    return this.layoutConfiguration.mapActionType(type);
  }
  mapColorType(type: string): string {
    if (type === 'EAF-SECONDARY-RED') {
      return 'text-danger';
    }
    return '';
  }
}
