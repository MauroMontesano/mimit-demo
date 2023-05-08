import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActionItem, ErrorLabel, FilterBase } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { EafMessageService } from '@webkit/shared';
import { debounceTime, tap } from 'rxjs/operators';
import { ModalComponent } from '../../modal/modal.component';
import { FilterPrefences } from '../model/filter-preferences';
import { FilterMangerService } from '../services/filter-manger.service';
import { EafFilterTypeConstants } from './../../table/consts/eaf-filter-type.const';
@Component({
  selector: 'eaf-filter-preferences',
  templateUrl: './filter-preferences.component.html',
  styleUrls: ['./filter-preferences.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterPreferencesComponent implements OnInit {
  constructor(
    protected fb: UntypedFormBuilder,
    protected filterManager: FilterMangerService,
    protected messageService: EafMessageService // protected configurationService: EafConfigurationService, //protected permissionService: PermissionService
  ) {}

  @Input() managePreferenceKey: any;

  @Input() filters: FilterBase[];
  @Input() criteriaForm: UntypedFormGroup;

  @ViewChild('confirmationModal')
  confirmationModal: ModalComponent;

  permissionPredefinito: any;
  canSetPermissionPredefinito: any;
  /**
   * list of preferences
   */
  filterPreferences: { salvati: FilterPrefences[]; predefiniti: FilterPrefences[] };
  /**
   * form to manage preferences
   */
  filterPreferenceForm: EafForm;

  /**
   * message error for preferences
   */
  filterPreferencesFormErrorMessages = [
    new ErrorLabel((control) => {
      return control.hasError('nameUsed');
    }, 'ERROR.PREFERENCE_NAME_USED'),
  ];

  /**
   * To manage the dropdown to save new preference
   */
  showSaveNewPreference = false;

  /**
   * action that activate the dropdown
   */
  showSaveNewPreferenceAction = new ActionItem(
    'Salva filtri',
    () => {
      if (this.loadingSaveFilter) {
        return;
      }
      this.showSaveNewPreference = !this.showSaveNewPreference;
      if (!this.showSaveNewPreference) {
        this.showSaveNewPreferenceAction.icon = 'plus';
      } else {
        this.showSaveNewPreferenceAction.icon = 'chevron-up';
      }
    },
    'plus',
    'PRIMARY'
  );

  /**
   * action that save preference
   */
  saveNewPreferenceAction = new ActionItem(
    'Salva',
    () => {
      this.saveNewPreference();
    },
    'save fas',
    'PRIMARY'
  );

  /**
   * action that delete preference
   */
  deletePreferenceAction = new ActionItem(
    'Elimina',
    () => {
      this.confirmationModal.open();
    },
    'times',
    'PRIMARY'
  );

  /**
   * Manage the loading of operation beetween BE
   */
  loadingSaveFilter = false;

  saveLoading = false;
  deleteLoading = false;

  idRandom = 'EafFilterTypeConstants' + Math.round(Math.random() * 1000);

  isDuplicate: 'preset' | boolean;
  trovato: FilterPrefences[] = [];

  ngOnInit() {
    this.managePreferenceKey = this.managePreferenceKey || '' + window.location.href;
    this.permissionPredefinito = 'chiedi ad ale'; //this.configurationService.get('webkit.abilitazioniMapping.ricerca.predefiniti');
    this.canSetPermissionPredefinito = true; //this.permissionService.hasPermissions(this.permissionPredefinito);
    this.filterManager.loadPreferences(this.managePreferenceKey).subscribe(
      (response) => {
        this.filterPreferences = { salvati: [], predefiniti: [] };
        response.forEach((f) => {
          if (f.preset) {
            this.filterPreferences.predefiniti.push(f);
          } else {
            this.filterPreferences.salvati.push(f);
          }
        });
      },
      (error) => {
        this.messageService.error('Problemi a caricare la lista delle ricerche prefedefinite');
        console.error('Errore caricamento ricerche predefinite', error);
      }
    );

    this.filterPreferenceForm = new EafForm(
      this.fb.group({
        activePreference: [],
        preferenceName: ['', [Validators.required]],
        isPreset: [],
        rewrite: [],
      })
    );

    this.filterPreferenceForm
      .getFormControl('activePreference')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => this.loadPreference(value));
    this.filterPreferenceForm
      .getFormControl('preferenceName')
      .valueChanges.pipe(
        tap(() => {
          this.saveLoading = true;
        }),
        debounceTime(300)
      )
      .subscribe((value) => {
        this.validatePreferencesName(value);
        this.saveLoading = false;
      });
  }

  deletePreference() {
    this.deleteLoading = true;

    this.filterManager
      .deletePreference(this.managePreferenceKey, this.filterPreferenceForm.getFormControl('activePreference').value)
      .subscribe(
        (okay) => {
          const name = this.filterPreferenceForm.getFormControl('activePreference').value.name;
          //notify yser
          this.messageService.success(`Preferenza "${name}" eliminata`);
          //disable loading
          this.deleteLoading = false;

          this.filterPreferences.salvati = this.filterPreferences.salvati.filter((f) => f.name !== name);
          this.filterPreferences.predefiniti = this.filterPreferences.predefiniti.filter((f) => f.name !== name);
          this.updateSelect();

          this.filterPreferenceForm.getFormControl('activePreference').reset();
        },
        (err) => {
          this.messageService.error('Erorre durante il salvataggio della ricerca');
          console.error('Errore durante il salvataggio della ricerche predefinite', err);
          this.deleteLoading = false;
        }
      );
  }
  updateSelect() {
    this.filterPreferences = {
      salvati: this.filterPreferences.salvati,
      predefiniti: this.filterPreferences.predefiniti,
    };
  }

  /**
   * Save a new search preference
   */
  saveNewPreference() {
    this.loadingSaveFilter = true;
    const name = this.filterPreferenceForm.getFormControl('preferenceName').value;
    const isPreset = this.filterPreferenceForm.getFormControl('isPreset').value;
    const isRewrite = this.filterPreferenceForm.getFormControl('rewrite').value;
    const filterInfo: FilterBase[] = [];
    this.filters.forEach((f) => {
      filterInfo.push(this.convertToJson(f));
    });

    this.filterManager
      .addPreference(
        this.managePreferenceKey,
        name,
        filterInfo,
        !!isPreset,
        isRewrite,
        this.trovato.length > 0 ? this.trovato[0].id : undefined
      )
      .subscribe(
        (okay) => {
          //notify yser
          this.messageService.success(`Preferenza "${name}" salvata`);
          //disable loading
          this.loadingSaveFilter = false;

          //reset the form
          this.filterPreferenceForm.form.reset();
          this.showSaveNewPreferenceAction.action(undefined, undefined);
          let tmp: FilterPrefences[] = [];
          //set the value to the select

          this.filterPreferences.predefiniti.forEach((e) => {
            if (e.name !== okay.name) {
              tmp.push(e);
            }
          });
          this.filterPreferences.predefiniti = tmp;
          tmp = [];
          this.filterPreferences.salvati.forEach((e) => {
            if (e.name !== okay.name) {
              tmp.push(e);
            }
          });
          this.filterPreferences.salvati = tmp;

          if (okay.preset) {
            this.filterPreferences.predefiniti.push(okay);
          } else {
            this.filterPreferences.salvati.push(okay);
          }
          this.updateSelect();
          this.filterPreferenceForm.getFormControl('activePreference').setValue(okay);
        },
        (err) => {
          this.messageService.error('Erorre durante il salvataggio della ricerca');
          console.error('Errore durante il salvataggio della ricerche predefinite', err);
          this.loadingSaveFilter = false;
        }
      );
  }
  convertToJson(f: FilterBase): any {
    let payload = f['_payload'];
    if (payload) {
      switch (f.type) {
        case EafFilterTypeConstants.DATE:
          payload = f['_payload'].toDTO();
          break;
        case EafFilterTypeConstants.DATE_INTERVAL:
          payload = {};
          if (f['_payload'].to) {
            payload['to'] = f['_payload'].to.toDTO();
          }
          if (f['_payload'].from) {
            payload['from'] = f['_payload'].from.toDTO();
          }

          break;
      }
    }
    return {
      dtoField: f['_dtoField'],
      payload: payload,
      advancedFilter: f['_advancedFilter'],
    };
  }

  loadPreference(pref: FilterPrefences) {
    if (!pref) {
      return;
    }
    pref.filterStatus.forEach((f) => {
      const option = this.filters.find((tofind) => tofind.dtoField === f['dtoField']);
      if (option) {
        option.setPayload(f['payload']);
        option.advancedFilter = f['advancedFilter'];
      }
      const gf = this.criteriaForm.get(f['dtoField']);
      if (gf) {
        gf.setValue(f['payload']);
      }
    });
    this.filters.sort((a, b) => {
      return (
        pref.filterStatus.findIndex((f) => {
          return f.dtoField === a.dtoField;
        }) -
        pref.filterStatus.findIndex((f) => {
          return f.dtoField === b.dtoField;
        })
      );
    });
  }

  validatePreferencesName(value: string | undefined) {
    value = value ? value.trim() : undefined;
    this.trovato = [];
    this.trovato = this.filterPreferences.salvati.filter((p) => p.name === value);

    if (this.trovato.length === 0) {
      this.trovato = this.filterPreferences.predefiniti.filter((p) => p.name === value);
    }
    if (this.trovato.length > 0 && value) {
      this.isDuplicate = this.trovato[0].preset ? 'preset' : true;
      this.filterPreferenceForm.getFormControl('isPreset').setValue(this.trovato[0].preset);
    } else {
      this.isDuplicate = false;
      this.filterPreferenceForm.getFormControl('isPreset').setValue(false);
    }
  }
  reset() {
    this.filterPreferenceForm.getFormControl('activePreference').reset();
  }
  onCancelConfirmation() {
    //non faccio nulla
  }
}
