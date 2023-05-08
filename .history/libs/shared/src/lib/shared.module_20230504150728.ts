import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EngularSecurityModule } from '@engular/security';
import { WebkitFormModule } from '@webkit/form';
import { WebkitLayoutModule } from '@webkit/layout';
import { WebkitSharedModule } from '@webkit/shared';

@NgModule({
  imports: [
    CommonModule,
    EngularSecurityModule,
    WebkitFormModule,
    WebkitLayoutModule,
    WebkitSharedModule,
    EngularSecurityModule,
  ],
})
export class SharedModule {}
