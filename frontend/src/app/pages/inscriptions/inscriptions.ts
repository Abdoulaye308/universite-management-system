import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Inscription } from '../../services/inscription';

import { Student } from '../../services/student';

import { FormationService } from '../../services/formation.service';

@Component({
  selector: 'app-inscriptions',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './inscriptions.html',

  styleUrl: './inscriptions.css'
})
export class Inscriptions
  implements OnInit {

  // Liste inscriptions
  inscriptions: any[] = [];

  // Liste étudiants
  students: any[] = [];

  // Liste formations
  formations: any[] = [];

  // Formulaire
  inscription = {

    studentId: 0,

    formationId: 0
  };

  // Constructor
  constructor(

    private inscriptionService:
      Inscription,

    private studentService:
      Student,

    private formationService: FormationService,
    private cdr: ChangeDetectorRef

  ) {

  }

  // Chargement page
  ngOnInit(): void {

    this.getInscriptions();

    this.getStudents();

    this.getFormations();
  }

  // =========================
  // CHARGER INSCRIPTIONS
  // =========================
  getInscriptions() {

    this.inscriptionService
      .getInscriptions()
      .subscribe({

        next: (data: any) => {

          this.inscriptions = data;
          this.cdr.detectChanges();      // force la mise à jour de la vue

        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // CHARGER ÉTUDIANTS
  // =========================
  getStudents() {

    this.studentService
      .getStudents()
      .subscribe({

        next: (data: any) => {

          this.students = data;
          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // CHARGER FORMATIONS
  // =========================
  getFormations() {

    this.formationService
      .getFormations()
      .subscribe({

        next: (data: any) => {

          this.formations = data;
          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // AJOUTER
  // =========================
  addInscription() {

    this.inscriptionService
      .addInscription(this.inscription)
      .subscribe({

        next: () => {

          this.getInscriptions();

          this.inscription = {

            studentId: 0,

            formationId: 0
          };

          alert('Inscription ajoutée');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // DELETE
  // =========================
  deleteInscription(id: number) {

    this.inscriptionService
      .deleteInscription(id)
      .subscribe({

        next: () => {

          this.getInscriptions();

          alert('Inscription supprimée');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // NOM ÉTUDIANT
  // =========================
  getStudentName(id: number) {

    const student =
      this.students.find(
        s => s.id === id
      );

    return student
      ? student.prenom + ' ' + student.nom
      : 'Inconnu';
  }

  // =========================
  // NOM FORMATION
  // =========================
  getFormationName(id: number) {

    const formation =
      this.formations.find(
        f => f.id === id
      );

    return formation
      ? formation.nom
      : 'Inconnue';
  }
}