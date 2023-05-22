import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Tab } from '@engular/layout-base';

@Component({
  selector: 'eaf-playground-tabs',
  templateUrl: './playground-tabs.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundTabsComponent implements OnInit {
  @ViewChild('tab1', { static: true }) tabTemplate1: any;
  @ViewChild('tab2', { static: true }) tabTemplate2: any;
  @ViewChild('tab3', { static: true }) tabTemplate3: any;
  tabs: Tab[];

  ngOnInit() {
    this.tabs = [
      new Tab(1, 'First tab title', this.tabTemplate1),
      new Tab(2, 'Second tab title', this.tabTemplate2),
      new Tab(3, 'Third tab with icon', this.tabTemplate3, 'bank'),
    ];
  }
}
