import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { User } from '../../services/user';

@Component({
  selector: 'app-users',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './users.html',

  styleUrl: './users.css'
})
export class Users implements OnInit {

  // Liste utilisateurs
  users: any[] = [];

  // Formulaire utilisateur
  user = {

    nom: '',

    prenom: '',

    email: '',

    password: '',

    role: 'ETUDIANT',

    service: ''
  };

  editMode = false;

  editUserId = 0;

  // Constructor
  constructor(
    private userService: User,
    private cdr: ChangeDetectorRef
  ) { }

  // Chargement page
  ngOnInit(): void {

    this.getUsers();
  }

  // CHARGER USERS
  getUsers() {
    this.userService.getUsers()
      .subscribe({
        next: (data: any) => {
          this.users = [...data];
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  // AJOUT USER
  addUser() {

    this.userService.addUser(this.user)
      .subscribe({

        next: () => {

          this.getUsers();

          this.resetForm();

          alert('Utilisateur ajouté');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // CHARGER USER ÉDITION
  editUser(user: any) {

    this.editMode = true;

    this.editUserId = user.id;

    this.user = {

      nom: user.nom,

      prenom: user.prenom,

      email: user.email,

      password: '',

      role: user.role,

      service: user.service

    };
  }

  // UPDATE USER
  updateUser() {

    this.userService.updateUser(
      this.editUserId,
      this.user
    ).subscribe({

      next: () => {

        this.getUsers();

        this.editMode = false;

        this.resetForm();

        alert('Utilisateur modifié');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // DELETE USER
  deleteUser(id: number) {

    this.userService.deleteUser(id)
      .subscribe({

        next: () => {

          this.getUsers();

          alert('Utilisateur supprimé');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }
getRoleClass(role: string): string {
  const map: any = {
    'ADMIN':          'role-admin',
    'ETUDIANT':       'role-etudiant',
    'ENSEIGNANT':     'role-enseignant',
    'ADMINISTRATIF':  'role-administratif'
  };
  return map[role] || '';
}

  // RESET 
  resetForm() {

    this.user = {

      nom: '',

      prenom: '',

      email: '',

      password: '',

      role: 'ETUDIANT',

      service: ''

    };
  }
}