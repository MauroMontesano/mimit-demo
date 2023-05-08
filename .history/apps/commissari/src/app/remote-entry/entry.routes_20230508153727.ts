import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@mimit/commissari-lib').then((m) => m.CommissariLibModule),
  }
];
