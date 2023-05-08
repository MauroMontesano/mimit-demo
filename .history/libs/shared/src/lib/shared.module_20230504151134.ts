import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EngularSecurityModule } from '@engular/security';
import { WebkitFormModule } from '@webkit/form';
import { NavBarComponent, PaginationComponent, WebkitLayoutModule } from '@webkit/layout';
import { WebkitSharedModule } from '@webkit/shared';
import { FooterComponent } from './components/footer/footer.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { ClickFromKeyboardDirective } from './directives/click-from-keyboard.directive';
import { FluidHeightDirective } from './directives/fluid-height.directive';
import { SkipToDirective } from './directives/skip-to.directive';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { DetailsTableComponent } from './partials/details-table/details-table.component';
import { GestioneFotoComponent } from './partials/gestione-foto/gestione-foto.component';
import { BffImagePipe } from './pipes/bff-image.pipe';

@NgModule({
  imports: [
    CommonModule,
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
