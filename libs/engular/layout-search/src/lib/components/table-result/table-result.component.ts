import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractTableField, ActionItem, ActionsField, BaseModel } from '@engular/base-models';

export interface ActionsStatus {
	visible: ActionItem[];
	drop: ActionItem[];
	hidden: ActionItem[];
}
// @Component({
// 	selector: 'eng-table-result',
// 	templateUrl: './table-result.component.html',
// 	styleUrls: ['./table-result.component.scss'],
// 	encapsulation: ViewEncapsulation.None,
// })
@Component({
	template: ''
  })
export abstract class TableResultComponent implements OnInit {
	@Input('data')
	set manageResultInput(data: any[]) {
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
	set totalPages(num: number) {
		this.pageActive = 1;
		this._totalPage = num;
		this.calculatePageNumberToShow(1, 10);
	}

	optionsList: any[];

	@Input()
	maxAction = 4;

	@Input()
	id = 'tableResult' + Math.round(Math.random() * 1000);

	@Input()
	accordion: any;

	@Input()
	accordionItem: BaseModel|undefined;

	@Input()
	noResultMessage = 'MESSAGE.NO_ELEMENTS_FOUND';
	data:any[] = [];

	@Input()
	showPageSize = true;

	@Input()
	showActions = true;

	@Input()
	isHighlighted: (model: any) => boolean;

	_totalPageSlice:any[] = [];
	_totalPage: number;

	private actionMap: { [key: string]: ActionsStatus };
	_pageActive = 1;

	@Input()
	loading = false;

	@Input('structure')
	tableStructure: AbstractTableField[] = [];

	@Input()
	title: string;

	@Input()
	description: string;

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
	actions: ActionsField;

	@Input()
	topbarActions: ActionItem[];

	@Input()
	topbarTemplate: ElementRef;

	/**
	 * Indicate if table it's sort desc or not
	 */
	isDesc = false;

	/**
	 * column name sorted
	 */
	sortColumn: string;

	pageSizeSelected = 10;

	changePage(pageNumber: number) {
		this.pageActive = pageNumber;
		this._onPageChanged.emit(pageNumber);
	}

	changeSort(title: string) {
		if (this.sortColumn !== title) {
			this.isDesc = true;
			this.sortColumn = title;
		} else {
			this.isDesc = this.isDesc ? false : true;
		}

		this._onSortChange.emit(title);
	}

	changePageElementsShowed(pageSizeNumber: number) {
		this._onPageSizeChange.emit(pageSizeNumber);
	}

	calculatePageNumberToShow(actualPage: number, pageToShow: number) {
		this._totalPageSlice = [];
		let start = actualPage - Math.round(pageToShow / 2);
		start = start >= 1 ? start : 1;
		let end = start + pageToShow - 1;
		end = end <= this._totalPage ? end : this._totalPage;

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
	onChange(newValue:any) {
		this.changePageElementsShowed(newValue);
		this.pageSizeSelected = newValue;
	}

	ngOnInit() {
		//if action itsn't definete input i will check if there are in table definiton
		if (!this.actions) {
			this.tableStructure.forEach((field) => {
				if (field.fieldType === 'ACTIONS') {
					this.actions = field as ActionsField;
				}
			});
		}

		this.optionsList = [
			{ id: 1, value: 10 },
			{ id: 2, value: 25 },
			{ id: 3, value: 50 },
			{ id: 4, value: 100 },
		];
	}

	getActionForRow(row: BaseModel, actionsField: ActionsField) {
		let actions = this.actionMap[row.id];

		if (!actions) {
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
}
