import { Route } from '@angular/router';
import { ContentLayoutComponent } from '@mimit/shared';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: 'ispettori',
    loadChildren: () =>
      import('ispettori/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'commissari',
    loadChildren: () =>
      import('commissari/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [{ path: '', component: NxWelcomeComponent }],
  },
];
