import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Router }
from '@angular/router';

import { Reunion }
from '../../services/reunion';

import { User }
from '../../services/user';

@Component({
  selector:
    'app-dashboard-administratif',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './administratif-dashboard.html',

  styleUrl:
    './administratif-dashboard.css'
})
export class DashboardAdministratif
  implements OnInit {

  // =========================
  // UTILISATEUR CONNECTÉ
  // =========================

  user: any = null;

  // =========================
  // RÉUNIONS
  // =========================

  reunions: any[] = [];

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private router: Router,

    private userService: User,

    private reunionService: Reunion,
        private cdr: ChangeDetectorRef


  ) {

  }

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {
  const email = localStorage.getItem('email');

  if (email) {
    this.userService.getByEmail(email).subscribe({
      next: (data: any) => {
        this.user = { ...data };
        console.log(this.user);
        this.loadReunions();
        // Pas de cdr.detectChanges() ici
      },
      error: (error: any) => { console.log(error); }
    });
  }
}
  // =========================
  // CHARGER RÉUNIONS
  // =========================

  loadReunions() {
  this.reunionService.getReunions().subscribe({
    next: (data: any[]) => {

      // cdr.detectChanges() était dans le .filter() — bug !
      this.reunions = [...data.filter(
        (reunion: any) => reunion.serviceConcerne === this.user.service
      )];
      this.cdr.detectChanges(); // ← après l'assignation, pas dedans

      console.log(this.reunions);
    },
    error: (error: any) => { console.log(error); }
  });
}

  // =========================
  // LOGOUT
  // =========================

  logout() {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );

    localStorage.removeItem(
      'email'
    );

    this.router.navigate([
      '/login'
    ]);
  }
}