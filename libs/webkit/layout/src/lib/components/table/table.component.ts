/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-output-rename */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AbstractTableField, ActionItem, ActionsField, BaseModel, TableField } from '@engular/base-models';
import { Subscription, debounceTime } from 'rxjs';
import { EafTableFieldTypeConstant } from './consts/eaf-table-field-type.const';
import { EafAccordionField } from './models/accordion/accordion-field.model';
import { EafActionsStatus } from './models/actions-status.model';
import { EafActionsField } from './models/actions/actions-field.model';
import { EafAbstractTableField } from './models/base/abstract-table-field.model';
import { EafCheckboxField } from './models/checkbox/checkbox-field.model';

@Component({
  selector: 'eaf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, OnDestroy {
  // modificato il field da SportBaseModel a BaseModel

  EafTableFieldTypeConstant = EafTableFieldTypeConstant;

  //   formArray: any;
  @Input('data')
  set manageResultInput(data: any[] | undefined) {
    this.actionMap = {}; // this need to be reset every time a new array is passed as input
    this.data = data;
  }

  @Input()
  set pageActive(page: number) {
    this._pageActive = page;
    if (this._totalPage) {
      this.calculatePageNumberToShow(this._pageActive, 10);
    }
  }
  get pageActive() {
    return this._pageActive;
  }

  @Input()
  set totalPages(num: number | undefined) {
    this.pageActive = 0;
    this._totalPage = num;
    this.calculatePageNumberToShow(this.pageActive, 10);
  }

  optionsList!: any[];

  @Input()
  maxAction = 2;

  @Input()
  id = 'tableResult' + Math.round(Math.random() * 1000);

  @Input()
  accordion: any;

  @Input()
  accordionItem: BaseModel | undefined;

  @Input()
  noResultMessage = 'MESSAGE.NO_ELEMENTS_FOUND';
  data: any = [];

  @Input()
  showPageSize = true;

  @Input()
  showActions = true;

  @Input()
  isHighlighted?: (model: any) => boolean;

  _totalPageSlice: any = [];
  _totalPage: number | undefined;

  private actionMap!: { [key: string]: EafActionsStatus };
  _pageActive = 1;

  @Input()
  loading = false;

  @Input()
  filterable!: (criterio: any) => unknown;

  @Input('structure')
  tableStructure: EafAbstractTableField[] = [];

  @Input('tableTitle')
  title?: string;

  @Input()
  description?: string;

  @Output('onPageChanged')
  _onPageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output('onSortChange')
  _onSortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output('onCheckboxChange')
  _onCheckboxChange: EventEmitter<any> = new EventEmitter<any>();

  @Output('onPageSizeChange')
  _onPageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output('radioButtonSelected')
  _radioButtonSelected: EventEmitter<any> = new EventEmitter();
  @Input()
  actions?: ActionsField;

  @Input()
  topbarActions?: ActionItem[];

  @Input()
  topbarTemplate?: TemplateRef<any>;

  @Input()
  footerTRTemplate?: TemplateRef<any>;

  /**
   * Indicate if table it's sort desc or not
   */
  @Input()
  isDesc = false;

  /**
   * column name sorted
   */
  @Input()
  sortColumn: string | undefined;

  @Input()
  pageSizeSelected = 10;

  filterForm!: UntypedFormGroup;

  subscriptionToFilter?: Subscription;

  changePage(pageNumber: number) {
    if ((this.totalPages && pageNumber > this.totalPages) || pageNumber < 0) {
      return;
    }
    this.pageActive = pageNumber;
    this._onPageChanged.emit(pageNumber);
  }

  changeSort(field: TableField) {
    if (!field.sortable) {
      return true;
    }
    if (this.sortColumn !== field.propertyNameToUse) {
      this.isDesc = true;
      this.sortColumn = field.propertyNameToUse;
    } else {
      this.isDesc = this.isDesc ? false : true;
    }

    this._onSortChange.emit(field.sortDtoField || field.propertyNameToUse);
    return false;
  }

  changePageElementsShowed(pageSizeNumber: number) {
    this._onPageSizeChange.emit(pageSizeNumber);
  }

  calculatePageNumberToShow(actualPage: number, pageToShow: number) {
    this._totalPageSlice = [];
    let start = actualPage - Math.round(pageToShow / 2);
    start = start >= 1 ? start : 1;
    let end = start + pageToShow - 1;
    end = !this._totalPage || end <= this._totalPage ? end : this._totalPage;
    start = end - pageToShow;
    start = start >= 1 ? start : 1;
    for (let i = start; i <= end; i++) {
      this._totalPageSlice.push(i);
    }
  }

  toogleAccordion(item: BaseModel) {
    if (!this.accordion) {
      return;
    }
    if (this.accordionItem && this.accordionItem.equals(item)) {
      this.accordionItem = undefined;
    } else {
      this.accordionItem = item;
    }
  }
  onChange(newValue: any) {
    this.changePageElementsShowed(newValue);
    this.pageSizeSelected = newValue;
  }
  ngOnInit() {
    //if callback for filtering it's defined
    if (this.filterable) {
      //it will prepare the formgroup to map with input inside th
      this.filterForm = new UntypedFormGroup({});
      //and so create a formcontrol for each th (also the not filtable)
      console.log(this.tableStructure);

      this.tableStructure.forEach((t) => {
        if (t.propertyNameToUse) {
          this.filterForm.addControl(t.propertyNameToUse, new UntypedFormControl());
        }
      });
      //register with debounce
      this.subscriptionToFilter = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        console.error('new filter ', value); //todo
        this.filterable(value);
      });
    }

    //controlliamo un pò lo stato delle colonne
    let accordionFieldFound = false; //se nn c'è l'accordion è come se fosse trovato
    //if action itsn't definete input i will check if there are in table definiton

    this.tableStructure.forEach((field) => {
      if (!this.actions && field.fieldType + '' === EafTableFieldTypeConstant.ACTIONS + '') {
        this.actions = field as unknown as ActionsField;
      }
      if (field.fieldType + '' === EafTableFieldTypeConstant.ACCORDION + '') {
        accordionFieldFound = true;
      }
    });
    if (!accordionFieldFound && this.accordion) {
      this.tableStructure.unshift(new EafAccordionField());
    }

    this.optionsList = [
      { id: 1, value: 10 },
      { id: 2, value: 25 },
      { id: 3, value: 50 },
      { id: 4, value: 100 },
    ];
  }

  getActionForRow(row: BaseModel, actionsField: ActionsField | AbstractTableField) {
    let actions = this.actionMap[row.id];
    if ((actionsField instanceof ActionsField || actionsField instanceof EafActionsField) && !actions) {
      actions = { visible: [], drop: [], hidden: [] };
      let counter = 0;
      actionsField.actions.forEach((action) => {
        if (actionsField.canActionShowed(row, action)) {
          counter++;
          if (counter < this.maxAction) {
            actions.visible.push(action);
          } else {
            actions.drop.push(action);
          }
        } else {
          actions.hidden.push(action);
        }
      });
      this.actionMap[row.id] = actions;

      // console.error('get actions', row['id']);
    }

    return actions;
  }

  ngOnDestroy(): void {
    this.tableStructure.forEach((t) => t.destroy());
    if (this.subscriptionToFilter) {
      this.subscriptionToFilter.unsubscribe();
    }
  }

  manageCheckboxHeader(field: EafCheckboxField) {
    field.allSelected ? field.deselectAll() : field.selectAll();
    // if (this.data) {
    // 	this.data.forEach((res) => {
    // 		if (field.isSelected(res) !== field.allSelected) {
    // 				if(field.allSelected){
    // 					field.select(res);
    // 				}else{
    // 					field.deselect(res);
    // 				}
    // 		}
    // 	});
    // }
  }
}
