import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionItem, BaseModel } from '@engular/base-models';
@Component({
  template: '',
})
export abstract class ActionComponent implements OnInit {
  /*
action item, name should be entered because it is title and label, action is standard and
icon should be in "fa fa-file-pdf-o" or "fa fa-file-pdf-o fa-5x" format
*/

  @Input()
  action: ActionItem;

  @Input()
  model: BaseModel;

  @Input()
  onlyIcon = false;

  @Input()
  disabled = false;

  @Input()
  dynamicTitle: string;

  @Input()
  loading: boolean;

  constructor() {}

  ngOnInit() {}

  manageClick($event: any) {
    $event.stopPropagation();
    if (!this.disabled) {
      this.action.action(this.model, this.action);
    }
  }
}
