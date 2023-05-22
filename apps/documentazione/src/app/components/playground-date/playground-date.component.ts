import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, DateModel, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-date',
  templateUrl: './playground-date.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundDateComponent implements OnInit {
  form: EafForm;

  minDate = '10/01/2020';
  maxDate = '28/02/2020';
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
    // const initDate = new DateModel(new Date());
    this.form = new EafForm(
      this.fb.group({
        name: [],
        required: [new DateModel('20/12/2019'), Validators.required],
        disabled: [new DateModel(new Date())],
        readonly: [new DateModel('20/12/2019')],
        maxlength: [],
        tooltip: [],
        actions: [],
        minMax: [],
        custom: [],
      })
    );
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['minMax'] = [];

    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
  }
}
