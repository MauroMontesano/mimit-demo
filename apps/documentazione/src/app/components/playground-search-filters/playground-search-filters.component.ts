import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  ActionItem,
  CheckboxOption,
  FilterBase,
  FilterCheckbox,
  FilterDate,
  FilterDoubleDate,
  FilterLineBreak,
  FilterNumber,
  FilterNumberInterval,
  FilterRadio,
  FilterSelect,
  FilterSingleCheckbox,
  FilterText,
  FilterTypeConstants,
  RadioOption,
  TooltipModel,
} from '@engular/base-models';
// import { ComboBoxOption, FilterAutocomplete } from '@engular/forms-autocomplete';
import { ErrorLabelConstants } from '@engular/forms-errors';
import { ModalComponent } from '@webkit/layout';

@Component({
  selector: 'eaf-playground-search-filters',
  templateUrl: './playground-search-filters.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundSearchFiltersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  @ViewChild('filterModal') filterModal: ModalComponent;
  options: any[] = [];
  multiOptions: any[] = [];
  checkBoxOptions: CheckboxOption[] = [];
  radioOptions: RadioOption[] = [];
  filters: FilterBase[] = [];
  filtersForConfig: FilterBase[] = [];
  headerActions: ActionItem[];

  FILTER_TYPE_CONSTANT = FilterTypeConstants;

  ngOnInit() {
    this.defineCheckBoxOptions();
    this.defineRadioOptions();
    this.options = this.defineOptions();
    this.multiOptions = this.defineMultiOptions();
    this.defineFiltersCriteria(this.filters);
  }

  defineCheckBoxOptions() {
    this.checkBoxOptions.push(new CheckboxOption('first option label', 1));
    this.checkBoxOptions.push(new CheckboxOption('second option label', 2));
    this.checkBoxOptions.push(new CheckboxOption('third option label', 3));
  }

  defineRadioOptions() {
    this.radioOptions.push(new CheckboxOption('first radio option', 1));
    this.radioOptions.push(new CheckboxOption('second radio option', 2));
    this.radioOptions.push(new CheckboxOption('third radio option', 3));
  }

  defineOptions() {
    const options = [];

    options.push({ id: 'firstId', descrizione: 'firstValue' });
    options.push({ id: 'secondId', descrizione: 'secondValue' });
    options.push({ id: 'thirdId', descrizione: 'thirdValue' });

    return options;
  }

  defineMultiOptions() {
    const options = [];
    options.push({ id: 'firstMultiId', descrizione: 'firstMultiValue' });
    options.push({ id: 'secondMultiId', descrizione: 'secondMultiValue' });
    options.push({ id: 'thirdMultiId', descrizione: 'thirdMultiValue' });
    options.push({ id: 'fourthMultiId', descrizione: 'fourthMultiValue' });
    options.push({ id: 'fifthMultiId', descrizione: 'fifthMultiValue' });
    options.push({ id: 'sixthMultiId', descrizione: 'sixthMultiValue' });
    return options;
  }

  defineFiltersCriteria(filters: FilterBase[]): FilterBase[] {
    const b = new FilterText('FILTER.Text', 'nome', {
      size: '12|4|4|4',
      tooltip: undefined,
      validators: [Validators.required, Validators.maxLength(5)],
      errorMessageLabel: [ErrorLabelConstants.REQUIRED, ErrorLabelConstants.MAX_LENGTH(5)],
      placeholder: 'Filtertext di prova',
    });
    // text input
    filters.push(b);

    const select = new FilterSelect('FILTER.Drop-Down', 'campo1', [], 'id', 'descrizione', {
      size: '12|4|4|4',
    });
    // single select input
    filters.push(select);

    setTimeout(() => {
      select.optionsList = this.options;
    }, 5000);
    // filterable select input
    const a = new FilterSelect('FILTER.Filterable.Drop-Down', 'campo2', this.options, 'id', 'descrizione', {
      size: '12|4|4|4',
      filterable: true,
    });
    a.disabled = true;
    filters.push(a);

    // multi filterable select input
    filters.push(
      new FilterSelect('FILTER.Multi.Filterable.Drop-Down', 'campo3', this.multiOptions, 'id', 'descrizione', {
        size: '12|4|4|4',
        multi: true,
        filterable: true,
      })
    );
    // date input
    filters.push(
      new FilterDate('FILTER.Date', 'dataNascita', {
        size: '12|4|4|4',
        tooltip: new TooltipModel('Input date'),
        placeholder: 'Date filter di prova',
      })
    );
    // date range input
    filters.push(
      new FilterDoubleDate('FILTER.Date-Interval', 'ddate', 'INPUT.DDATE.FROM', 'INPUT.DDATE.TO', {
        size: '12|12|12|8',
        tooltip: undefined,
        validators: undefined,
        errorMessageLabel: [ErrorLabelConstants.REQUIRED],
      })
    );

    // number interval input
    filters.push(
      new FilterNumberInterval(
        'FILTER.NumberInterval',
        'numberinterval',
        'INPUT.NUMINTVAL.FROM',
        'INPUT.NUMINTVAL.TO',
        {
          size: '12|12|12|8',
          placeholder: 'Number input di prova',
        }
      )
    );

    // linebreak
    filters.push(new FilterLineBreak({ size: '4|4|4|4' }));

    // multi checkbox
    filters.push(
      new FilterCheckbox(
        'INPUT.MultiCheckbox',
        'checkbox',
        'label',
        this.checkBoxOptions,
        // CheckboxOption.fromIdValueArray([{ id: 1, value: 'First' }, { id: 2, value: 'Second' }]),
        // 'value',
        {
          size: '6|4|4|4',
        }
      )
    );

    // radio
    filters.push(
      new FilterRadio(
        'INPUT.Radio',
        'radio',
        'label',
        this.radioOptions,
        // CheckboxOption.fromIdValueArray([{ id: 1, value: 'First' }, { id: 2, value: 'Second' }]),
        // 'value',
        {
          size: '6|4|4|4',
        }
      )
    );

    filters.push(
      new FilterSingleCheckbox(
        'INPUT.SingleCheckbox',
        'single-option-checkbox',
        // 'yes',
        // 'value no',
        {
          size: '12|6|6|4',
          // checkedValue: 'true',
          // uncheckedValue: 'false'
        }
      )
    );

    // filters.push(new FilterTemplate('templateValue', this.templateFilter, this.templateControl));
    // const c = new FilterAutocomplete('Combobox', 'combo', this.chiamataRemota, undefined, {
    // 	size: '12|6|6|4',
    // 	tooltip: undefined,
    // 	validators: undefined,
    // 	errorMessageLabel: undefined,
    // 	fieldForLabel: 'descrizione',
    // 	placeholder: 'prova',
    // });

    // filters.push(c);
    // c.setPayload({
    // 	id: 7,
    // 	numeroDoc: 50930,
    // 	descrizione: 'blanditiis',
    // });
    /*
		this.filterSpace.push(
			new FilterText(
				'Name',
				'nome',
				'6|4|4',
				undefined,
				[EngRequired, Validators.maxLength(5)],
				[ErrorLabelConstants.REQUIRED, ErrorLabelConstants.MAX_LENGTH(5)],
			),
		);
		this.filterSpace.push(new FilterSpace('12|6|4'));
		this.filterSpace.push(
			new FilterText(
				'Surname',
				'cognome',
				'6|4|4',
				undefined,
				[EngRequired, Validators.maxLength(5)],
				[ErrorLabelConstants.REQUIRED, ErrorLabelConstants.MAX_LENGTH(5)],
			),
		);
		this.filterSpace.push(
			new FilterSelect(
				'FILTER.Drop-Down',
				'country',
				[{ code: 'SER', name: 'Serbia' }, { code: 'IT', name: 'Italy' }],
				'name',
				'name',
				'12|4|4',
			),
		);
		this.filterSpace.push(
			new FilterDate('FILTER.Date', 'dataNascita', '12|4|4', new TooltipModel('Input date')),
		);

		this.filterBreak.push(
			new FilterText(
				'Name',
				'nome',
				'12|4|4',
				undefined,
				[EngRequired, Validators.maxLength(5)],
				[ErrorLabelConstants.REQUIRED, ErrorLabelConstants.MAX_LENGTH(5)],
			),
		);
		this.filterBreak.push(new FilterLineBreak());
		this.filterBreak.push(
			new FilterText(
				'Surname',
				'cognome',
				'12|4|4',
				undefined,
				[EngRequired, Validators.maxLength(5)],
				[ErrorLabelConstants.REQUIRED, ErrorLabelConstants.MAX_LENGTH(5)],
			),
		);
		this.filterBreak.push(
			new FilterSelect(
				'FILTER.Drop-Down',
				'country',
				[{ code: 'SER', name: 'Serbia' }, { code: 'IT', name: 'Italy' }],
				'name',
				'name',
				'12|4|4',
			),
		);

		this.filterBreak.push(
			new FilterDate('FILTER.Date', 'dataNascita', '12|4|4', new TooltipModel('Input date')),
		); */

    // filters.push(new FilterSpace('12|6|6'));
    // filters.push(new FilterLineBreak());

    /**EXTRA */

    filters.push(
      new FilterDate('Extra1', 'Extra1', {
        size: '12|4|4|4',
        // tooltip: new TooltipModel('Input date'),
        validators: undefined,
        errorMessageLabel: undefined,
        advancedFilter: true,
        // true,
      })
    );
    filters.push(
      new FilterSelect(
        'Extra2',
        'Extra2',
        [
          { code: 'SER', name: 'Serbia' },
          { code: 'IT', name: 'Italy' },
        ],
        'name',
        'name',
        {
          size: '12|4|4|4',
          tooltip: undefined,
          validators: undefined,
          errorMessageLabel: undefined,
          advancedFilter: true,
          // true,
        }
      )
    );
    filters.push(
      new FilterDoubleDate('Extra3', 'Extra3', 'INPUT.DDATE.FROM', 'INPUT.DDATE.TO', {
        size: '12|12|12|8',
        tooltip: undefined,
        validators: undefined,
        errorMessageLabel: undefined,
        advancedFilter: true,
        // true,
      })
    );
    filters.push(
      new FilterNumberInterval('Extra4', 'Extra4', 'INPUT.DDATE.FROM', 'INPUT.DDATE.TO', {
        size: '12|12|12|8',
        tooltip: undefined,
        validators: undefined,
        errorMessageLabel: undefined,
        advancedFilter: true,
        // true,
      })
    );
    filters.push(
      new FilterNumber('numero', 'numero', {
        size: '12|12|12|8',
        tooltip: undefined,
        validators: undefined,
        errorMessageLabel: undefined,
        advancedFilter: false,
        // true,
      })
    );
    // filters.forEach((f)=>{
    // 	f.disabled = true;
    // })
    return filters;
  }

  refreshSearch(event: any) {
    console.log('refresh', event);
  }

  resetSearch(event: any) {
    console.log('reset', event);
  }

  // chiamataRemota = (key: string) : Observable<ComboBoxOption[]> => {
  // 	let url = 'http://localhost:3000/tipologia?size=10';
  // 	if (key) {
  // 		url += '&descrizione=' + key;
  // 	}
  // 	return this.http.post(url, undefined).pipe(
  // 		delay(1000),
  // 		map((response) => {
  // 			console.error('response', response);
  // 			return response['content'].map((res: ComboBoxOption) => {
  // 				return {
  // 					label: res['descrizione'],
  // 					value: res,
  // 				};
  // 			});
  // 		}),
  // 	);
  // }

  onSearch(): void {
    const payload = {};
    this.filters.map((filter) => {
      if (filter.payload) {
        payload[filter.dtoField] = filter.payload;
      }
    });
    console.log(payload, this.buildCriteriaDto());
  }

  buildCriteriaDto(): any {
    let criteria = {};
    this.filters.forEach((filter) => {
      if (!filter.disabled && filter.payload !== undefined && filter.payload !== null && filter.payload !== '') {
        // create condition to check the type of filter if date or not
        switch (filter.type) {
          case this.FILTER_TYPE_CONSTANT.TEXT:
            criteria[filter.dtoField] = filter.payload;
            break;

          case this.FILTER_TYPE_CONSTANT.SELECT:
            criteria[filter.dtoField] = filter.payload;
            break;
          case this.FILTER_TYPE_CONSTANT.DATE_INTERVAL:
            criteria[filter.dtoField + 'From'] = filter.payload.from != null ? filter.payload.from.toDTO() : null;
            criteria[filter.dtoField + 'To'] = filter.payload.to != null ? filter.payload.to.toDTO() : null;
            break;
          case this.FILTER_TYPE_CONSTANT.DATE:
            criteria[filter.dtoField] = filter.payload ? filter.payload.toDTO() : null;
            break;
          case this.FILTER_TYPE_CONSTANT.NUMBER_INTERVAL:
            criteria[filter.dtoField + 'From'] = filter.payload.from;
            criteria[filter.dtoField + 'To'] = filter.payload.to;
            break;
          default:
            criteria[filter.dtoField] = filter.payload;
        }
      }
    });

    criteria = JSON.parse(JSON.stringify(criteria).replace(/"_/g, '"'));
    return criteria;
  }
}
