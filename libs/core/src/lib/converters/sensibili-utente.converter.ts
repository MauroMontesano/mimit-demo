import { DateModel } from '@engular/base-models';
import { BaseConverter } from '@engular/core-services';
import { SensibiliUtenteDTO } from '../dto/sensibili-utente.dto';
import { SensibiliUtenteModel } from '../models/sensibili-utente.model';

export class SensibiliUtenteConverter extends BaseConverter<SensibiliUtenteModel, SensibiliUtenteDTO> {
  constructor() {
    super();
  }
  public convertToModel(dto: SensibiliUtenteDTO): SensibiliUtenteModel {
    const model = new SensibiliUtenteModel();
    model.id = dto._id;
    model.nome = dto.nome;
    model.cognome = dto.cognome;
    if (dto.dataNascita) {
      model.dataNascita = new DateModel(dto.dataNascita);
    }
    model.nickname = dto.nickname;
    model.email = dto.email;
    return model;
  }

  public convertToDto(model: SensibiliUtenteModel): SensibiliUtenteDTO {
    const modelDTO = new SensibiliUtenteDTO();
    modelDTO._id = model.id;
    modelDTO.nome = model.nome;
    modelDTO.cognome = model.cognome;
    modelDTO.dataNascita = model.dataNascita?.toDTO();
    modelDTO.nickname = model.nickname;
    modelDTO.email = model.email;
    return modelDTO;
  }
}
