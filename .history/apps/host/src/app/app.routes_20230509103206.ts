import { Route } from '@angular/router';
import { ContentLayoutComponent } from '@mimit/shared';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
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
    ],
  },
];
