import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title: string;
  @Input() content: string;
  icon: string;

  @Input() closable = true;

  mapIcon(): void {
    switch (this.type) {
      case 'success':
        this.icon = 'fa-check';
        break;
      case 'error':
        this.icon = 'fa-times';
        break;
      case 'warning':
        this.icon = 'fa-exclamation';
        break;
      default:
        this.icon = 'fa-info-circle';
        break;
    }
  }
}
