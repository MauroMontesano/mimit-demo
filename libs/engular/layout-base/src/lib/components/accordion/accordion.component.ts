import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';

// @Component({
// 	selector: 'eng-accordion',
// 	templateUrl: './accordion.component.html',
// 	styleUrls: ['./accordion.component.scss'],
// 	encapsulation: ViewEncapsulation.None,
// })
@Component({
  template: '',
})
export class AccordionComponent implements OnInit {
  @Input('title')
  title: string;

  @Input('actions')
  actions: ActionItem[];

  @Input()
  isOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
