import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionItem, FilterBase } from '@engular/base-models';
import { SearchFilterComponent } from '@engular/layout-search';
import { ModalComponent } from '../../modal/modal.component';
import { FilterConfigComponent } from '../filter-config/filter-config.component';
import { FilterPreferencesComponent } from '../filter-preferences/filter-preferences.component';

@Component({
  selector: 'eaf-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersComponent extends SearchFilterComponent implements OnInit {
  constructor(fb: UntypedFormBuilder, private activedRoute: ActivatedRoute) {
    super(fb);
  }

  @ViewChild('filterModal') filterModal: ModalComponent;
  @ViewChild('preferenceComponent') preferenceComponenet: FilterPreferencesComponent;
  @ViewChild('sportFilter') filterConfig: FilterConfigComponent;

  @Input() showAdvancedFilter: boolean;
  @Input() title = 'Ricerca';
  @Input() headerActions: ActionItem[] = [];
  @Input() actions: ActionItem[];
  @Input() configurable = false;
  @Input() managePreference = true;
  @Input() managePreferenceKey: any;
  @Input() buttonName = 'BUTTON.SEARCH';
  @Input() preferences = true;

  filtersForConfig: FilterBase[];

  @Input()
  isPanelOpen = true;

  configurationModalActions = [
    new ActionItem(
      'BUTTON.CANCEL',
      () => {
        this.filterModal.close();
      },
      undefined,
      'SECONDARY'
    ),
    new ActionItem(
      'BUTTON.SAVE',
      () => {
        this.filterConfig.saveFields();
      },
      undefined,
      'PRIMARY'
    ),
  ];

  getFormErrors(form: AbstractControl) {
    if (form instanceof UntypedFormControl) {
      // Return FormControl errors or null
      return form.errors ?? null;
    }
    if (form instanceof UntypedFormGroup) {
      const groupErrors = form.errors;
      // Form group can contain errors itself, in that case add'em
      const formErrors = groupErrors ? { groupErrors } : {};
      Object.keys(form.controls).forEach((key) => {
        // Recursive call of the FormGroup fields
        const f = form.get(key);
        if (f) {
          const error = this.getFormErrors(f);
          if (error !== null) {
            // Only add error if not null
            formErrors[key] = error;
          }
        }
      });
      // Return FormGroup errors or null
      return Object.keys(formErrors).length > 0 ? formErrors : null;
    }
    return null;
  }

  onCheckFormError() {
    console.log(this.getFormErrors(this.form));
  }

  override ngOnInit() {
    super.ngOnInit();
    this.isPanelOpen = this.activedRoute.snapshot.queryParamMap.get('open') === 'false' ? false : true;
    if (this.managePreference) {
      this.managePreferenceKey = this.managePreferenceKey || '' + window.location.href;
    }
    this.initActions();
    this.initFiltersForConfig();
  }

  manageValueChangeExtension(): boolean {
    return !!null;
  }

  toggleAdvancedFilter() {
    this.showAdvancedFilter = !this.showAdvancedFilter;
  }

  initActions() {
    if (this.configurable) {
      this.headerActions = this.headerActions || [];
      this.headerActions.push(
        new ActionItem(
          'BUTTON.OPEN_FILTER_CONFIGURATION',
          () => {
            this.openModal();
          },
          'cog'
        )
      );
    }
  }

  initFiltersForConfig() {
    this.filtersForConfig = [...this.filters];
  }

  onFilterConfigSave(filters: FilterBase[]) {
    this.filters = filters;
    this.filterModal.close();
  }

  onFilterConfigClose() {
    this.initFiltersForConfig();
  }

  openModal(): void {
    this.filterModal.open();
  }

  override reset() {
    if (this.preferences) {
      this.preferenceComponenet.reset();
    }
    super.reset();
  }

  getFormControl(path: Array<string | number> | string): UntypedFormControl {
    const control = this.form.get(path);
    if (control && control instanceof UntypedFormControl) {
      return control as UntypedFormControl;
    }
    throw new Error('Non esiste un form control con il nome ' + path);
  }

  getFormGroup(path: Array<string | number> | string): UntypedFormGroup {
    const control = this.form.get(path);
    if (control && control instanceof UntypedFormGroup) {
      return control as UntypedFormGroup;
    }
    throw new Error('Non esiste un form group con il nome ' + path);
  }
}
