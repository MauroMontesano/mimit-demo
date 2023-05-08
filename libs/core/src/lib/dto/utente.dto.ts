export class UtenteDTO {
  _id: string;
  nome: string;
  cognome: string;
  dataRegistrazione?: number;
  dataNascita?: number;
  nickname: string;
  email?: string;
  otp?: string;
  flagConfirmed?: boolean;
  presaVisioneInformativa: boolean;
  role: RoleDTO;
  societaRappresentata: string;
  nonce: { nonce: string };
}

export class RoleDTO {
  id: string;
  name: string;
  functionalities: string[];
  dataRestrictions?: any;
}
