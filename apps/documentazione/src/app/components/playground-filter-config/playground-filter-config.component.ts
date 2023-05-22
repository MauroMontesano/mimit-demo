import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MOCK_FILTERS } from './mock-filters';

@Component({
  selector: 'eaf-playground-filter-config',
  templateUrl: './playground-filter-config.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundFilterConfigComponent implements OnInit {
  @ViewChild('filterModal') filterModal: any;
  fields = MOCK_FILTERS;
  visibleFields: any[] = [];
  hiddenFields: any[] = [];
  constructor() {
    //non faccio nulla
  }

  ngOnInit() {
    this.onSave(this.fields);
  }

  onSave($event: any[]) {
    this.visibleFields = [];
    this.hiddenFields = [];
    $event.map((item) => {
      if (item.visible) {
        this.visibleFields.push(item.id);
      } else {
        this.hiddenFields.push(item.id);
      }
    });
  }

  openFilterModal() {
    this.filterModal.open();
  }
}
