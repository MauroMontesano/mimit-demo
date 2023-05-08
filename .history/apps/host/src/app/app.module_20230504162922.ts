import { HttpBackend, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { NxWelcomeComponent } from "./nx-welcome.component";

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
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabledBlocking" }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
