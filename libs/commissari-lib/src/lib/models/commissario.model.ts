import { BaseModel } from '@engular/base-models';
export class CommissarioModel extends BaseModel {
  cognome: string;
  nome: string;
  codiceFiscale: string;
  PEC: string;
  domicilioProfessionale: string;
  ordineProfessionale: string;
  numeroIncarichi: number;
  livelloEsperienza: string;
  idoneita: string;
}
