import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-input-number-interval',
  templateUrl: './playground-input-number-interval.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundInputNumberIntervalComponent implements OnInit {
  form: EafForm;

  // errorLabels = [ErrorLabelConstants.REQUIRED];
  errors = {};
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
    this.errors['required'] = [
      ErrorLabelConstants.REQUIRED,
      ErrorLabelConstants.INTERVAL_INVALID,
      ErrorLabelConstants.NOT_A_NUMBER,
    ];
    this.errors['actions'] = [
      ErrorLabelConstants.REQUIRED,
      ErrorLabelConstants.INTERVAL_INVALID,
      ErrorLabelConstants.NOT_A_NUMBER,
    ];
    this.errors['warning'] = [
      ErrorLabelConstants.REQUIRED,
      ErrorLabelConstants.INTERVAL_INVALID,
      ErrorLabelConstants.NOT_A_NUMBER,
    ];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    this.form = new EafForm(
      this.fb.group({
        required: [{ to: '', from: '' }, [Validators.required]],
        disabled: [{ to: 5, from: 2 }],
        readonly: [{ from: 3, to: 10 }],
        actions: [''],
        warning: [{ to: '', from: '' }],
      })
    );
  }
}
