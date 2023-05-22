import { DateModel } from '@engular/base-models';
import { BaseConverter } from '@engular/core-services';
import { UtenteDto } from '../dtos/utente.dto';
import { Utente } from '../models/utente.model';

export class UtenteConverter extends BaseConverter<Utente, UtenteDto> {
  convertToModel(dto: UtenteDto): Utente {
    return new Utente(
      dto.nome,
      dto.cognome,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dto.email!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      new DateModel(dto.dataNascita!), //unica vera conversiona al momento
      dto.biografia,
      dto.numero,
      dto.via,
      dto.cap,
      dto.citta,
      dto.id,
      dto.progress
    );
  }
  convertToDto(model: Utente): UtenteDto {
    return new UtenteDto(
      model.nome,
      model.cognome,
      model.email,
      model.dataNascita ? model.dataNascita.toDate() : undefined, //unica vera conversiona al momento
      model.biografia,
      model.numero,
      model.via,
      model.cap,
      model.citta
    );
  }
}
