import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EafConfigurationService } from '@webkit/shared';
import { Collapse } from 'bootstrap';
import { filter, map } from 'rxjs';
@Component({
  selector: 'eaf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  @Input() menuName = 'menu';
  @Input() config: any;
  @Input() autoClose = true;
  @Input() floatingNavbar = true;
  @Input() startOpen = false;
  opened = false;
  fullHide = false;
  bsCollapse?: Collapse;

  constructor(
    protected route: Router,
    private active: ActivatedRoute,
    protected configurationService: EafConfigurationService,
    protected http: HttpClient
  ) {}

  ngOnInit() {
    document.body.classList.add('sb-nav-fixed');
    if (this.startOpen) {
      this.openSideBar();
    }

    this.route.events
      .pipe(
        filter((routeEvent) => routeEvent instanceof NavigationEnd),
        map(() => this.active)
      )
      .subscribe((route: any) => {
        let curr = route;
        while (curr.firstChild) {
          curr = curr.firstChild;
        }
        if (curr.snapshot.data && curr.snapshot.data['hideNav']) {
          this.fullHide = String(curr.snapshot.data['hideNav']) === 'true';
        } else {
          this.fullHide = false;
        }
      });
  }

  toggleCollapse(id: string) {
    const collapseElement = document.getElementById(id);
    if (collapseElement) {
      this.bsCollapse = new Collapse(collapseElement, {
        toggle: false,
      });
      this.bsCollapse.toggle();
    }
  }

  toggleMenu() {
    if (this.opened) {
      this.closeSideBar();
    } else {
      this.openSideBar();
    }
  }

  openSideBar() {
    document.body.classList.add(this.floatingNavbar ? 'sb-sidenav-toggled' : 'sb-sidenav-toggled-static');
    this.menuName = 'chiudi';
    this.opened = true;
  }

  closeSideBar() {
    document.body.classList.remove(this.floatingNavbar ? 'sb-sidenav-toggled' : 'sb-sidenav-toggled-static');
    this.menuName = 'menu';
    this.opened = false;
  }

  closeFloating() {
    if (this.autoClose && this.floatingNavbar && this.opened) {
      this.closeSideBar();
    }
  }
}
