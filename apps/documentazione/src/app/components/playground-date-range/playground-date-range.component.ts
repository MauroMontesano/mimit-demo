import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, DateModel, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-date-range',
  templateUrl: './playground-date-range.component.html',
  styleUrls: ['./playground-date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundDateRangeComponent implements OnInit {
  form: EafForm;
  errors = {};
  errorLabels = [ErrorLabelConstants.REQUIRED];
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
  pippo = false;
  ngOnInit() {
    this.errors['dateRangeRequired'] = [ErrorLabelConstants.REQUIRED, ErrorLabelConstants.DATE_RANGE_INVALID];
    const x = new DateModel('12/02/2020');
    const y = new DateModel('12/12/2020');
    x.date.subtract(1, 'hours');
    this.errors['tooltip'] = [ErrorLabelConstants.DATE_RANGE_INVALID];
    this.errors['warning'] = [ErrorLabelConstants.DATE_RANGE_INVALID];
    this.errors['actions'] = [ErrorLabelConstants.DATE_RANGE_INVALID];
    this.errors['minMax'] = [ErrorLabelConstants.DATE_RANGE_INVALID];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    this.form = new EafForm(
      this.fb.group({
        required: [null, Validators.required],
        disabled: [{ from: x, to: y }],
        readonly: [{ from: x, to: y }],
        tooltip: [],
        warning: [],
        actions: [],
        minMax: [{ from: x, to: y }],
      })
    );
    setTimeout(() => {
      this.pippo = false;
    }, 3000);
    setTimeout(() => {
      this.pippo = false;
    }, 4000);
    setTimeout(() => {
      this.pippo = false;
    }, 10000);

    this.form.getFormControl('required').valueChanges.subscribe((Data) => {
      console.log(this.form.getFormControl('required'));
    });
  }
}
