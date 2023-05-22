import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Step } from '@webkit/layout';

@Component({
  selector: 'eaf-playground-stepper',
  templateUrl: './playground-stepper.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundStepperComponent implements OnInit {
  steps: Step[] = [];
  activeStep: Step;

  ngOnInit() {
    const firstStep = new Step(
      'step1', // id
      'first step', // title
      false, // disabled = false
      false, // hasError = false
      false, // hasWarning = false
      false, // visited = false
      true // visible = true
    );
    const secondStep = new Step('step2', 'second step');
    const thirdStep = new Step('step3', 'third step');
    const fourthStep = new Step('step4', 'fourth step with error', false, true);
    const fifthStep = new Step('step5', 'fifth step disabled', true);
    const sixthStep = new Step('step6', 'sixth step with warning', false, false, true);
    this.steps.push(firstStep);
    this.steps.push(secondStep);
    this.steps.push(thirdStep);
    this.steps.push(fourthStep);
    this.steps.push(fifthStep);
    this.steps.push(sixthStep);
  }

  onActiveStepChange(step: Step): void {
    this.activeStep = step;
  }
}
