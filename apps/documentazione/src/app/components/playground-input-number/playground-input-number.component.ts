import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-input-number',
  templateUrl: './playground-input-number.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundInputNumberComponent implements OnInit {
  tooltip = new TooltipModel('Test content', undefined, undefined);
  form: EafForm;
  errorLabels = {};
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
    this.errorLabels['required'] = [ErrorLabelConstants.NOT_A_NUMBER, ErrorLabelConstants.REQUIRED];
    this.errorLabels['tooltip'] = [ErrorLabelConstants.NOT_A_NUMBER, ErrorLabelConstants.REQUIRED];
    this.errorLabels['actions'] = [ErrorLabelConstants.NOT_A_NUMBER, ErrorLabelConstants.REQUIRED];
    this.errorLabels['minMax'] = [
      ErrorLabelConstants.INTERVAL_INVALID,
      ErrorLabelConstants.NOT_A_NUMBER,
      ErrorLabelConstants.REQUIRED,
    ];
    this.form = new EafForm(
      this.fb.group({
        required: [null, [Validators.required]],
        tooltip: [],
        disabled: [5796],
        readonly: [1234],
        actions: [],
        minMax: [],
        intDec: [],
      })
    );
  }
  resetForm() {
    this.form.form.reset();
  }
}
