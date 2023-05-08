import {
  Component,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mimit-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  // tabChange(evt: MatTabChangeEvent) {
  //   console.log(this.matTabs.menu[evt.tab.textLabel], this.matTabs.menu);
  //   this.router.navigateByUrl(`/${this.matTabs.menu[evt.tab.textLabel]}`);
  // }
}
