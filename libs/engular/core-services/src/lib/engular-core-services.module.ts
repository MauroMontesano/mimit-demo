import { NgModule } from '@angular/core';

import { DeepObjectPipe } from './pipes/deep-object.pipe';

@NgModule({
  declarations: [DeepObjectPipe],
  imports: [],
  exports: [DeepObjectPipe],
})
export class EngularCoreServicesModule {
  constructor() {
    window['engular']['core-services'] = '1.0.0';
  }
}
window['engular'] = window['engular'] || {};
window['engular']['core-services'] = 'not initialized';
