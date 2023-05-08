import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsManagerService } from '@mimit/core';
import { SidebarComponent as EafSidebarComponent } from '@webkit/layout';
import { EafConfigurationService } from '@webkit/shared';

@Component({
  selector: 'mimit-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent extends EafSidebarComponent {
  constructor(
    route: Router,
    active: ActivatedRoute,
    configurationService: EafConfigurationService,
    http: HttpClient,
    private tabsManager: TabsManagerService
  ) {
    super(route, active, configurationService, http);
  }

  open(path: string) {
    console.log(path);

    this.tabsManager.addTab();
  }
}
