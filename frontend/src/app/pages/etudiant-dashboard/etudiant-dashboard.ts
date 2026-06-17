import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService }
  from '../../services/notification.service';
import { Inscription } from '../../services/inscription';
import { FormationService } from '../../services/formation.service';

import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Emploi } from '../../services/emploi';
import { CommonModule } from '@angular/common';

import { Student } from '../../services/student';
import { Document }
  from '../../services/document';

@Component({
  selector: 'app-dashboard-etudiant',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './etudiant-dashboard.html',

  styleUrl: './etudiant-dashboard.css'
})
export class DashboardEtudiant
  implements OnInit {
  student: any = null;
  formations: any[] = [];
  emplois: any[] = [];
  documents: any[] = [];
  notifications: any[] = [];

  // Constructor
  constructor(

    private router: Router,
    private inscriptionService: Inscription,

    private formationService: FormationService,
    private studentService: Student,
    private emploiService: Emploi,
    private documentService: Document,
    private notificationService: NotificationService,

    private cdr: ChangeDetectorRef   // ← ajout

  ) {

  }

  // AU CHARGEMENT
  ngOnInit(): void {
    const email =
      localStorage.getItem('email');
    if (email) {
      this.studentService
        .getStudentByEmail(email)
        .subscribe({
          next: (data: any) => {
            this.student = data;
            this.loadStudentFormations();
            this.loadDocuments();
            this.loadNotifications();
            this.cdr.detectChanges();

            console.log(data);
          },

          error: (error: any) => {

            console.log(error);
          }
        });
    }
  }

  // FORMATIONS ÉTUDIANT
  loadStudentFormations() {
    if (!this.student) return;
    this.inscriptionService.getByStudent(this.student.id).subscribe({
      next: (inscriptions: any[]) => {
        const requests = inscriptions.map((inscription: any) =>
          this.formationService.getFormationById(inscription.formationId)
        );
        if (requests.length === 0) {
          this.formations = [];
          this.cdr.detectChanges();
          return;
        }
        forkJoin(requests).subscribe({
          next: (formations: any) => {
            this.formations = [...formations]; 
            this.loadEmplois();
            this.cdr.detectChanges();           
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  // EMPLOIS DU TEMPS
  loadEmplois() {
    this.emploiService.getEmplois().subscribe({
      next: (data: any[]) => {

        this.emplois = [...data.filter(
          (emploi: any) =>
            this.formations.some(
              (formation: any) => formation.nom === emploi.formation
            )
        )];

        this.cdr.detectChanges(); // ← manquait ici
        console.log(this.emplois);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  loadDocuments() {

    this.documentService
      .getDocumentsByRole(
        'ETUDIANT'
      )
      .subscribe({

        next: (data: any) => {

          this.documents = data;
        }
      });
  }
  
  // CHARGER NOTIFICATIONS
  loadNotifications() {

    this.notificationService
      .getNotifications()
      .subscribe({

        next: (data: any[]) => {

          this.notifications = data.filter(

            (notification: any) =>

              notification.roleCible ===
              'ETUDIANT')
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

  // DÉCONNEXION
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}