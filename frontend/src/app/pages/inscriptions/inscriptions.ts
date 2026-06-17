import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Inscription
} from '../../services/inscription';

import {
  Student
} from '../../services/student';

import {
  FormationService
} from '../../services/formation.service';

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

  // LISTES

  inscriptions: any[] = [];

  students: any[] = [];

  formations: any[] = [];

  // FORMULAIRE

  inscription = {

    studentId: 0,

    formationId: 0
  };

  // MODE EDITION

  editMode = false;

  editInscriptionId = 0;

  // CONSTRUCTOR

  constructor(

    private inscriptionService:
      Inscription,

    private studentService:
      Student,

    private formationService:
      FormationService,

    private cdr:
      ChangeDetectorRef

  ) { }

  // INIT

  ngOnInit(): void {

    this.getInscriptions();

    this.getStudents();

    this.getFormations();
  }

  // INSCRIPTIONS
  getInscriptions() {

    this.inscriptionService
      .getInscriptions()
      .subscribe({

        next: (data: any[]) => {

          this.inscriptions = data;

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // ETUDIANTS

  getStudents() {

    this.studentService
      .getStudents()
      .subscribe({

        next: (data: any[]) => {

          this.students = data;

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // FORMATIONS

  getFormations() {

    this.formationService
      .getFormations()
      .subscribe({

        next: (data: any[]) => {

          this.formations = data;

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // AJOUT
  addInscription() {

    if (
      !this.inscription.studentId ||
      !this.inscription.formationId
    ) {

      alert(
        'Veuillez sélectionner un étudiant et une formation.'
      );

      return;
    }

    this.inscriptionService
      .addInscription(
        this.inscription
      )
      .subscribe({

        next: () => {

          this.getInscriptions();

          this.resetForm();

          alert(
            'Inscription ajoutée'
          );
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // EDITION
  editInscription(
    inscription: any
  ) {

    this.editMode = true;

    this.editInscriptionId =
      inscription.id;

    this.inscription = {

      studentId:
        inscription.studentId,

      formationId:
        inscription.formationId
    };
  }

  // UPDATE
  updateInscription() {

    this.inscriptionService
      .updateInscription(
        this.editInscriptionId,
        this.inscription
      )
      .subscribe({

        next: () => {

          this.getInscriptions();

          this.resetForm();

          alert(
            'Inscription modifiée'
          );
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // DELETE
  deleteInscription(
    id: number
  ) {

    if (
      !confirm(
        'Supprimer cette inscription ?'
      )
    ) {
      return;
    }

    this.inscriptionService
      .deleteInscription(id)
      .subscribe({

        next: () => {

          this.getInscriptions();

          alert(
            'Inscription supprimée'
          );
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // RESET

  resetForm() {

    this.inscription = {

      studentId: 0,

      formationId: 0
    };

    this.editMode = false;

    this.editInscriptionId = 0;
  }

  // NOM ETUDIANT
  getStudentName(
    id: number
  ) {

    const student =
      this.students.find(

        (s: any) =>
          s.id === id
      );

    return student
      ? student.prenom +
      ' ' +
      student.nom
      : 'Inconnu';
  }

  // NOM FORMATION
  getFormationName(
    id: number
  ) {

    const formation =
      this.formations.find(

        (f: any) =>
          f.id === id
      );

    return formation
      ? formation.nom
      : 'Inconnue';
  }
}