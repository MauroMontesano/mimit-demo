import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { LayoutConfiguration } from '@engular/layout-utils';
import { EafLayoutConfigurationService, WebkitSharedModule } from '@webkit/shared';
import { WebkitFormModule } from '@webkit/form';

const hashLocationStrategyProvider: any = {
  provide: LocationStrategy,
  useClass: HashLocationStrategy,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const ModuloStories = {
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    WebkitSharedModule,
    WebkitFormModule,
  ],
  providers: [
    hashLocationStrategyProvider,
    { provide: LayoutConfiguration, useExisting: EafLayoutConfigurationService },
  ],
};
