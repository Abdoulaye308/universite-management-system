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

          // Sauvegarde token JWT
          localStorage.setItem(
            'token',
            response.token
          );

          // Redirection dashboard
          this.router.navigate(['/dashboard']);

          console.log('Connexion réussie');
        },

        error: (error: any) => {

          console.log(error);

          alert('Email ou mot de passe incorrect');
        }
      });
  }
}
