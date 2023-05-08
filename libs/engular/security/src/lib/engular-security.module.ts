import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissionDirective } from './directives/permission.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PermissionDirective],
  exports: [PermissionDirective],
})
export class EngularSecurityModule {}
