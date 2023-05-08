import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent as EafSidebarComponent } from '@webkit/layout';

@Component({
  selector: 'mimit-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent extends EafSidebarComponent {}
