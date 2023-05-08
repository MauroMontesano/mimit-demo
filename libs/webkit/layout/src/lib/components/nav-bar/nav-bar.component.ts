import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ActionItem } from '@engular/base-models';
import { EafConfigurationService, EafStorageService } from '@webkit/shared';
import { filter, map } from 'rxjs';

@Component({
  selector: 'eaf-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit {
  @Input()
  title = 'Inserire Titolo';

  public _dropdownActions: any;

  @Input()
  public set dropdownActions(value: ActionItem[]) {
    if (!this.userDropdownActions) {
      this.userDropdownActions = value;
    }

    this._dropdownActions = value;
  }

  @Input() userDropdownActions: ActionItem[] | undefined;

  menuName = 'menu';
  opened = false;

  @ViewChild('toggleButton', { static: true })
  button: any;
  @Input() config: any;
  @Input()
  nomeUser: string | undefined;
  @Input()
  ruoloUser: string | undefined;
  @Input()
  permissions: string[] = [];
  @Input()
  titoloDropdown: string | undefined;
  @Input()
  public autoClose = true;
  @Input()
  floatingNavbar = true;
  @Input()
  startOpen = false;

  public fullHide = false;

  constructor(
    protected route: Router,
    private active: ActivatedRoute,
    protected configurationService: EafConfigurationService,
    private storage: EafStorageService,
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
    // this.getNavConfig();

    if (this.dropdownActions && this.dropdownActions.length > 0 && !this.userDropdownActions) {
      this.userDropdownActions = this.dropdownActions;
    }
    this.ngOnInitForChildren();
  }

  openSideBar() {
    document.body.classList.add(this.floatingNavbar ? 'sb-sidenav-toggled' : 'sb-sidenav-toggled-static');
    // this.menuName = 'chiudi';
    this.opened = true;
    this.cleanIcon();
  }

  closeSideBar() {
    document.body.classList.remove(this.floatingNavbar ? 'sb-sidenav-toggled' : 'sb-sidenav-toggled-static');
    this.menuName = 'menu';
    this.opened = false;
    this.cleanIcon();
  }

  closeFloating() {
    if (this.autoClose && this.floatingNavbar && this.opened) {
      this.closeSideBar();
    }
  }

  cleanIcon() {
    // if (!Utils.isIE()) {
    // this.button.nativeElement.childNodes.forEach((item: any) => {
    //   if (item instanceof SVGSVGElement) {
    //     this.button.nativeElement.removeChild(item);
    //   }
    // });
    // }
  }

  getNavConfig() {
    const mfRoutes = this.configurationService.get('mfeRoutes');
    if (!this.config && !mfRoutes) {
      this.config = this.route.config;
    } else if (!this.config && mfRoutes) {
      this.config = [];
      for (const route in mfRoutes) {
        if (route) {
          this.http.get(mfRoutes[route] + '/assets/menu.json').subscribe((res) => {
            if (!res) {
              return;
            }
            this.config.push(res);
          });
        }
      }
    }
  }

  iconSwitch(): string {
    return !this.opened ? 'bars' : 'times';
  }

  toggleMenu() {
    if (this.opened) {
      this.closeSideBar();
    } else {
      this.openSideBar();
    }
  }

  ngOnInitForChildren(): any {
    // da utilizzare con override in componenti che estendono questo
  }
}
