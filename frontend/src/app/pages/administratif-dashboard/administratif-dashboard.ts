import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService }
  from '../../services/notification.service';
import { CommonModule }
  from '@angular/common';

import { Router }
  from '@angular/router';

import { Reunion }
  from '../../services/reunion';

import { User }
  from '../../services/user';

import { Document }
  from '../../services/document';
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

  documents: any[] = [];
  // =========================
  // NOTIFICATIONS
  // =========================

  notifications: any[] = [];


  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private router: Router,

    private userService: User,

    private reunionService: Reunion,

    private documentService: Document,
    private notificationService: NotificationService,

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
          this.loadDocuments();
          this.loadNotifications();
          // Pas de cdr.detectChanges() ici
        },
        error: (error: any) => { console.log(error); }
      });
    }
  }
  // =========================
  // CHARGER RÉUNIONS
  // =========================

 // =========================
// VISIBILITE REUNION
// =========================
isReunionActive(
  reunion: any
): boolean {

  if (!reunion.date) {
    return false;
  }

  const dateReunion =
    new Date(reunion.date);

  const aujourdHui =
    new Date();

  // Tolérance de 1 jour
  dateReunion.setDate(
    dateReunion.getDate() + 1
  );

  return dateReunion >= aujourdHui;
}
isReunionVisible(
  reunion: any
): boolean {

  if (
    !this.isReunionActive(
      reunion
    )
  ) {
    return false;
  }

  if (
    reunion.cible === 'TOUS'
  ) {
    return true;
  }

  if (
    reunion.cible === 'ADMINISTRATIFS'
  ) {
    return true;
  }

  if (
    reunion.cible === 'SERVICE'
    &&
    reunion.serviceConcerne ===
    this.user.service
  ) {
    return true;
  }

  return false;
}
loadReunions() {

  this.reunionService
    .getReunions()
    .subscribe({

      next: (data: any[]) => {

        this.reunions =
          data.filter(

            (reunion: any) =>

              this.isReunionVisible(
                reunion
              )
          );

        this.cdr.detectChanges();

        console.log(
          this.reunions
        );
      },

      error: (error: any) => {

        console.log(error);
      }
    });
}

  loadDocuments() {

    this.documentService
      .getDocumentsByRole(
        'ADMINISTRATIF'
      )
      .subscribe({

        next: (data: any) => {

          this.documents = data;
        }
      });
  }// =========================
  // CHARGER NOTIFICATIONS
  // =========================

  loadNotifications() {

    this.notificationService
      .getNotifications()
      .subscribe({

        next: (data: any[]) => {

          this.notifications = data.filter(

            (notification: any) =>

              notification.roleCible ===
              this.user.role

              ||

              notification.roleCible ===
              'TOUS')
            .slice(-3)
            .reverse();
          ;

          this.cdr.detectChanges();


        },

        error: (error: any) => {

          console.log(error);
        }
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