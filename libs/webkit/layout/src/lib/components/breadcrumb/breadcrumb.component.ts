import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '@engular/core-services';
import { BreadcrumbComponent as EafBreadcrumbComponent } from '@engular/layout-base';

@Component({
  selector: 'eaf-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent extends EafBreadcrumbComponent {
  constructor(router: Router, configurationService: ConfigurationService) {
    super(router, configurationService);
  }
}
