import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-form-title',
  templateUrl: './form-title.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FormTitleComponent {
  @Input() size = 4;
}
