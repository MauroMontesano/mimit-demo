import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EngularSecurityModule } from '@engular/security';
import { WebkitFormModule } from '@webkit/form';
import { WebkitLayoutModule } from '@webkit/layout';
import { WebkitSharedModule } from '@webkit/shared';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClickFromKeyboardDirective } from './directives/click-from-keyboard.directive';
import { FluidHeightDirective } from './directives/fluid-height.directive';
import { SkipToDirective } from './directives/skip-to.directive';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { DetailsTableComponent } from './partials/details-table/details-table.component';
import { GestioneFotoComponent } from './partials/gestione-foto/gestione-foto.component';
import { PaginationComponent } from './partials/pagination/pagination.component';
import { BffImagePipe } from './pipes/bff-image.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EngularSecurityModule,
    WebkitFormModule,
    WebkitLayoutModule,
    WebkitSharedModule,
    EngularSecurityModule,
  ],
  declarations: [
    SkipToDirective,
    FluidHeightDirective,
    ContentLayoutComponent,
    FooterComponent,
    AuthLayoutComponent,
    NavBarComponent,
    SidebarComponent,
    NotAuthorizedComponent,
    GestioneFotoComponent,
    BffImagePipe,
    PaginationComponent,
    ClickFromKeyboardDirective,
    DetailsTableComponent,
  ],
  exports: [
    WebkitFormModule,
    WebkitLayoutModule,
    WebkitSharedModule,
    EngularSecurityModule,
    NotAuthorizedComponent,
    GestioneFotoComponent,
    BffImagePipe,
    PaginationComponent,
    ClickFromKeyboardDirective,
    DetailsTableComponent,
    FluidHeightDirective,
  ],
})
export class SharedModule {}
