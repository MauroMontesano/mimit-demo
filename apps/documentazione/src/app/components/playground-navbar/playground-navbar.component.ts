import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ActionItem } from '@engular/base-models';

@Component({
  selector: 'eaf-playground-navbar',
  templateUrl: './playground-navbar.component.html',
})
export class PlaygroundNavbarComponent {
  public config: Routes;
  dropdownActions = [
    new ActionItem(
      'Action 1',
      () => {
        alert('Action 1 click');
      },
      '',
      'LINK'
    ),
    new ActionItem(
      'Action 2',
      () => {
        alert('Action 1 click');
      },
      'fas fa-book',
      'LINK'
    ),
  ];

  constructor(protected route: Router) {
    this.config = this.sortRoutes(this.route.config);
    console.log(this.config);
    this.dropdownActions.forEach((item) => {
      console.log(item);
    });
  }

  private sortRoutes(routes: Routes) {
    routes.forEach((r) => {
      if (r.children && r.children.length > 0) {
        r.children = this.sortRoutes(r.children);
      }
    });

    return routes.sort((a, b) => {
      if (!a.data || !a.data['breadcrumbs'] || !b.data || !b.data['breadcrumbs']) {
        return 0;
      }
      return a.data['breadcrumbs'].localeCompare(b['data']['breadcrumbs']);
    });
  }
}
