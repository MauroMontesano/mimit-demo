import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { TabModel, TabsManagerService } from '@mimit/core';

@Component({
  selector: 'mimit-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {
  tabs: TabModel[] | null = [];

  constructor(private tabsManager: TabsManagerService) {
    tabsManager.getTabs().subscribe((res) => (this.tabs = res));
  }

  // tabChange(evt: MatTabChangeEvent) {
  //   console.log(this.matTabs.menu[evt.tab.textLabel], this.matTabs.menu);
  //   this.router.navigateByUrl(`/${this.matTabs.menu[evt.tab.textLabel]}`);
  // }
}
