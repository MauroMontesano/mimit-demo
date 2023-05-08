import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EngularSecurityModule } from '@engular/security';
import { WebkitFormModule } from '@webkit/form';
import { WebkitSharedModule } from '@webkit/shared';
import { DragulaModule } from 'ng2-dragula';
import { AccordionManagerComponent } from './components/accordion-manager/accordion-manager.component';
import { ActionComponent } from './components/action/action.component';
import { ActionsDropdownComponent } from './components/actions-dropdown/actions-dropdown.component';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormSectionComponent } from './components/form-section/form-section.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { GridTabsComponent } from './components/grid-tabs/grid-tabs.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { MessageComponent } from './components/message/message.component';
import { ModalComponent } from './components/modal/modal.component';
import { MultiModalViewerComponent } from './components/multi-modal-viewer/multi-modal-viewer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PanelXpandComponent } from './components/panel-xpand/panel-xpand.component';
import { PanelComponent } from './components/panel/panel.component';
import { FilterConfigComponent } from './components/search/filter-config/filter-config.component';
import { FilterPreferencesComponent } from './components/search/filter-preferences/filter-preferences.component';
import { SearchFiltersComponent } from './components/search/search-filters/search-filters.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TableComponent } from './components/table/table.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    WebkitSharedModule,
    WebkitFormModule,
    DragulaModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EngularSecurityModule,
  ],
  declarations: [
    NavBarComponent,
    ActionComponent,
    BreadcrumbComponent,
    TableComponent,
    ActionsDropdownComponent,
    AccordionManagerComponent,
    PanelComponent,
    PanelXpandComponent,
    ActionsDropdownComponent,
    ModalComponent,
    StepperComponent,
    MultiModalViewerComponent,
    MessageComponent,
    ContentLoaderComponent,
    AlertComponent,
    TabsComponent,
    FormGroupComponent,
    FormSectionComponent,
    FormTitleComponent,
    FilterConfigComponent,
    FilterPreferencesComponent,
    SearchFiltersComponent,
    HeaderTitleComponent,
    CarouselComponent,
    PaginationComponent,
    SidebarComponent,
    GridTabsComponent,
  ],
  exports: [
    NavBarComponent,
    ActionComponent,
    BreadcrumbComponent,
    TableComponent,
    ActionsDropdownComponent,
    AccordionManagerComponent,
    PanelComponent,
    PanelXpandComponent,
    ActionsDropdownComponent,
    ModalComponent,
    StepperComponent,
    MultiModalViewerComponent,
    MessageComponent,
    ContentLoaderComponent,
    AlertComponent,
    TabsComponent,
    FormGroupComponent,
    FormSectionComponent,
    FormTitleComponent,
    FilterConfigComponent,
    FilterPreferencesComponent,
    SearchFiltersComponent,
    HeaderTitleComponent,
    CarouselComponent,
    PaginationComponent,
    SidebarComponent,
    GridTabsComponent,
  ],
})
export class WebkitLayoutModule {}
