import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Tab } from '../../models/tab.model';
@Component({
  template: '',
})
export abstract class TabsComponent implements OnInit {
  @Output()
  tabChanged: EventEmitter<Tab> = new EventEmitter();

  @Input()
  destroyTemplate = false;

  activeTab: Tab;

  @Input('activeTab')
  set setActiveTab(active: Tab) {
    this.activeTab = active;
    if (active) {
      this.activeTab.visited = true;
      this.loadNewTemplate(active);
    }
  }
  @Input()
  tabs: Tab[] = [];
  @Input()
  templates: any[] = [];
  @Input()
  id = 'Tabs_' + Math.round(Math.random() * 1000);
  public numberOfTabs: number;

  activeTemplate: any;

  constructor() {}

  tabChanging(currentTab: Tab) {
    this.activeTab = currentTab;
    this.activeTab.visited = true;
    this.tabChanged.emit(currentTab);
    this.loadNewTemplate(currentTab);
  }

  loadNewTemplate(tab: Tab) {
    this.activeTemplate = tab.templateNo;
  }

  ngOnInit() {
    this.activeTab = this.tabs[0];
    this.activeTemplate = this.tabs[0].templateNo;
    console.log(this.tabs);
    
  }
}
