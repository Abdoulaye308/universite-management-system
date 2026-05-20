import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Dashboard } from './pages/dashboard/dashboard';

import { Students } from './pages/students/students';

import { Formations } from './pages/formations/formations';

import { Emplois } from './pages/emplois/emplois';

import { Formateurs } from './pages/formateurs/formateurs';

import { Reunions } from './pages/reunions/reunions';

export const routes: Routes = [

{
path: '',
component: Login
},

{
path: 'dashboard',
component: Dashboard
},

{
path: 'students',
component: Students
},

{
path: 'formations',
component: Formations
},

{
path: 'emplois',
component: Emplois
},

{
path: 'formateurs',
component: Formateurs
},

{
path: 'reunions',
component: Reunions
}
];
