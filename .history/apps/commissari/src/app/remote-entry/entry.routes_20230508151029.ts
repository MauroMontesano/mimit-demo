import { Route } from "@angular/router";
import { FormComponent } from "./components/form-component/form.component";
import { TableComponent } from "./components/table-component/table.component";
import { RemoteEntryComponent } from "./entry.component";

export const remoteRoutes: Route[] = [
  { path: "", component: RemoteEntryComponent },
  { path: "form", component: FormComponent },
  { path: "table", component: TableComponent },
];
