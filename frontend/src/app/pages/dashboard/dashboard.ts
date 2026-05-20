import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [RouterLink],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})
export class Dashboard {

  // Constructor
  constructor(
    private router: Router
  ) {

  }

  // Déconnexion
  logout() {

    // Suppression token
    localStorage.removeItem('token');

    // Redirection login
    this.router.navigate(['']);
  }
}