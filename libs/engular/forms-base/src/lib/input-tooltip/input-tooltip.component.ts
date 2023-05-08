import { AfterViewInit, Component, Input } from '@angular/core';
import { TooltipModel } from '@engular/base-models';

/*
@Component({
	selector: 'eng-input-tooltip',
	templateUrl: './input-tooltip.component.html',
	styleUrls: ['./input-tooltip.component.scss'],
	encapsulation: ViewEncapsulation.None,
}) */
@Component({
  template: '',
})
export abstract class InputTooltipComponent implements AfterViewInit {
  @Input() tooltip: TooltipModel;

  idRandom: string;
  protected initialized = false;

  constructor() {
    this.idRandom = 'TooltipID' + Math.round(Math.random() * 1000);
  }

  ngAfterViewInit(): void {
    this.initializeTooltipLib();
  }
  abstract initializeTooltipLib(): any;
}
