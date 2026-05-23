import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  // Email utilisateur
  email = '';

  // Mot de passe utilisateur
  password = '';

  // Constructor
  constructor(

    private authService: Auth,

    private router: Router

  ) {

  }

  // Méthode connexion
  onLogin() {

    // Données login
    const loginData = {

      email: this.email,

      password: this.password
    };

    // Appel API backend
    this.authService.login(loginData)
      .subscribe({

        next: (response: any) => {

          // Vérification navigateur
          if (typeof window !== 'undefined') {

            // Sauvegarder JWT
            localStorage.setItem(
              'token',
              response.token
            );

            // Sauvegarder rôle
            localStorage.setItem(
              'role',
              response.role
            );
          }

          console.log(response);

          // =========================
          // REDIRECTION SELON ROLE
          // =========================

          // ADMIN
          if (response.role === 'ADMIN') {

            this.router.navigate([
              '/admin/dashboard'
            ]);
          }

          // ETUDIANT
          else if (response.role === 'ETUDIANT') {

            this.router.navigate([
              '/etudiant/dashboard'
            ]);
          }

          // ENSEIGNANT
          else if (response.role === 'ENSEIGNANT') {

            this.router.navigate([
              '/enseignant/dashboard'
            ]);
          }

          // ADMINISTRATIF
          else if (response.role === 'ADMINISTRATIF') {

            this.router.navigate([
              '/administratif/dashboard'
            ]);
          }
        },
        error: (err) => {
          console.error('Erreur de connexion:', err);
          // Ajoutez ici la gestion d'erreur (message à l'utilisateur, etc.)
        },
        complete: () => {
          console.log('Requête de connexion terminée');
        }
      });
  }
}