// tslint:disable:no-implicit-dependencies
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseModel, SearchResult } from '@engular/base-models';
import { BaseConverter } from '@engular/core-services';
import { LoggerService, LoggerWriter } from '@engular/logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { bffBuilder } from '../utils/bff-builder.util';
import { EafConfigurationService } from './eaf-configuration.service';

export abstract class EafBaseHttpService<M extends BaseModel, DTO> {
  protected log: LoggerWriter;

  protected baseApiName: string;

  protected converter: BaseConverter<M, DTO>;

  constructor(protected httpClient: HttpClient, protected configuration: EafConfigurationService) {
    this.log = LoggerService.getLogger(this.getServiceName());
    this.baseApiName = this.getHost() + this.getBaseApiName();
    this.converter = this.getConverter();
  }

  getPaginationParamsFromCriteria(criteria: any): HttpParams {
    const query: any = {};
    if (criteria['sort']) {
      query['sort'] = criteria['sort'];
    }
    if (criteria['size']) {
      query['size'] = criteria['size'];
    }
    if (criteria['page'] === 0 || criteria['page']) {
      query['page'] = criteria['page'];
    }

    delete criteria['sort'];
    delete criteria['page'];
    delete criteria['size'];
    const params = new HttpParams({
      fromObject: query,
    });
    return params;
  }

  getPaginationFromCriteria(criteria: any) {
    const query: any = {};
    if (criteria['sort']) {
      query['sort'] = criteria['sort'];
    }
    if (criteria['size']) {
      query['size'] = criteria['size'];
    }
    if (criteria['page'] === 0 || criteria['page']) {
      query['page'] = criteria['page'];
    }

    delete criteria['sort'];
    delete criteria['page'];
    delete criteria['size'];
    return query;
  }

  protected getHost(): string {
    return '';
  }

  //immobili.get
  //immobili.add
  //immobili.delete
  //immobili.update
  //immobili.search
  //immobili.all
  abstract getBaseApiName(): string; //immobili

  abstract getServiceName(): string;

  abstract getConverter(): BaseConverter<M, DTO>;

  getBffBuilder(command: string, method: string) {
    return new bffBuilder(command, method, this.httpClient);
  }

  public get(id: any): Observable<M> {
    const url = this.configuration.getApi(`${this.baseApiName}.detail`).urlComplete.replace(':id', id);
    return this.httpClient.get<DTO>(url).pipe(
      map((dto: DTO) => {
        return this.converter.convertToModel(dto);
      })
    );
  }

  public getAll(params?: any): Observable<M[]> {
    const httpParams = new HttpParams({
      fromObject: params,
    });
    const url = this.configuration.getApi(`${this.baseApiName}.all`).urlComplete;
    return this.httpClient.get<DTO[]>(url, { params: httpParams }).pipe(
      map((dtos: DTO[]) => {
        return this.converter.convertToModelList(dtos);
      })
    );
  }

  public find(criteria: any): Observable<SearchResult<M>> {
    const url = this.configuration.getApi(`${this.baseApiName}.search`).urlComplete;
    const params = this.getPaginationParamsFromCriteria(criteria);
    return this.httpClient.post<SearchResult<DTO>>(url, criteria, { params: params }).pipe(
      map((dtos: SearchResult<DTO>) => {
        return this.converter.convertSearchResult(dtos);
      })
    );
  }

  public save(model: M): Observable<M> {
    const url = this.configuration.getApi(`${this.baseApiName}.add`).urlComplete;
    const dto = this.converter.convertToDto(model);
    return this.httpClient.post<DTO>(url, dto).pipe(
      map((dtoWithId: DTO) => {
        return this.converter.convertToModel(dtoWithId);
      })
    );
  }

  public update(model: M): Observable<M> {
    const url = this.configuration.getApi(`${this.baseApiName}.update`).urlComplete.replace(':id', model.id);
    const dto = this.converter.convertToDto(model);
    return this.httpClient.put<DTO>(url, dto).pipe(
      map((dtoUpdated: DTO) => {
        return this.converter.convertToModel(dtoUpdated);
      })
    );
  }

  public delete(id: any): Observable<M> {
    const url = this.configuration.getApi(`${this.baseApiName}.delete`).urlComplete.replace(':id', id);
    return this.httpClient.delete<DTO>(url).pipe(
      map((dtoDeleted: DTO) => {
        if (dtoDeleted) {
          return this.converter.convertToModel(dtoDeleted);
        }
        return { id: id } as M;
      })
    );
  }
}
