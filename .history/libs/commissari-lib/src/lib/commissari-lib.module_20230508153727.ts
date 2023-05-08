import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormComponent } from './components/form-component/form.component';
import { TableComponent } from './components/table-component/table.component';
import { commissariLibRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(commissariLibRoutes),
  ],
  declarations: [
    FormComponent,
    TableComponent
  ]
})
export class CommissariLibModule {}
