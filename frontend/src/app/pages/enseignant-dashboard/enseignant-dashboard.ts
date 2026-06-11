import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService }
  from '../../services/notification.service';
import { Document }
  from '../../services/document';
import { CommonModule }
  from '@angular/common';

import { Router }
  from '@angular/router';

import { Reunion }
  from '../../services/reunion';

import { Emploi }
  from '../../services/emploi';

import { Formateur }
  from '../../services/formateur';

@Component({
  selector:
    'app-dashboard-enseignant',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './enseignant-dashboard.html',

  styleUrl:
    './enseignant-dashboard.css'
})
export class DashboardEnseignant
  implements OnInit {

  // =========================
  // FORMATEUR CONNECTÉ
  // =========================

  formateur: any = null;

  // =========================
  // RÉUNIONS
  // =========================

  reunions: any[] = [];

  // =========================
  // EMPLOIS
  // =========================

  emplois: any[] = [];

  // =========================
  // NOTIFICATIONS
  // =========================

  notifications: any[] = [];
  documents: any[] = [];

  // =========================
  // CONSTRUCTOR
  // =========================
  constructor(

    private router: Router,

    private formateurService: Formateur,

    private reunionService: Reunion,

    private emploiService: Emploi,
    private documentService: Document,


    private notificationService: NotificationService,

    private cdr: ChangeDetectorRef

  ) { }

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    // Email connecté
    const email =
      localStorage.getItem(
        'email'
      );

    if (email) {

      // Charger formateur
      this.formateurService
        .getByEmail(email)
        .subscribe({

          next: (data: any) => {

            this.formateur = data;

            console.log(
              this.formateur
            );

            // Charger données
            this.loadReunions();

            this.loadEmplois();
            this.loadNotifications();
                      this.loadDocuments();

            this.cdr.detectChanges();

          },

          error: (error: any) => {

            console.log(error);
          }
        });
    }
  }

  // =========================
  // CHARGER RÉUNIONS
  // =========================

  loadReunions() {
    this.reunionService.getReunions().subscribe({
      next: (data: any[]) => {
        this.reunions = [...data.filter(
          (reunion: any) => reunion.formateurId === this.formateur.id
        )];
        this.cdr.detectChanges(); // ✓ déjà présent
      },
      error: (error: any) => { console.log(error); }
    });
  }

  // =========================
  // CHARGER EMPLOIS
  // =========================

  loadEmplois() {
    this.emploiService.getEmplois().subscribe({
      next: (data: any[]) => {
        this.emplois = [...data.filter(
          (emploi: any) =>
            emploi.enseignant === this.formateur.nom + ' ' + this.formateur.prenom
        )];
        this.cdr.detectChanges(); // ← manquait ici
      },
      error: (error: any) => { console.log(error); }
    });
  }
  // =========================
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
              'ENSEIGNANT')
            .slice(-3)
            .reverse();
          ;

          this.cdr.detectChanges();

          console.log(
            this.notifications
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
        'ENSEIGNANT'
      )
      .subscribe({

        next: (data: any) => {

          this.documents = data;
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