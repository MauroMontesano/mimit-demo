import { DateModel } from '@engular/base-models';
import { BaseConverter } from '@engular/core-services';
import { UtenteDTO } from '../dto/utente.dto';
import { UtenteModel } from '../models/utente.model';

export class UtenteConverter extends BaseConverter<UtenteModel, UtenteDTO> {
  constructor() {
    super();
  }
  public convertToModel(dto: UtenteDTO): UtenteModel {
    const model = new UtenteModel();
    model.id = dto._id;
    model.nome = dto.nome;
    model.cognome = dto.cognome;
    if (dto.dataRegistrazione) {
      model.dataRegistrazione = new DateModel(dto.dataRegistrazione);
    }
    if (dto.dataNascita) {
      model.dataNascita = new DateModel(dto.dataNascita);
    }
    model.nickname = dto.nickname;
    model.email = dto.email;
    model.otp = dto.otp;
    model.flagConfirmed = dto.flagConfirmed;
    model.presaVisioneInformativa = dto.presaVisioneInformativa;
    model.role = dto.role;
    model.societaRappresentata = dto.societaRappresentata;
    if (dto.nonce && dto.nonce.nonce) {
      model.nonce = { nonce: dto.nonce.nonce };
    }
    return model;
  }

  public convertToDto(model: UtenteModel): UtenteDTO {
    const modelDTO = new UtenteDTO();
    modelDTO._id = model.id;
    modelDTO.nome = model.nome;
    modelDTO.cognome = model.cognome;
    modelDTO.dataRegistrazione = model.dataRegistrazione?.toDTO();
    modelDTO.dataNascita = model.dataNascita?.toDTO();
    modelDTO.nickname = model.nickname;
    modelDTO.email = model.email;
    modelDTO.otp = model.otp;
    modelDTO.flagConfirmed = model.flagConfirmed;
    modelDTO.presaVisioneInformativa = model.presaVisioneInformativa;
    modelDTO.role = model.role;
    modelDTO.societaRappresentata = model.societaRappresentata;
    if (model.nonce && model.nonce.nonce) {
      modelDTO.nonce = { nonce: model.nonce.nonce };
    }
    return modelDTO;
  }
}
