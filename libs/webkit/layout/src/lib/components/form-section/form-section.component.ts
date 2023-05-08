import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BasePageSection } from './../base-page-section/base-page-section';

@Component({
  selector: 'eaf-form-section',
  templateUrl: './form-section.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FormSectionComponent extends BasePageSection {
  @Input() title: string;
  @Input() override id = 'FormSection_' + Math.round(Math.random() * 1000);
}
