import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent as EafNavBarComponent } from '@webkit/layout';
import { EafConfigurationService, EafStorageService } from '@webkit/shared';
import { Collapse } from 'bootstrap';
import { tap } from 'rxjs';

@Component({
  selector: 'mimit-customized-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent extends EafNavBarComponent {
  bsCollapse: Collapse;
  toggleStato = true;

  constructor(
    route: Router,
    active: ActivatedRoute,
    configurationService: EafConfigurationService,
    storage: EafStorageService,
    http: HttpClient
  ) {
    super(route, active, configurationService, storage, http);
    this.getNavConfig();
  }

  override getNavConfig() {
    const mfRoutes = this.configurationService.get('mfeRoutes');
    console.log(mfRoutes);
    
    // const servizi = this.configurationService.get('mfeRoutes').servizi;
    // const utente = this.configurationService.get('mfeRoutes').utente;
    if (!this.config && !mfRoutes) {
      this.config = this.route.config;
    } else if (!this.config && mfRoutes) {
      this.config = [];
      this.http
        .get('./assets/menu.json')
        .pipe(
          tap((res) => {
            if (!res) {
              return;
            }
            this.manageMenu(res);
          })
        )
        .subscribe();
    }
  }

  manageMenu(menu: any) {
    if (Array.isArray(menu)) {
      this.config.push(...menu);
    } else {
      this.config.push(menu);
    }
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
  
  toggleSidebar() {
    this.toggleStato = !this.toggleStato;
  }

  toggleDropdown(id: string) {
    const dropdownElement = document.getElementById(id);
    if (dropdownElement) {
      dropdownElement.classList.toggle('show');
    }
  }
}
