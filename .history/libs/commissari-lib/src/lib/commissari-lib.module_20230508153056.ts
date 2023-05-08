import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { commissariLibRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(commissariLibRoutes),
    RouterModule.forChild(commissariLibRoutes),
  ],
})
export class CommissariLibModule {}
