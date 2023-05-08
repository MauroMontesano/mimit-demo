import { Route } from "@angular/router";
import { FormComponent } from "./componentss/form/form.component";
import { TableComponent } from "./componentss/table/table.component";
import { RemoteEntryComponent } from "./entry.component";

export const remoteRoutes: Route[] = [
  { path: "", component: RemoteEntryComponent },
  { path: "form", component: FormComponent },
  { path: "table", component: TableComponent },
];
