import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EnvironmentLoader } from '@engular/core-services';
import { LayoutConfiguration } from '@engular/layout-utils';
import { SharedModule } from '@mimit/shared';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { EafConfigurationService, EafLayoutConfigurationService } from '@webkit/shared';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';

export function HttpLoaderFactory(http: HttpBackend) {
  const routes = [];
  routes.push({ prefix: './assets/i18n/', suffix: '.json' });
  return new MultiTranslateHttpLoader(http, routes);
}

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule
  ],
  providers: [
    {
      provide: LayoutConfiguration,
      useExisting: EafLayoutConfigurationService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(environmentLoader: EnvironmentLoader, translate: TranslateService, conf: EafConfigurationService) {
    environmentLoader.setEnviroment(environment);
    translate.setDefaultLang('it');
    translate.use('it');
    conf.addConf(environment);
    if (window['env']) {
      // console.log('conf da env.json');
      conf.addConf(window['env']);
    }
    window['conf'] = conf;
  }}
