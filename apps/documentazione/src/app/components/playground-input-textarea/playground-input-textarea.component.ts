import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-input-textarea',
  templateUrl: './playground-input-textarea.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundInputTextareaComponent implements OnInit {
  form: EafForm;
  errorLabels = {};
  tooltip: TooltipModel;
  maxLenght = 4;

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
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    this.form = new EafForm(
      this.fb.group({
        required: ['', [Validators.required]],
        disabled: ['Disabled textarea value'],
        readonly: ['Readonly textarea value'],
        maxlength: [''],
        tooltip: [''],
        actions: [''],
      })
    );
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['maxlength'] = [ErrorLabelConstants.MAX_LENGTH(this.maxLenght)];
  }
}
