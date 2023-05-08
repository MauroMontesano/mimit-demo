import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionItem } from '@engular/base-models';
import {
  AuthenticationService,
  TabsManagerService,
  UtenteModel
} from '@mimit/core';

@Component({
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentLayoutComponent implements OnInit {
  title = 'Portale Aste';
  pages: any;
  user: UtenteModel;
  nomeUtente: string;
  nickname: string;
  permissions: string[];
  userDropdownActions = [
    // new ActionItem(
    //   'Notifiche',
    //   () => {
    //     //
    //   },
    //   'bell'
    // ),
    new ActionItem(
      'Modifica profilo',
      () => {
        this.router.navigate(['/modifica-profilo'], { replaceUrl: true });
      },
      'user'
    ),
    new ActionItem(
      'Esci',
      () => {
        this.authService.logout();
      },
      'sign-out',
      'NORMAL'
    ),
  ];
  status = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tabsManager: TabsManagerService
  ) {
    // this.pages = tabsManager.menuTabs.subscribe(
    //   (res: any) => console.log(res)
    // );
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.permissions = this.user.role.functionalities;
      }
    });
    this.authService.getdatiUtente().subscribe((datiUtente) => {
      if (datiUtente) {
        this.nickname = datiUtente.nickname;
        this.nomeUtente = datiUtente.nome;
      }
    });
    // this.getSessionAlertStatus();
  }

  // closeAlert() {
  //   this.status = true;
  //   sessionStorage.setItem('sessionAlertStatus', 'true');
  //   // this.storage.setPreference('sessionAlertStatus', true);
  //   this.getSessionAlertStatus();
  // }

  // getSessionAlertStatus() {
  //   this.status = sessionStorage.getItem('sessionAlertStatus') == 'true';

  //   // const status = this.storage.getPreference('sessionAlertStatus');
  // }
}
