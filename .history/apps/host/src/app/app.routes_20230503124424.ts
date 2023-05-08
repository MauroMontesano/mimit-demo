import { NxWelcomeComponent } from "./nx-welcome.component";
import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "ispettori",
    loadChildren: () =>
      import("ispettori/Module").then((m) => m.RemoteEntryModule),
  },
  {
    path: "commissari",
    loadChildren: () =>
      import("commissari/Module").then((m) => m.RemoteEntryModule),
  },
  {
    path: "",
    component: NxWelcomeComponent,
  },
];
