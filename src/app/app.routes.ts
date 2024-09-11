import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/periodic-table').then((r) => r.routes),
      },
      {
        path: '**',
        redirectTo: '', // TODO: Probably should render some kind of 404 page
        pathMatch: 'full',
      },
    ],
  },
];
