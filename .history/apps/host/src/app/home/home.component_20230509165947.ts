import { Component } from '@angular/core';
import { TabModel, TabsManagerService } from '@mimit/core';
import {
  EafAbstractTableField,
  EafTableField,
  EafTableFieldTypeConstant,
} from '@webkit/layout';
import { CommissariMock } from '../mocks/commissario.mock';

@Component({
  selector: 'mimit-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  table: EafAbstractTableField[] = [];
  data = CommissariMock;

  constructor(tabsManager: TabsManagerService) {
    const tab: TabModel = { nome: 'Lista attività', path: '' };
    tabsManager.openTab(tab);
    this.defineTableStructure();
  }

  defineTableStructure() {
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'Nome', 'nome', {
        sortDtoField: 'nome',
      })
    );
    this.table.push(
      new EafTableField(
        EafTableFieldTypeConstant.NORMAL,
        'Cognome',
        'cognome',
        {
          sortDtoField: 'cognome',
        }
      )
    );
    this.table.push(
      new EafTableField(
        EafTableFieldTypeConstant.NORMAL,
        'Codice Fiscale',
        'codiceFiscale',
        {
          sortDtoField: 'codiceFiscale',
        }
      )
    );
    this.table.push(
      new EafTableField(EafTableFieldTypeConstant.NORMAL, 'PEC', 'PEC', {
        sortDtoField: 'PEC',
      })
    );
    this.table.push(
      new EafTableField(
        EafTableFieldTypeConstant.NORMAL,
        'Domicilio professionale',
        'domicilioProfessionale',
        {
          sortDtoField: 'domicilioProfessionale',
        }
      )
    );
    
    return this.table;
  }
}
