import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'eaf-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderTitleComponent implements OnInit {
  title: string | undefined;
  icon: string | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.parseRoute();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.parseRoute();
      }
    });
  }

  parseRoute() {
    this.title = undefined;
    this.icon = undefined;
    let node: any = this.router.routerState.snapshot.root;
    let i = 0;
    while (node && i <= 30) {
      i++;
      this.title = node.data['title'] === '' || node.data['title'] ? node.data['title'] : node.data['breadcrumb'];
      this.icon = node.data['icon'] === '' || node.data['icon'] ? node.data['icon'] : 'fa-car';
      node = node.firstChild;
    }
  }
}
