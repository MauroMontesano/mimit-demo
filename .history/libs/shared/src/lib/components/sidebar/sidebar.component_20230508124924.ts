import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsManagerService } from '@mimit/core';
import { SidebarComponent as EafSidebarComponent } from '@webkit/layout';
import { EafConfigurationService } from '@webkit/shared';
import { Collapse } from 'bootstrap';

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

  initMenu(id: string, children: string[]) {
    const collapseElement = document.getElementById(id);
    if (collapseElement) {
      this.bsCollapse = new Collapse(collapseElement, {
        toggle: false,
      });
      this.bsCollapse.toggle();
    }
    this.initializeTabs(children);
  }

  initializeTabs(routes: string[]) {
    console.log(routes);
  }

  open(path: string) {
    console.log(path);

    this.tabsManager.addTab();
  }
}
