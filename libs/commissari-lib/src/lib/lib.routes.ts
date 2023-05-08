import { Route } from '@angular/router';
import { FormComponent } from './components/form-component/form.component';
import { TableComponent } from './components/table-component/table.component';

export const commissariLibRoutes: Route[] = [
  { path: "", component: FormComponent },
  { path: "form", component: FormComponent },
  { path: "table", component: TableComponent },
];
