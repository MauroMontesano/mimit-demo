import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@mimit/shared';
import { FormComponent } from './components/form-component/form.component';
import { TableComponent } from './components/table-component/table.component';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    NxWelcomeComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), SharedModule],
  providers: [],
})
export class RemoteEntryModule {}
