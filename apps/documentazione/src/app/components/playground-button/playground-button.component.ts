import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-playground-button',
  templateUrl: './playground-button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundButtonComponent {
  clickCounter = 0;
  constructor() {
    //non faccio nulla
  }

  // shows event emitted by the button
  onClick(event: any): void {
    this.clickCounter++;
  }
}
