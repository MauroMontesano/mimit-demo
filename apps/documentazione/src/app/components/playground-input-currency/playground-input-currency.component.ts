import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-input-currency',
  templateUrl: './playground-input-currency.component.html',
  styleUrls: ['./playground-input-currency.component.scss'],
})
export class PlaygroundInputCurrencyComponent implements OnInit {
  formControl1 = new EafForm(new UntypedFormControl());
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
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    this.form = new EafForm(
      this.fb.group({
        required: [null, Validators.required],
        disabled: [2000],
        readonly: [1234567],
        tooltip: [],
        actions: [],
      })
    );
  }

  reset() {
    this.form.form.reset();
  }
}
