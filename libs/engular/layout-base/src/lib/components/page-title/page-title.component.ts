import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  template: '',
})
export abstract class PageTitleComponent implements OnInit {
  title: string | undefined;

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
    let node: any = this.router.routerState.snapshot.root;
    let i = 0;
    while (node && i <= 30) {
      i++;
      this.title = node.data['title'] === '' || node.data['title'] ? node.data['title'] : node.data['breadcrumb'];
      node = node.firstChild;
    }
  }
}
