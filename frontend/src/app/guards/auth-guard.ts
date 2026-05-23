import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = (

  route,
  state

) => {

  // Router Angular
  const router = inject(Router);

  // Récupérer token
  const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;

  // Récupérer rôle
  const role =
  typeof window !== 'undefined'
    ? localStorage.getItem('role')
    : null;

  // Si non connecté
  if (!token) {

    router.navigate(['/login']);

    return false;
  }

  // Rôles autorisés
  const allowedRoles = route.data?.['roles'];

  // Vérification rôle
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {

    // Redirection login
    router.navigate(['/login']);

    return false;
  }

  // Autorisé
  return true;
};