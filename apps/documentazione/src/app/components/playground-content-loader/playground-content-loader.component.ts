import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-playground-content-loader',
  templateUrl: './playground-content-loader.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundContentLoaderComponent {
  loading = false;

  toggleLoading(): void {
    this.loading = !this.loading;
  }
}
