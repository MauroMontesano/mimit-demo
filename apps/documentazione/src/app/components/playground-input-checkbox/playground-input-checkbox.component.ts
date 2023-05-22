import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-input-checkbox',
  templateUrl: './playground-input-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundCheckboxComponent implements OnInit {
  form: EafForm;
  errorLabels = {};
  tooltip = new TooltipModel('Test content', undefined, 'Test title');
  actions = [
    new ActionItem(
      'Preview',
      () => {
        alert('eye');
      },
      'eye'
    ),
    new ActionItem(
      'Delete',
      () => {
        alert('delete');
      },
      'times'
    ),
  ];
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.form = new EafForm(
      this.fb.group(
        {
          required: ['', Validators.required],
          warning: [''],
          disabled: [false],
          readonly: [true],
          tooltip: [''],
          actions: [''],
          custom: [''],
        }
        // { updateOn: 'blur' },
      )
    );
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
  }
}
