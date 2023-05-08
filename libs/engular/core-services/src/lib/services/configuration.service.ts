import { Injectable } from '@angular/core';
import { LoggerService } from '@engular/logger';
import { EnvironmentLoader } from './environmentLoader.service';

const log = LoggerService.getLogger('ConfigurationService');

@Injectable()
export class ConfigurationService {
  protected envInstance: any;
  id = Math.round(Math.random() * 1000);
  constructor(envLoader: EnvironmentLoader) {
    // console.debug('conf id:' + this.id);
    const envInstance = envLoader.getEnvironment();
    if (envInstance) {
      log.info(`Configuration from outside name: ${envInstance.name}`);
      this.envInstance = envInstance;
    } else {
      console.warn(`Configuration not loaded from EnvironmentLoader`);
      this.envInstance = {};
    }
  }

  public get(path: string) {
    // console.warn("conf getid:"+this.id)
    return path.split('.').reduce(function (result, key) {
      return result[key];
    }, this.envInstance);
  }

  public isDevelopMode() {
    if (!this.envInstance) {
      return false;
    }
    return this.envInstance.developMode;
  }

  public isLocalDeveloping() {
    return this.get('env') === 'LOCAL';
  }
}
