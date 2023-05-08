import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentLoaderComponent {
  _loading = false;
  @Input()
  set loading(loading: boolean) {
    this._loading = loading;
    this.classLoading = loading;
  }
  get loading() {
    return this._loading;
  }

  @Input() inline = false;
  @Input() type: 'border' | 'grow' = 'border';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() size: string;

  @Input() public small = false;

  @HostBinding('class.loading') classLoading = false;
}
