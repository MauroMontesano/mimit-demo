import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EnvironmentLoader } from '@engular/core-services';
import { LayoutConfiguration } from '@engular/layout-utils';
import { PermissionService } from '@engular/security';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WebkitFormModule } from '@webkit/form';
import { WebkitLayoutModule } from '@webkit/layout';
import { EafLayoutConfigurationService, WebkitSharedModule } from '@webkit/shared';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PlaygroundActionComponent } from './components/playground-action/playground-action.component';
import { PlaygroundAlertComponent } from './components/playground-alert/playground-alert.component';
import { PlaygroundAutocompleteComponent } from './components/playground-autocomplete/playground-autocomplete.component';
import { PlaygroundBreadcrumbComponent } from './components/playground-breadcrumb/playground-breadcrumb.component';
import { PlaygroundButtonComponent } from './components/playground-button/playground-button.component';
import { PlaygroundCarouselComponent } from './components/playground-carousel/playground-carousel.component';
import { PlaygroundCheckboxMultiComponent } from './components/playground-checkbox-multi/playground-checkbox-multi.component';
import { PlaygroundContentLoaderComponent } from './components/playground-content-loader/playground-content-loader.component';
import { PlaygroundDateRangeComponent } from './components/playground-date-range/playground-date-range.component';
import { PlaygroundDateTimeComponent } from './components/playground-date-time/playground-date-time.component';
import { PlaygroundDateComponent } from './components/playground-date/playground-date.component';
import { PlaygroundFilterConfigComponent } from './components/playground-filter-config/playground-filter-config.component';
import { PlaygroundCheckboxComponent } from './components/playground-input-checkbox/playground-input-checkbox.component';
import { PlaygroundInputCurrencyComponent } from './components/playground-input-currency/playground-input-currency.component';
import { PlaygroundInputNumberIntervalComponent } from './components/playground-input-number-interval/playground-input-number-interval.component';
import { PlaygroundInputNumberComponent } from './components/playground-input-number/playground-input-number.component';
import { PlaygroundInputTextComponent } from './components/playground-input-text/playground-input-text.component';
import { PlaygroundInputTextareaComponent } from './components/playground-input-textarea/playground-input-textarea.component';
import { PlaygroundMessageComponent } from './components/playground-message/playground-message.component';
import { PlaygroundModalComponent } from './components/playground-modal/playground-modal.component';
import { PlaygroundMultimodalComponent } from './components/playground-multimodal/playground-multimodal.component';
import { Form1Component } from './components/playground-multimodal/subcomponent/form1/form1.component';
import { Form2Component } from './components/playground-multimodal/subcomponent/form2/form2.component';
import { PlaygroundNavbarComponent } from './components/playground-navbar/playground-navbar.component';
import { PlaygroundPanelXpandComponent } from './components/playground-panel-xpand/playground-panel-xpand.component';
import { PlaygroundPanelComponent } from './components/playground-panel/playground-panel.component';
import { PlaygroundRadioComponent } from './components/playground-radio/playground-radio.component';
import { PlaygroundSearchFiltersComponent } from './components/playground-search-filters/playground-search-filters.component';
import { PlaygroundSelectByIdComponent } from './components/playground-select-by-id/playground-select-by-id.component';
import { PlaygroundSelectComponent } from './components/playground-select/playground-select.component';
import { PlaygroundStepperComponent } from './components/playground-stepper/playground-stepper.component';
import { PlaygroundTableComponent } from './components/playground-table/playground-table.component';
import { PlaygroundTabsComponent } from './components/playground-tabs/playground-tabs.component';
import { ProvaWebkitComponent } from './components/prova-webkit/prova-webkit.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PlayMenuComponent } from './utils/play-menu/play-menu.component';
import { PlaySectionComponent } from './utils/play-section/play-section.component';
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  // const oldTableRender = renderer.table;

  renderer.table = (header: string, body: string) => {
    return (
      //'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="table-responsive">' +
      '<table class="table table-doc table-hover table-custom"><thead>' +
      renderer.tablerow(header) +
      '</thead><tbody>' +
      renderer.tablerow(body) +
      '</tbody></table>'
    );
  };

  return {
    renderer: renderer,
    gfm: true,
    //tables: true,
    breaks: false,
    pedantic: false,
    //	sanitize: true,
    smartLists: true,
    smartypants: false,
  };
}
const hashLocationStrategyProvider: any = {
  provide: LocationStrategy,
  useClass: HashLocationStrategy,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ProvaWebkitComponent,
    PlayMenuComponent,
    PlaySectionComponent,
    PlaygroundInputTextComponent,
    PlaygroundInputNumberComponent,
    PlaygroundInputNumberIntervalComponent,
    PlaygroundDateComponent,
    PlaygroundButtonComponent,
    PlaygroundActionComponent,
    PlaygroundBreadcrumbComponent,
    PlaygroundNavbarComponent,
    WelcomeComponent,
    PlaygroundInputTextareaComponent,
    PlaygroundInputCurrencyComponent,
    PlaygroundDateRangeComponent,
    PlaygroundCheckboxComponent,
    PlaygroundSelectComponent,
    PlaygroundRadioComponent,
    PlaygroundCheckboxMultiComponent,
    PlaygroundTableComponent,
    PlaygroundPanelComponent,
    PlaygroundPanelXpandComponent,
    PlaygroundModalComponent,
    PlaygroundStepperComponent,
    PlaygroundMultimodalComponent,
    PlaygroundSelectByIdComponent,
    Form1Component,
    Form2Component,
    PlaygroundAutocompleteComponent,
    PlaygroundMessageComponent,
    PlaygroundContentLoaderComponent,
    PlaygroundAlertComponent,
    PlaygroundTabsComponent,
    PlaygroundFilterConfigComponent,
    PlaygroundSearchFiltersComponent,
    PlaygroundDateTimeComponent,
    PlaygroundCarouselComponent,
  ],
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
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: WelcomeComponent },
        {
          path: 'form',
          data: { breadcrumbs: 'Form' },
          children: [
            { path: 'prova', data: { breadcrumbs: 'prova' }, component: ProvaWebkitComponent },
            {
              path: 'input-autocomplete',
              data: { breadcrumbs: 'Autocompete' },
              component: PlaygroundAutocompleteComponent,
            },
            { path: 'button', data: { breadcrumbs: 'Button' }, component: PlaygroundButtonComponent },
            { path: 'input-checkbox', data: { breadcrumbs: 'Checkbox' }, component: PlaygroundCheckboxComponent },
            {
              path: 'input-multi-checkbox',
              data: { breadcrumbs: 'MultiCheckbox' },
              component: PlaygroundCheckboxMultiComponent,
            },
            {
              path: 'input-currency',
              data: { breadcrumbs: 'Input currency' },
              component: PlaygroundInputCurrencyComponent,
            },
            { path: 'input-date', data: { breadcrumbs: 'Input date' }, component: PlaygroundDateComponent },
            {
              path: 'input-date-time',
              data: { breadcrumbs: 'Input datetime' },
              component: PlaygroundDateTimeComponent,
            },
            {
              path: 'input-date-range',
              data: { breadcrumbs: 'Input date range' },
              component: PlaygroundDateRangeComponent,
            },
            { path: 'input-number', data: { breadcrumbs: 'Input number' }, component: PlaygroundInputNumberComponent },
            {
              path: 'input-number-interval',
              data: { breadcrumbs: 'Input number interval' },
              component: PlaygroundInputNumberIntervalComponent,
            },
            { path: 'input-radio', data: { breadcrumbs: 'Radio' }, component: PlaygroundRadioComponent },
            { path: 'select', data: { breadcrumbs: 'Select' }, component: PlaygroundSelectComponent },
            { path: 'select-by-id', data: { breadcrumbs: 'Select By ID' }, component: PlaygroundSelectByIdComponent },
            { path: 'input-text', data: { breadcrumbs: 'Input text' }, component: PlaygroundInputTextComponent },
            {
              path: 'input-textarea',
              data: { breadcrumbs: 'Input textarea' },
              component: PlaygroundInputTextareaComponent,
            },
          ],
        },
        {
          path: 'layout',
          data: { breadcrumbs: 'Layout' },
          children: [
            { path: 'alert', data: { breadcrumbs: 'Alert' }, component: PlaygroundAlertComponent },
            { path: 'actions', data: { breadcrumbs: 'Actions' }, component: PlaygroundActionComponent },
            { path: 'breadcrumbs', data: { breadcrumbs: 'Breadcrumbs' }, component: PlaygroundBreadcrumbComponent },
            {
              path: 'content-loader',
              data: { breadcrumbs: 'Content Loader' },
              component: PlaygroundContentLoaderComponent,
            },
            { path: 'message', data: { breadcrumbs: 'Message' }, component: PlaygroundMessageComponent },
            { path: 'modal', data: { breadcrumbs: 'Modal' }, component: PlaygroundModalComponent },
            {
              path: 'modals',
              component: PlaygroundMultimodalComponent,
              data: {
                breadcrumbs: 'Multi modal',
              },
            },
            { path: 'NavBar', data: { breadcrumbs: 'NavBar' }, component: PlaygroundNavbarComponent },
            { path: 'panel', data: { breadcrumbs: 'Panel' }, component: PlaygroundPanelComponent },
            { path: 'panel xpand', data: { breadcrumbs: 'Panel Xpand' }, component: PlaygroundPanelXpandComponent },
            { path: 'stepper', data: { breadcrumbs: 'Stepper' }, component: PlaygroundStepperComponent },
            { path: 'table', data: { breadcrumbs: 'Tabella' }, component: PlaygroundTableComponent },
            { path: 'tabs', data: { breadcrumbs: 'Tabs' }, component: PlaygroundTabsComponent },
            { path: 'carousel', data: { breadcrumbs: 'Carousel' }, component: PlaygroundCarouselComponent },
          ],
        },
        {
          path: 'Search',
          data: { breadcrumbs: 'Search' },
          children: [
            {
              path: 'filter-config',
              data: { breadcrumbs: 'Filter Config' },
              component: PlaygroundFilterConfigComponent,
            },
            {
              path: 'search-filters',
              data: { breadcrumbs: 'Search Filters' },
              component: PlaygroundSearchFiltersComponent,
            },
          ],
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    WebkitSharedModule,
    WebkitFormModule,
    WebkitLayoutModule,
  ],
  providers: [
    hashLocationStrategyProvider,
    { provide: LayoutConfiguration, useExisting: EafLayoutConfigurationService },
    PermissionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(environmentLoader: EnvironmentLoader, translate: TranslateService) {
    environmentLoader.setEnviroment(environment);
    translate.setDefaultLang('it');
    translate.use('it');
  }
}
