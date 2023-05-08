import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnvironmentLoader {
  environmentLocal: any;
  getEnvironment() {
    return this.environmentLocal;
  }

  setEnviroment(env: any) {
    this.environmentLocal = env;
  }
}
