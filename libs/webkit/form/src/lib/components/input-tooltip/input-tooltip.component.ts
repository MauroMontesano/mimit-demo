import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InputTooltipComponent as EngularInputTooltipComponent } from '@engular/forms-base';
import { Popover } from 'bootstrap';
// declare const $: any;
@Component({
  selector: 'eaf-input-tooltip',
  templateUrl: './input-tooltip.component.html',
  styleUrls: ['./input-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputTooltipComponent extends EngularInputTooltipComponent {
  constructor(readonly sr: DomSanitizer) {
    super();
  }

  initializeTooltipLib() {
    if (this.tooltip /* && this.tooltip !== 'template' */ && !this.initialized) {
      this.initialized = true;
      setTimeout(() => {
        const exampleEl = document.getElementById(this.idRandom);
        if (exampleEl) {
          const tooltip = new Popover(exampleEl, {
            trigger: 'click',
          });
        }
      }, 100);
    } /* else if (this.tooltip === 'template') {
			this.initialized = true;
			setTimeout(() => {
				(<any>window['$']('#' + this.idRandom)).popover({
					content: this.template.nativeElement,
					html: true,
				});
			}, 100);
		} */
  }
}
