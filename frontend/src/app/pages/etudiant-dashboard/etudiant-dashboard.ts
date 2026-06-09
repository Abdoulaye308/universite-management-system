import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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

  // Étudiant connecté
  student: any = null;
  // Formations étudiant
  formations: any[] = [];
  // Emplois du temps étudiant
  emplois: any[] = [];

  documents: any[] = [];

  // Constructor
  constructor(

    private router: Router,
    private inscriptionService: Inscription,

    private formationService: FormationService,
    private studentService: Student,
    private emploiService: Emploi,
    private documentService: Document,
    private cdr: ChangeDetectorRef   // ← ajout

  ) {

  }

  // =========================
  // AU CHARGEMENT
  // =========================
  ngOnInit(): void {

    // Email connecté
    const email =
      localStorage.getItem('email');

    // Vérification email
    if (email) {

      this.studentService
        .getStudentByEmail(email)
        .subscribe({

          next: (data: any) => {

            // Étudiant connecté
            this.student = data;

            // Charger ses inscriptions
            this.loadStudentFormations();
            this.loadDocuments();

            this.cdr.detectChanges();

            console.log(data);
          },

          error: (error: any) => {

            console.log(error);
          }
        });
    }
  }

  // =========================
  // FORMATIONS ÉTUDIANT
  // =========================
  loadStudentFormations() {
    if (!this.student) return;

    this.inscriptionService.getByStudent(this.student.id).subscribe({
      next: (inscriptions: any[]) => {

        // Collecter tous les observables de formation
        const requests = inscriptions.map((inscription: any) =>
          this.formationService.getFormationById(inscription.formationId)
        );

        // Si aucune inscription
        if (requests.length === 0) {
          this.formations = [];
          this.cdr.detectChanges();
          return;
        }

        // Attendre TOUTES les formations en parallèle
        forkJoin(requests).subscribe({
          next: (formations: any) => {
            this.formations = [...formations];  // nouveau référentiel
            // Charger emplois du temps
            this.loadEmplois();

            this.cdr.detectChanges();           // force la vue
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

  // =========================
  // EMPLOIS DU TEMPS
  // =========================
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
  // =========================
  // DÉCONNEXION
  // =========================
  logout() {

    // Supprimer token
    localStorage.removeItem('token');

    // Supprimer rôle
    localStorage.removeItem('role');

    // Supprimer email
    localStorage.removeItem('email');

    // Redirection login
    this.router.navigate(['/login']);
  }
}