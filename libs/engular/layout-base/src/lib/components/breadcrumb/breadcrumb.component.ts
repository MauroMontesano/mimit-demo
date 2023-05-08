import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Params, Router, UrlSegment } from '@angular/router';
import { ConfigurationService } from '@engular/core-services';
// import { LoggerService } from '@engular/logger';

export interface Breadcrumbs {
  name: string;
  url?: string;
  queryParams?: Params;
}
@Component({
  template: '',
})
export abstract class BreadcrumbComponent implements OnInit {
  // log = LoggerService.getLogger('BreadcrumbComponent');
  breadcrumbs: Breadcrumbs[] = [];
  appName: string;

  constructor(private router: Router, private configurationService: ConfigurationService) {
    // this.log.info('');
  }

  ngOnInit() {
    this.appName = this.configurationService.get('appName');
    this.initParseRoute();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initParseRoute();
      }
    });
  }

  initParseRoute() {
    //	this.log.info('');
    this.breadcrumbs = [];
    this.parseRoute(this.router.routerState.snapshot.root);
  }

  private parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumbs']) {
      let urlSegments: UrlSegment[] = [];
      node.pathFromRoot.forEach((routerState) => {
        urlSegments = urlSegments.concat(routerState.url);
      });

      const url = node.data['url']
        ? node.data['url']
        : urlSegments
            .map((urlSegment) => {
              return urlSegment.path;
            })
            .join('/');
      const breadcrumb: Breadcrumbs = {
        name: node.data['breadcrumbs'],
        url: '/' + url,
        queryParams: node.data['queryParams'],
      };

      // Disabilitiamo il click
      if (node.data['disableBreadcrumbLink'] === true) {
        delete breadcrumb.url;
      }
      this.breadcrumbs.push(breadcrumb);
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }
}
