import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionItem } from '@engular/base-models';
import { MenuItem } from '../../models/menu-item.model';
import { MenuManager } from '../../services/menu-manager.service';

// @Component({
// 	selector: 'eng-menu',
// 	templateUrl: './menu.component.html',
// 	styleUrls: ['./menu.component.scss'],
// 	encapsulation: ViewEncapsulation.None,
// })
export abstract class MenuComponent implements OnInit {
  //log = LoggerService.getLogger('MenuComponent');
  expandedLink;
  menuAction: ActionItem[] = [];
  links: MenuItem[] = [];

  constructor(private router: Router, private menuLoader: MenuManager, private activatedRoute: ActivatedRoute) {}

  manageClick(item: MenuItem, extra?: any) {
    //	this.log.info('manage click', item);

    this.changeActiveMenu(item);

    if (item.action) {
      item.action(item, extra);
    }
  }

  changeActiveMenu(action: MenuItem) {
    const previousState = action.isOpen;
    // before close the old
    while (this.expandedLink) {
      this.expandedLink.isOpen = false;
      this.expandedLink = this.expandedLink.parent;
    }
    this.expandedLink = action;

    // now open the new
    let tmp = action;
    while (tmp) {
      tmp.isOpen = true;
      tmp = tmp.parent;
    }
    if (previousState) {
      action.isOpen = false;
    }
  }

  ngOnInit() {
    this.expandedLink = this.links[0];
    this.menuAction = [];
    this.menuLoader.subscribeOnMenuChange((menu) => {
      this.links = this.menuLoader.getMenu();
    });
  }
}
