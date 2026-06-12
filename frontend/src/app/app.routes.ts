import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { DashboardEtudiant } from './pages/etudiant-dashboard/etudiant-dashboard';
import { DashboardEnseignant } from './pages/enseignant-dashboard/enseignant-dashboard';
import { DashboardAdministratif } from './pages/administratif-dashboard/administratif-dashboard';
import { Students } from './pages/students/students';
import { Formations } from './pages/formations/formations';
import { Emplois } from './pages/emplois/emplois';
import { Documents } from './pages/documents/documents';
import { Notifications } from './pages/notifications/notifications';
import { Budgets }
  from './pages/budgets/budgets';
import { AdminDocuments }
  from './pages/admin-documents/admin-documents';
import { Formateurs } from './pages/formateurs/formateurs';
import { Reunions } from './pages/reunions/reunions';
import { Users } from './pages/users/users';
import { Inscriptions } from './pages/inscriptions/inscriptions';
import { authGuard } from './guards/auth-guard';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [

  { path: 'login', component: Login },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'students', component: Students },
      { path: 'formations', component: Formations },
      { path: 'emplois', component: Emplois },

      { path: 'formateurs', component: Formateurs },
      { path: 'reunions', component: Reunions },
      { path: 'inscriptions', component: Inscriptions },
      { path: 'users', component: Users },
      {
        path: 'documents',
        loadComponent: () =>
          import('./pages/documents/documents').then(m => m.Documents)
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications/notifications').then(m => m.Notifications)
      },
      {
        path: 'admin-documents',
        component: AdminDocuments
      },
      {
        path: 'budgets',
        component: Budgets
      }

    ]
  },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },

  { path: 'etudiant/dashboard', component: DashboardEtudiant, canActivate: [authGuard], data: { roles: ['ETUDIANT'] } },
  { path: 'enseignant/dashboard', component: DashboardEnseignant, canActivate: [authGuard], data: { roles: ['ENSEIGNANT'] } },
  { path: 'administratif/dashboard', component: DashboardAdministratif, canActivate: [authGuard], data: { roles: ['ADMINISTRATIF'] } },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];