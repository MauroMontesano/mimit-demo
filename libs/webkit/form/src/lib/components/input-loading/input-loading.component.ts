import { Component, ViewEncapsulation } from '@angular/core';
import { InputLoadingComponent as EngularInputLoading } from '@engular/forms-base';
@Component({
  selector: 'eaf-input-loading',
  templateUrl: './input-loading.component.html',
  styleUrls: ['./input-loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputLoadingComponent extends EngularInputLoading {}
