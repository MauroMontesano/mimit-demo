import { BaseConverter } from '@engular/core-services';
import { CommissarioDTO } from '../dto/commissario.dto';
import { CommissarioModel } from '../models/commissario.model';

export class CommissarioConverter extends BaseConverter<CommissarioModel, CommissarioDTO> {
  public convertToModel(dto: CommissarioDTO): CommissarioModel {
    const model = new CommissarioModel();
    model.cognome = dto.cognome;
    model.nome = dto.nome;
    model.codiceFiscale = dto.codiceFiscale;
    model.PEC = dto.PEC;
    model.domicilioProfessionale = dto.domicilioProfessionale;
    model.ordineProfessionale = dto.ordineProfessionale;
    model.numeroIncarichi = dto.numeroIncarichi;
    model.livelloEsperienza = dto.livelloEsperienza;
    model.idoneita = dto.idoneita;
    return model;
  }

  public convertToDto(model: CommissarioModel): CommissarioDTO {
    const modelDTO = new CommissarioDTO();
    modelDTO.cognome = model.cognome;
    modelDTO.nome = model.nome;
    modelDTO.codiceFiscale = model.codiceFiscale;
    modelDTO.PEC = model.PEC;
    modelDTO.domicilioProfessionale = model.domicilioProfessionale;
    modelDTO.ordineProfessionale = model.ordineProfessionale;
    modelDTO.numeroIncarichi = model.numeroIncarichi;
    modelDTO.livelloEsperienza = model.livelloEsperienza;
    modelDTO.idoneita = model.idoneita;
    return modelDTO;
  }
}
