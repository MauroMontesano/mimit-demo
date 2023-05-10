import { Component } from '@angular/core';
import { TabModel, TabsManagerService } from '@mimit/core';

@Component({
  selector: 'mimit-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(tabsManager: TabsManagerService) {
    const tab: TabModel = { nome: 'Lista attività', path: '' };
    tabsManager.openTab(tab);
  }
}
