import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FilterBase } from '@engular/base-models';

@Component({
  selector: 'eaf-filter-config',
  templateUrl: './filter-config.component.html',
  styleUrls: ['./filter-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterConfigComponent implements OnInit, OnChanges {
  @Input() fields!: FilterBase[];
  @Input() showButton = true;
  @Output() save: EventEmitter<FilterBase[]> = new EventEmitter<FilterBase[]>();

  BAG = 'FIELDS';
  visibleFields: FilterBase[] = [];
  hiddenFields!: FilterBase[];

  constructor() {
    //non faccio nulla
  }

  ngOnInit() {
    this.mapFields();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['fields'] && changes['fields'].currentValue) {
      this.fields = changes['fields'].currentValue;
      this.mapFields();
    }
  }

  mapFields() {
    this.visibleFields = this.fields.filter((field) => !field.advancedFilter);
    this.hiddenFields = this.fields.filter((field) => field.advancedFilter);
  }

  // save field config
  saveFields(): void {
    const fields: FilterBase[] = [];
    this.visibleFields.map((field) => {
      field.advancedFilter = false;
      fields.push(field);
    });
    this.hiddenFields.map((field) => {
      field.advancedFilter = true;
      fields.push(field);
    });
    this.fields = fields;
    this.save.emit(this.fields);
  }
}
