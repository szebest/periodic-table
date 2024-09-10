import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layout';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        // TODO: add default view here, for now it is just AppComponent
        component: AppComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
