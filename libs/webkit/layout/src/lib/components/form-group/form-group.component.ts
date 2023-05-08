import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BasePageSection } from './../base-page-section/base-page-section';

@Component({
  selector: 'eaf-form-group',
  templateUrl: './form-group.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FormGroupComponent extends BasePageSection {
  @Input() title = 'No title';

  constructor() {
    super();
  }
}
