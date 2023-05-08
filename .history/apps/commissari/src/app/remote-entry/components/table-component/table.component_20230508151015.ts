import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AbstractTableField, ActionItem, FilterBase, SearchResult } from '@engular/base-models';
import { EafSearchBasePageComponent } from '@webkit/base-pages';
import { EafAbstractTableField, EafActionsField, EafTableField, EafTableFieldTypeConstant } from '@webkit/layout';
import { Observable } from 'rxjs';
import { CommissarioModel } from '../../models/commissario.model';
import { CommissariMock } from '../../services/commissario.mock';
import { CommissarioService } from '../../services/commissario.service';

@Component({
  selector: 'mimit-table',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent extends EafSearchBasePageComponent<CommissarioModel> {
  table: EafAbstractTableField[] = [];
  data = CommissariMock;
  dettaglio = new ActionItem(
    'dettaglio',
    () => {
      return;
    },
    'eye'
  );
  modifica = new ActionItem(
    'modifica',
    () => {
      return;
    },
    'eye'
  );
  scheda = new ActionItem(
    'scheda',
    () => {
      return;
    },
    'eye'
  );
  scarica = new ActionItem(
    'scarica',
    () => {
      return;
    },
    'download'
  );
  constructor(injector: Injector, private commissarioService: CommissarioService) {
    super(injector);
  }
  override defineTableStructure(structure: AbstractTableField[]): AbstractTableField[] {
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Nome', 'nome', {
        sortDtoField: 'nome',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Cognome', 'cognome', {
        sortDtoField: 'cognome',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Codice Fiscale', 'codiceFiscale', {
        sortDtoField: 'codiceFiscale',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'PEC', 'PEC', {
        sortDtoField: 'PEC',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Domicilio professionale', 'domicilioProfessionale', {
        sortDtoField: 'domicilioProfessionale',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Ordine professionale', 'ordineProfessionale', {
        sortDtoField: 'ordineProfessionale',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Numero Incarichi', 'numeroIncarichi', {
        sortDtoField: 'numeroIncarichi',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Livello esperienza', 'livelloEsperienza', {
        sortDtoField: 'livelloEsperienza',
      })
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Idoneità', 'idoneita', {
        sortDtoField: 'idoneita',
      })
    );

    this.table.push(new EafActionsField('', [this.dettaglio, this.modifica, this.scheda, this.scarica]));

    return this.table;
  }
  override defineFiltersCriteria(filters: FilterBase[]): FilterBase[] {
    return filters;
  }
  override getDefaultSortField(): string {
    return 'filters';
  }
  override search(criteriaDto: any): Observable<SearchResult<CommissarioModel>> {
    return this.commissarioService.find(criteriaDto);
  }
  override pageName(): string {
    return 'eaf-table-component';
  }
  override ngOnInitForChildren(): void {
    // non faccio nulla
  }
  override ngOnDestroyForChildren(): void {
    // non faccio nulla
  }
}
