import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ActionItem, SearchResult, TooltipModel } from '@engular/base-models';
import { SearchBasePageComponent } from '@engular/base-page';
import {
  EafAbstractTableField,
  EafAccordionField,
  EafActionsField,
  EafCheckboxField,
  EafIconField,
  EafLinkField,
  EafRadioField,
  EafTableField,
  EafTableFieldTypeConstant,
  EafTemplateField,
} from '@webkit/layout';
import { delay, Observable, tap } from 'rxjs';
import { Utente } from '../../models/utente.model';
import { UtentiService } from '../../services/utenti.service';

@Component({
  selector: 'eaf-playground-table',
  templateUrl: './playground-table.component.html',
  styleUrls: ['./playground-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundTableComponent extends SearchBasePageComponent<Utente> {
  constructor(injector: Injector, protected utentiService: UtentiService, protected fb: UntypedFormBuilder) {
    super(injector);
  }

  interattivo = {
    dati: undefined,
    loading: false,
  };
  // criteria;

  tableAccordion: EafAbstractTableField[] = [];
  tableAccordion2: EafAbstractTableField[] = [];
  tableText: EafAbstractTableField[] = [];
  tableNumber: EafAbstractTableField[] = [];
  tableDate: EafAbstractTableField[] = [];
  tableActions: EafAbstractTableField[] = [];
  tableActionsToMuchAction: EafAbstractTableField[] = [];
  tableTemplates: EafAbstractTableField[] = [];
  tableWithRadioAndCheckBox: EafAbstractTableField[] = [];
  tableIcon: EafAbstractTableField[] = [];
  tooltip = new TooltipModel('Prova contenuto', undefined, 'Prova titolo');
  @ViewChild('templateExample', { static: true }) templateExample: any;
  override tableStructure: EafAbstractTableField[] = [];

  actionRefresh = new ActionItem(
    'Aggiorna',
    () => {
      this.refreshSearch();
    },
    'refresh'
  );
  singleAction = [this.actionRefresh];
  multiActionExample = [
    this.actionRefresh,
    new ActionItem(
      'Casa',
      () => {
        alert('hai cliccato icona home');
      },
      'home'
    ),
  ];
  radioField: EafRadioField;
  checkBoxField: EafCheckboxField;
  fewResult: any;
  options: any;
  checkBoxFieldPRIMO: EafCheckboxField;

  formArray: UntypedFormArray;

  tableForm: EafTableField[] = [];
  add = new ActionItem(
    'Aggiungi una riga',
    () => {
      this.formArray.push(this.fb.group({}));
    },
    'plus'
  );

  updateFilters = (value: any) => {
    this.criteria = { ...this.criteria, ...value };
  };

  defineFiltersCriteria(filters: any) {
    return filters;
  }
  getDefaultSortField(): string {
    return 'nome';
  }
  search(criteriaDto: any): Observable<SearchResult<Utente>> {
    return this.utentiService.find(criteriaDto).pipe(
      this.pageCache.length > 0 ? delay(1) : delay(3000),

      tap((result) => {
        this.fewResult = [result.content[0], result.content[1], result.content[2]];
      })
    );
  }

  pageName(): string {
    return 'PlaygroundTableResultComponent';
  }
  ngOnInitForChildren() {
    this.refreshSearch();
  }
  ngOnDestroyForChildren() {
    //not implemented
  }

  showAlertMessage(mex: any) {
    alert(mex);
  }

  defineTableStructure(structure: any) {
    this.defineTableStructureEditable();
    const openpdf = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        this.log.debug('click on action', a, item);
      },
      'file-pdf-o',
      undefined,
      undefined,
      true
    );
    const openfolder = new ActionItem(
      'BUTTON.FOLDER',

      (item, a) => {
        this.log.debug('click on action', a, item);
      },
      'folder'
    );
    // const times = new ActionItem(
    // 	'BUTTON.AAA',

    // 	(item, a) => {
    // 		this.log.debug('click on action', a, item);
    // 	},
    // 	'times',
    // );
    const archive = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        this.log.debug('click on action', a, item);
      },
      'archive'
    );
    const file = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        this.log.debug('click on action', a, item);
      },
      'file'
    );
    const bug = new ActionItem(
      'BUTTON.OPENPDF',

      (item, a) => {
        this.log.debug('click on action', a, item);
      },
      'bug'
    );

    this.checkBoxFieldPRIMO = new EafCheckboxField('', 'check2', []);
    this.checkBoxFieldPRIMO.getObservable().subscribe((elementoSelezionato) => {
      if (elementoSelezionato.type === 'selectAll') {
        this.selezionaTutto(this.checkBoxFieldPRIMO);
      }
      if (elementoSelezionato.type === 'delectAll') {
        this.checkBoxFieldPRIMO.selectedItems.length = 0;
        alert('deselezionali tutti sul componente');
      }
    });
    structure.push(this.checkBoxFieldPRIMO);
    this.newSearch.subscribe(() => {
      if (this.checkBoxFieldPRIMO.allSelected) {
        this.selezionaTutto(this.checkBoxFieldPRIMO);
      }
    });
    structure.push(
      new EafLinkField(
        'Text',
        'nome',
        (item) => {
          if (!item) {
            return '';
          }
          return `./${item.id}/edit`;
        },
        { tooltip: this.tooltip, filterable: true }
      )
    );

    structure.push(
      new EafTableField(EafTableFieldTypeConstant.DATE, 'Date', 'dataNascita', {
        filterable: true,
        sortable: true,
      })
    );
    structure.push(
      new EafTableField(EafTableFieldTypeConstant.NUMBER, 'Number', 'numero', {
        filterable: true,
      })
    );
    // structure.push(
    // 	new EafTableField(EafTableFieldTypeConstant.PROGRESS, 'Progress', 'progress'),
    // );
    structure.push(new EafTemplateField('Template', this.templateExample));
    structure.push(
      new EafActionsField('Action buttons', [openpdf, openfolder, archive, bug, file], () => {
        // if (b === openfolder) return true;
        return true;
      })
    );

    /**
     * TABLE TEXT
     */
    this.tableText.push(new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Name', 'nome'));
    this.tableText.push(new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Email', 'email'));

    this.tableAccordion = [...this.tableText];
    this.tableAccordion2 = [
      this.tableAccordion[0],
      new EafAccordionField((item) => item.id % 2 !== 0),
      this.tableAccordion[1],
    ];
    /**,
     * TABLE NUMBER
     */
    this.tableNumber.push(new EafTableField(EafTableFieldTypeConstant.NUMBER, 'Numero', 'numero'));
    this.tableNumber.push(new EafTableField(EafTableFieldTypeConstant.CURRENCY, 'Soldi', 'numero'));
    /**
     * TABLE DATE
     */
    this.tableDate.push(new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Birthday', 'dataNascita'));
    /**
     * TABLE ACTION
     */
    this.tableActionsToMuchAction.push(
      new EafActionsField('Action buttons', [openpdf, openfolder, archive, bug, file])
    );
    this.tableActions.push(
      new EafActionsField('Action buttons', [openpdf, openfolder, archive, bug, file], (model, action) => {
        if (model.id % 2 === 0 && (action === openfolder || action === openpdf)) {
          return false;
        }
        if (model.id % 2 === 1 && (action === archive || action === bug)) {
          return false;
        }
        return true;
      })
    );

    /**
     * TABLE TEMPLATE
     */
    this.tableTemplates.push(new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Name', 'nome'));
    this.tableTemplates.push(new EafActionsField('Action buttons', [openpdf, openfolder]));

    /**
     * TABLE ICON
     */
    this.tableIcon.push(
      new EafIconField('Icon', () => {
        return { icon: 'info', color: 'primary' };
      })
    );
    this.tableIcon.push(new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Name', 'nome'));
    this.tableIcon.push(
      new EafIconField('Icon', (item) => {
        if (item.id % 2 === 1) {
          return { icon: 'id-card', color: 'success' };
        } else {
          return { icon: 'exclamation-triangle', color: 'warning' };
        }
      })
    );

    /**
     * RADIO E CHECKBOX
     */
    this.radioField = new EafRadioField('Radio', 'nome', (a) => alert('hai scelto ' + a.nome + ' ' + a.cognome));

    //this.options = RadioOption.fromIdValueArray([{ id: 1, value: 'option' }]);
    this.checkBoxField = new EafCheckboxField('Checkbox', 'check', []);
    this.checkBoxField.getObservable().subscribe((elementoSelezionato) => {
      console.error('Elementi selezionato:', elementoSelezionato);
      alert('Elementi selezionati #' + this.checkBoxField.selectedItems.length);
    });
    const checkBoxField2 = new EafCheckboxField('', 'check2', []);
    checkBoxField2.getObservable().subscribe((elementoSelezionato) => {
      if (elementoSelezionato.type === 'selectAll') {
        alert('selezionali tutti sul componente');
      }
      if (elementoSelezionato.type === 'delectAll') {
        alert('deselezionali tutti sul componente');
      }
    });
    this.tableWithRadioAndCheckBox.push(
      checkBoxField2,
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Name', 'nome'),
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Cognome', 'cognome'),
      this.radioField,
      this.checkBoxField
    );

    return structure;
  }
  selezionaTutto(checkBoxFieldPRIMO: EafCheckboxField) {
    checkBoxFieldPRIMO.selectedItems.length = 0;
    this.pageCache.forEach((p) => {
      checkBoxFieldPRIMO.selectedItems.push(...p.content);
    });
  }

  defineTableStructureEditable() {
    const remove = new ActionItem(
      'Elimina riga',
      (item) => {
        console.error('ecc', this.formArray.controls.indexOf(item), item);
        this.formArray.removeAt(this.formArray.controls.indexOf(item));
      },
      'trash'
    );
    this.formArray = this.fb.array([]);
    this.tableForm.push(new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Name', 'nome'));
    this.tableForm.push(
      new EafTableField(EafTableFieldTypeConstant.DATE, 'Date', 'dataNascita', {
        filterable: true,
        sortable: true,
      })
    );
    this.tableForm.push(new EafTemplateField('Template', this.templateExample));
    this.tableForm.push(new EafActionsField('Action buttons', [remove]));
  }

  checkHighlightYeah(model: any) {
    //[todo]
    console.log('da ottimizzare');
    if (model.nome === 'Aaron') {
      return true;
    }
    return false;
  }
}
