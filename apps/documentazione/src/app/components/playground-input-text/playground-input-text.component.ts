import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-input-text',
  templateUrl: './playground-input-text.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundInputTextComponent implements OnInit {
  formControl1 = new EafForm(new UntypedFormControl());
  form: EafForm;

  errorLabels = {};
  tooltip = new TooltipModel('Test content', undefined, undefined);
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
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, undefined);
    this.form = new EafForm(
      this.fb.group({
        required: ['', Validators.required],
        disabled: ['Disabled input value'],
        readonly: ['Readonly input value'],
        maxlength: [''],
        tooltip: ['', Validators.required],
        actions: [''],
      })
    );
  }

  reset() {
    this.form.form.reset();
  }
}
