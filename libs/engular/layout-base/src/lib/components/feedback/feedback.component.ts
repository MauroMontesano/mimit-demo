import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ActionItem } from '@engular/base-models';
@Component({
  template: '',
})
export abstract class FeedbackComponent implements OnInit {
  @Input()
  type: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'default' = 'default';

  @Input()
  title: string = 'Titolo';
  /* old webkit  specific
	@Input()
	actions: ActionItem[] = []; // testing actions
	@Input()
	body: boolean = false;
*/
  constructor() {}

  ngOnInit() {
    /* old webkit  specific	if (this.actions.length > 0) {
			this.body = true;
		}
		*/
  }
}
