import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent
    // loadChildren: () =>
    //   import('@mimit/commissari-lib').then((m) => m.CommissariLibModule),
  }
];
