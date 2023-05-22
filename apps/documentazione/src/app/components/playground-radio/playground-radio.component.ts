import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, RadioOption, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';

@Component({
  selector: 'eaf-playground-radio',
  templateUrl: './playground-radio.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundRadioComponent implements OnInit {
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
  options: RadioOption[];
  optionsWithTooltip: RadioOption[];

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.initOptions();
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    this.form = new EafForm(
      this.fb.group({
        required: ['', Validators.required],
        warning: [''],
        disabled: [1],
        readonly: [3],
        tooltip: [''],
        tooltipOption: [''],
        oneLiner: [''],
        actions: [''],
        custom: [''],
      })
    );
  }

  initOptions(): void {
    const radioOptions = RadioOption.fromIdValueArray([
      {
        id: 1,
        value: 'primo valore',
      },
      {
        id: 2,
        value: 'secondo valore',
      },
      {
        id: 3,
        value: 'terzo valore',
      },
    ]);
    this.options = radioOptions;
    this.optionsWithTooltip = [...radioOptions];
    const fourthTooltip = new TooltipModel('Radio option tooltip description', undefined, 'radio option tooltip title');
    const fourthOption = new RadioOption('quarta label', { pippo: 'yeaaah' }, fourthTooltip);
    const fifthOption = new RadioOption('quinta label', 5, undefined);
    this.optionsWithTooltip.pop();
    this.optionsWithTooltip.push(fourthOption);
    this.optionsWithTooltip.push(fifthOption);
  }
}
