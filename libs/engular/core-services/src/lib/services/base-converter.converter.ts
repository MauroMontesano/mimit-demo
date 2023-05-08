import { BaseModel, SearchResult } from '@engular/base-models';

export abstract class BaseConverter<M extends BaseModel, D> {
  constructor() {}

  public abstract convertToModel(dto: D): M;

  public abstract convertToDto(model: M): D;

  public convertSearchResult(dtoFromSearch: SearchResult<D>): SearchResult<M> {
    const converted = new SearchResult<M>();
    if (!dtoFromSearch) {
      converted.totalElements = 0;
      converted.totalPages = 0;
      converted.content = [];
      return converted;
    }
    converted.totalElements = dtoFromSearch.totalElements;
    converted.totalPages = dtoFromSearch.totalPages;
    converted.content = this.convertToModelList(dtoFromSearch.content);
    return converted;
  }

  public convertToModelList(dtoArray: D[]): M[] {
    if (!dtoArray) {
      return [];
    }
    const array: M[] = [];
    for (const dto of dtoArray) {
      if (dto != null && dto !== undefined) {
        array.push(this.convertToModel(dto));
      }
    }
    return array;
  }

  public convertToDtoList(modelArray: M[], light?: boolean): D[] {
    if (!modelArray) {
      return [];
    }
    const array: any = [];
    for (const model of modelArray) {
      if (model != null && model !== undefined) {
        if (light) {
          array.push({ id: model.id });
        } else {
          array.push(this.convertToDto(model));
        }
      }
    }

    return array;
  }
}
