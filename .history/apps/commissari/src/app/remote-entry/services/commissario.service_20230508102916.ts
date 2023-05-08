import { AuthenticationService } from '@adm/agenda-trasparente/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseConverter } from '@engular/core-services';
import { EafBaseHttpService, EafConfigurationService, EafMessageService } from '@webkit/shared';
import { Observable, map } from 'rxjs';
import { CommissarioConverter } from '../converters/commissario.converter';
import { CommissarioDTO } from '../dto/commissario.dto';
import { CommissarioModel } from '../models/commissario.model';

@Injectable({
  providedIn: 'root',
})
export class CommissarioService extends EafBaseHttpService<CommissarioModel, CommissarioDTO> {
  private nickName: string;
  baseUrl: string;

  constructor(
    http: HttpClient,
    protected config: EafConfigurationService,
    private eafMessageService: EafMessageService,
    private authService: AuthenticationService
  ) {
    super(http, config);
    this.authService.getdatiUtente().subscribe((datiUtente) => {
      if (datiUtente) {
        this.nickName = datiUtente.nickname;
      }
    });
    this.baseUrl = this.config.get('baseUrl');
  }

  public detail(id: string): Observable<CommissarioModel> {
    const bff = this.getBffBuilder(this.config.getApi(`${this.baseApiName}.detail`).urlComplete, 'GET').addPathParams(
      'id',
      id
    );
    return bff.call<CommissarioDTO>().pipe(
      map((dto: CommissarioDTO) => {
        return this.converter.convertToModel(dto);
      })
    );
  }

  public override delete(id: any): Observable<CommissarioModel> {
    const bff = this.getBffBuilder(this.config.getApi('pa.aste.delete').urlComplete, 'DELETE').addPathParams('id', id);
    return bff.call<CommissarioDTO>().pipe(
      map((dto: CommissarioDTO) => {
        return this.converter.convertToModel(dto);
      })
    );
  }

  public add(model: CommissarioModel): Observable<CommissarioModel> {
    const dto = this.converter.convertToDto(model);
    const bff = this.getBffBuilder(this.config.getApi(`${this.baseApiName}.add`).urlComplete, 'POST').addBody(dto);
    return bff.call<CommissarioDTO>().pipe(
      map((dtoWithId: CommissarioDTO) => {
        return this.converter.convertToModel(dtoWithId);
      })
    );
  }

  public override update(model: CommissarioModel): Observable<CommissarioModel> {
    const dto = this.converter.convertToDto(model);
    const bff = this.getBffBuilder(this.config.getApi(`${this.baseApiName}.update`).urlComplete, 'PUT')
      .addBody(dto)
      .addPathParams('id', 'id');
    return bff.call<CommissarioDTO>().pipe(
      map((dtoWithId: CommissarioDTO) => {
        return this.converter.convertToModel(dtoWithId);
      })
    );
  }

  getBaseApiName(): string {
    return 'pa.aste';
  }

  getServiceName(): string {
    return 'PortatoreInteresseService';
  }

  getConverter(): BaseConverter<CommissarioModel, CommissarioDTO> {
    return new CommissarioConverter();
  }
}
