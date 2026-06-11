import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Dashboard } from './pages/dashboard/dashboard';

import { DashboardEtudiant } from './pages/etudiant-dashboard/etudiant-dashboard';

import { DashboardEnseignant } from './pages/enseignant-dashboard/enseignant-dashboard';

import { DashboardAdministratif } from './pages/administratif-dashboard/administratif-dashboard';

import { Students } from './pages/students/students';

import { Formations } from './pages/formations/formations';

import { Emplois } from './pages/emplois/emplois';

import { Formateurs } from './pages/formateurs/formateurs';

import { Reunions } from './pages/reunions/reunions';

import { Users } from './pages/users/users';

import { authGuard } from './guards/auth-guard';

import { Inscriptions } from './pages/inscriptions/inscriptions';

export const routes: Routes = [

{
path: 'login',
component: Login
},

{
  path: 'admin/dashboard',

  component: Dashboard,

  canActivate: [authGuard],

  data: {

    roles: ['ADMIN']
  }
},

{
  path: 'etudiant/dashboard',

  component: DashboardEtudiant,

  canActivate: [authGuard],

  data: {

    roles: ['ETUDIANT']
  }
},

{
  path: 'enseignant/dashboard',

  component: DashboardEnseignant,

  canActivate: [authGuard],

  data: {

    roles: ['ENSEIGNANT']
  }
},

{
  path: 'administratif/dashboard',

  component: DashboardAdministratif,

  canActivate: [authGuard],

  data: {

    roles: ['ADMINISTRATIF']
  }
},

{
  path: 'admin/users',

  component: Users,

  canActivate: [authGuard],

  data: {

    roles: ['ADMIN']
  }
},

{
path: 'admin/students',
component: Students
},

{
path: 'admin/formations',
component: Formations
},


{
  path: 'admin/emplois',

  component: Emplois,

  canActivate: [authGuard],

  data: {

    roles: ['ADMIN']
  }
},

{
  path: 'admin/formateurs',

  component: Formateurs,

  canActivate: [authGuard],

  data: {

    roles: ['ADMIN']
  }
},

{
  path: 'admin/reunions',

  component: Reunions,

  canActivate: [authGuard],

  data: {

    roles: ['ADMIN']
  }
},

{
  path: 'admin/inscriptions',

  component: Inscriptions,

  canActivate: [authGuard],

  data: {

    roles: ['ADMIN']
  }
},

{
  path: 'documents',
  loadComponent: () =>
    import(
      './pages/documents/documents'
    ).then(
      m => m.Documents
    )
},

{
  path: 'notifications',
  loadComponent: () =>
    import(
      './pages/notifications/notifications'
    ).then(
      m => m.Notifications
    )
},

{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},

{
  path: '**',
  redirectTo: 'login'
}

];
