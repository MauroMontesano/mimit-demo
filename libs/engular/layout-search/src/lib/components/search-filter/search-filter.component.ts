import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FilterBase, FilterSpace, FilterTemplate, FilterTypeConstants } from '@engular/base-models';
import { ErrorLabelConstants } from '@engular/forms-errors';
@Component({
  template: '',
})
export abstract class SearchFilterComponent implements OnInit {
  FILTER_TYPE_CONSTANT = FilterTypeConstants;
  form: UntypedFormGroup;
  errorLabels: any = {};

  @Input()
  filters: FilterBase[];

  idRandom = 'SearchFilterComponent' + Math.round(Math.random() * 1000);

  @Output()
  searching = new EventEmitter<boolean>();
  @Output()
  resetting = new EventEmitter<boolean>();

  withAdvancedFilter = false;
  /**
	 *  Use to extend the basic value change strategy for new field o few standard field.
	 *  if you want manage from scrath all behavior overrride manageValueChange mehtod at all
	 * example:
	 * switch (filter.type) {
			case this.FILTER_TYPE_CONSTANT.INPUT_COMBOBOX:
				if (filter['fieldForId']) {
					filter.setPayload(value[filter['fieldForId']]);
				} else {
					filter.setPayload(value);
				}
				return true;

			default:
				return false;
		}
	 * @return if return true the standard behavior will be skipped
	 */
  protected abstract manageValueChangeExtension(filter: FilterBase, value: any): boolean;

  constructor(protected fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    const group = {};

    this.filters.forEach((filter) => {
      if (filter.advancedFilter) {
        this.withAdvancedFilter = true;
      }
      let subscribeOnValueChage = true;
      if (filter instanceof FilterSpace || filter.type === this.FILTER_TYPE_CONSTANT.LINEBREAK) {
        subscribeOnValueChage = false;
        // skip form creation
      } else if (filter instanceof FilterTemplate) {
        group[filter.dtoField] = filter.control;
      } else {
        group[filter.dtoField] = this.fb.control(filter.payload, filter.validators);
        group[filter.dtoField].valueChanges.subscribe((value: any) => {
          this.manageValueChange(filter, value);
        });
      }
      if (subscribeOnValueChage) {
        group[filter.dtoField].valueChanges.subscribe((value: any) => {
          this.manageValueChange(filter, value);
        });
      }
    });

    this.form = this.fb.group(group);
    this.defineUserErrorForCommonFilterError();
  }

  protected manageValueChange(filter: FilterBase, value: any) {
    //if (!value || '' === value) {
    if ((value === undefined && value === null) || '' === value) {
      filter.reset();
      return;
    }

    if (!this.manageValueChangeExtension(filter, value)) {
      filter.setPayload(value);
    }
  }

  search() {
    this.searching.emit(true);
  }

  reset() {
    this.form.reset();
    this.resetting.emit(true);
  }

  defineUserErrorForCommonFilterError(): any {
    this.errorLabels = {};
    this.errorLabels[this.FILTER_TYPE_CONSTANT.DATE_INTERVAL] = [
      ErrorLabelConstants.DATE_LESS_OR_EQUAL_THAN('da', 'a'),
    ];
    this.errorLabels[this.FILTER_TYPE_CONSTANT.TEXT] = [ErrorLabelConstants.REQUIRED];
  }
}
