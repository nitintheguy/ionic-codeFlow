import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../pages/login/login.page').then((m) => m.LoginPage), // Profile as tab1
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },

    {
        path: 'tab5',
        loadComponent: () =>
          import('../tab5/tab5.page').then((m) => m.Tab5Page),
      },

      {
        path: 'tab6',
        loadComponent: () =>
          import('../tab6/tab6.page').then((m) => m.Tab6Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1', // Redirect to tab1 (profile) by default
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];