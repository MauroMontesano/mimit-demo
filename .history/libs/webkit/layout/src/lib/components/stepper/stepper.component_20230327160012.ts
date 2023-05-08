import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from './models/step';

@Component({
  selector: 'eaf-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input()
  steps: Step[];

  @Input()
  set activeStep(activeStep) {
    if (activeStep) {
      this._activeStep = activeStep;
      this._activeStep.visited = true;
    }
  }
  get activeStep(): Step {
    return this._activeStep;
  }

  _activeStep: Step;

  @Output()
  activeStepChange: EventEmitter<Step> = new EventEmitter();

  manageClick(step: Step) {
    if (step.disable) {
      return;
    }
    this.activeStepChange.emit(step);
  }

  showNumber(step: Step) {
    if (step.id === this.activeStep.id) {
      return true;
    }
    if (step.hasError) {
      return false;
    }
    if (step.visited) {
      return false;
    }
    return true;
  }

  getStateDescription(step: Step): string {
    if (step.id === this.activeStep.id) {
      return 'STEPPER.STATE_CURRENT_DESCRIPTION';
    }
    if (step.hasError) {
      return 'STEPPER.STATE_ERROR_DESCRIPTION';
    }
    if (step.visited) {
      return 'STEPPER.STATE_COMPLETE_DESCRIPTION';
    }
    return 'STEPPER.STATE_NEW_DESCRIPTION';
  }

  ngOnInit() {
    this.activeStep = this.activeStep ? this.activeStep : this.steps[0];
  }
}
