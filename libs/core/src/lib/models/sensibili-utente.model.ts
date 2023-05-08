import { BaseModel, DateModel } from '@engular/base-models';

export class SensibiliUtenteModel extends BaseModel {
  codiceFiscale: string;
  nickname: string;
  cognome: string;
  nome: string;
  email?: string;
  dataNascita?: DateModel;
}
