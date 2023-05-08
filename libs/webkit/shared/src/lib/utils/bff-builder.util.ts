import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export class bffBuilder {
  command: string;
  method: string;
  pathParams: {
    [key: string]: any;
  } = {};
  queryParams: {
    [key: string]: any;
  } = {};
  body: unknown | undefined;

  constructor(command: string, method: string, private httpClient: HttpClient) {
    this.command = command;
    this.method = method;
  }

  addQueryParams(key: string, value: any) {
    this.queryParams[key] = value;
    return this;
  }

  addPathParams(key: string, value: any) {
    this.pathParams[key] = value;
    return this;
  }

  addBody(body: unknown) {
    this.body = body;
    return this;
  }

  call<M>(extra = {}) {
    const url = this.command + '/' + this.method;
    const finalBody: any = {};
    finalBody.requestBody = {};
    if (this.body) {
      finalBody.requestBody = this.body;
    }
    finalBody.pathVariables = this.pathParams;
    finalBody.requestParams = this.queryParams;

    return this.httpClient.post(url, finalBody, extra).pipe(
      map((resBff: any) => {
        return resBff;
      })
    );
  }
}
