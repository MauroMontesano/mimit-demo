// tslint:disable:no-implicit-dependencies
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseModel, SearchResult } from '@engular/base-models';
import { LoggerService, LoggerWriter } from '@engular/logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseConverter } from './base-converter.converter';

export abstract class BaseHttpService<M extends BaseModel, DTO> {
  protected log: LoggerWriter;

  protected baseUrl: string;

  protected converter: BaseConverter<M, DTO>;

  constructor(protected httpClient: HttpClient) {
    this.log = LoggerService.getLogger(this.getServiceName());
    this.baseUrl = this.getHost() + this.getBaseResourceEndpoint();
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

  protected getHost(): string {
    return '';
  }

  abstract getBaseResourceEndpoint(): string;

  abstract getServiceName(): string;

  abstract getConverter(): BaseConverter<M, DTO>;

  public get(id: any): Observable<M> {
    const url = this.baseUrl + `/${id}`;
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
    return this.httpClient.get<DTO[]>(this.baseUrl, { params: httpParams }).pipe(
      map((dtos: DTO[]) => {
        return this.converter.convertToModelList(dtos);
      })
    );
  }

  public find(criterioDTO: any): Observable<SearchResult<M>> {
    const url = this.baseUrl + `/`;
    const params = this.getPaginationParamsFromCriteria(criterioDTO);
    return this.httpClient.get<SearchResult<DTO>>(url, { params: params }).pipe(
      map((dtos: SearchResult<DTO>) => {
        return this.converter.convertSearchResult(dtos);
      })
    );
  }

  public save(model: M): Observable<M> {
    const url = this.baseUrl + `/`;
    const dto = this.converter.convertToDto(model);
    return this.httpClient.post<DTO>(url, dto).pipe(
      map((dtoWithId: DTO) => {
        return this.converter.convertToModel(dtoWithId);
      })
    );
  }

  public update(model: M): Observable<M> {
    const url = this.baseUrl + `/${model.id}`;
    const dto = this.converter.convertToDto(model);
    return this.httpClient.put<DTO>(url, dto).pipe(
      map((dtoUpdated: DTO) => {
        return this.converter.convertToModel(dtoUpdated);
      })
    );
  }

  public delete(id: any): Observable<M> {
    const url = this.baseUrl + `/${id}`;
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
