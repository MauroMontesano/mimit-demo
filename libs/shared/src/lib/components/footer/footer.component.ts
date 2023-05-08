import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  status = false;

  ngOnInit(): void {
    this.getSessionAlertStatus();
  }

  closeAlert() {
    this.status = true;
    sessionStorage.setItem('sessionAlertStatus', 'true');
    // this.storage.setPreference('sessionAlertStatus', true);
    this.getSessionAlertStatus();
  }

  getSessionAlertStatus() {
    this.status = sessionStorage.getItem('sessionAlertStatus') == 'true';

    // const status = this.storage.getPreference('sessionAlertStatus');
  }
}
