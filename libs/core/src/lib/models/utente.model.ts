import { BaseModel, DateModel } from '@engular/base-models';

export class UtenteModel extends BaseModel {
  nome: string;
  cognome: string;
  dataRegistrazione?: DateModel;
  dataNascita?: DateModel;
  nickname: string;
  email?: string;
  otp?: string;
  flagConfirmed?: boolean;
  presaVisioneInformativa: boolean;
  role: RoleModel;
  societaRappresentata: string;
  nonce: { nonce: string };
}

export class RoleModel {
  id: string;
  name: string;
  functionalities: string[];
  dataRestrictions?: any;
}
