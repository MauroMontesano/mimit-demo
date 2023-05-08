import { Injectable } from '@angular/core';
import { ConfigurationService, EnvironmentLoader } from '@engular/core-services';
import { mergeDeep } from '../utils/deep-merge.util';

export interface ApiConfiguration {
  urlComplete: string;
  base: string;
  endpoint: string;
  path: string;
  extra: unknown | undefined;
}

@Injectable({ providedIn: 'root' })
export class EafConfigurationService extends ConfigurationService {
  protected api: any = {};

  constructor(envLoader: EnvironmentLoader) {
    super(envLoader);
    this.addAPI(this.envInstance.api);
    if (window['env' as any]) {
      // console.log('conf da env.json');
      this.addConf(window['env' as any]);
    }
    // console.log('C', this.envInstance.env);
  }

  addConf(conf: any) {
    // console.warn("conf addConf:"+this.id)
    this.envInstance = mergeDeep(this.envInstance, conf);
    // console.log('update conf', conf, JSON.stringify(this.envInstance, undefined, 3));
    if (conf['api']) {
      // console.log('ha anche le api e aggiorno anche loro');
      this.addAPI(conf['api']);
    }

    // { ...this.envInstance, ...conf };
  }
  addAPI(api: any = {}) {
    // console.warn("conf addAPI:"+this.id)
    this.api = mergeDeep(this.api, api);
    // console.log('update api', api, JSON.stringify(this.api, undefined, 3));
    // this.api = { ...this.api, ...api };
  }

  public getApi(apiName: string): ApiConfiguration {
    // console.warn("conf getApi:"+this.id)
    const apiInfo: ApiConfiguration = {
      urlComplete: '',
      base: '',
      endpoint: '',
      path: '',
      extra: {},
    };
    const pieceOfApi = apiName.split('.');

    let level = this.api;
    let i = 0;
    // for (let i = 0; i < pieceOfApi.length; i++) {
    do {
      if (!level) {
        console.error("problema con la conf dell'api", i, level, pieceOfApi[i - 1], pieceOfApi);
        break;
      }
      if (level['_base']) {
        apiInfo.base = level['_base'];
        // apiInfo.path = '';
      }

      apiInfo.endpoint = level['_endpoint'] || apiInfo.endpoint;
      apiInfo.path += level['path'] ? level['path'] : '';
      apiInfo.extra = level['extra'] || apiInfo.extra;
      level = level[pieceOfApi[i]];
      i++;
    } while (i <= pieceOfApi.length);

    apiInfo.urlComplete = apiInfo.base + apiInfo.endpoint + apiInfo.path;
    return apiInfo;
  }
}
