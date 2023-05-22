import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActionItem, CheckboxOption, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-checkbox-multi',
  templateUrl: './playground-checkbox-multi.component.html',
})
export class PlaygroundCheckboxMultiComponent implements OnInit {
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
  options: CheckboxOption[] = [];
  optionsWithTooltip: CheckboxOption[];
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    const optionTooltip = new TooltipModel('option tooltip description', undefined, 'option tooltip title');
    this.options.push(new CheckboxOption('first option label', 1));
    this.options.push(new CheckboxOption('second option label', 2));
    this.options.push(new CheckboxOption('third option label', 3));
    this.optionsWithTooltip = [...this.options];
    this.optionsWithTooltip.pop();
    this.optionsWithTooltip.pop();
    this.optionsWithTooltip.push(new CheckboxOption('fourth option label', 2, optionTooltip));
    this.optionsWithTooltip.push(new CheckboxOption('fifth option label', 2));

    this.form = new EafForm(
      this.fb.group({
        required: [[]],
        warning: [[]],
        disabled: [[1, 2]],
        readonly: [[3]],
        tooltip: [[]],
        actions: [[]],
        custom: [[]],
        oneLiner: [[]],
      })
    );
  }
}
