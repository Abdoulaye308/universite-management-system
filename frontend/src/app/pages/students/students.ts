import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {
  FormationService
} from '../../services/formation.service';

import { Student } from '../../services/student';

@Component({
  selector: 'app-students',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './students.html',

  styleUrl: './students.css'
})
export class Students implements OnInit {

  // Liste des étudiants
  students: any[] = [];

formations: any[] = [];
  // Mode édition
  editMode = false;

  // ID étudiant à modifier
  editStudentId: number = 0;

  // Objet étudiant lié au formulaire
  student = {

    ine: '',

    nom: '',

    prenom: '',

    email: '',

    dateNaissance: '',

    formation: '',

    promo: '',

    anneeDebut: 0,

    anneeSortie: 0,

    diplome: '',

        formationId: 0,


    autresFormations: ''
  };

  // Constructor
  constructor(
    private studentService: Student,
    private formationService:
      FormationService,
      private cdr: ChangeDetectorRef

  ) {

  }

  // Chargement automatique page
  ngOnInit(): void {

    this.getStudents();
    this.getFormations();

  }

  // RÉCUPÉRER ÉTUDIANTS
  getStudents() {

    this.studentService.getStudents()
      .subscribe({

        next: (data: any) => {

          // Stocker données backend
          this.students = data;
          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

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
  onFormationChange() {
  const f = this.formations.find(f => f.id == this.student.formationId);
  if (f) {
    this.student.formation = f.nom;
  }
}


  // AJOUTER ÉTUDIANT
  addStudent() {
     if (
    !this.student.nom?.trim() ||
    !this.student.prenom?.trim() ||
    !this.student.ine?.trim() ||
    !this.student.dateNaissance ||
    !this.student.promo.trim()
  ) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

    this.studentService.addStudent(this.student)
      .subscribe({

        next: () => {

          // Rafraîchir tableau
          this.getStudents();

          // Réinitialiser formulaire
          this.resetForm();

          alert('Étudiant ajouté');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // SUPPRIMER ÉTUDIANT
  deleteStudent(id: number) {

    this.studentService.deleteStudent(id)
      .subscribe({

        next: () => {

          // Rafraîchir tableau
          this.getStudents();

          alert('Étudiant supprimé');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }
  // CHARGER ÉTUDIANT À MODIFIER
  editStudent(student: any) {

    this.editMode = true;

    this.editStudentId = student.id;

    this.student = {

      ine: student.ine,

      nom: student.nom,

      prenom: student.prenom,

      email: student.email,

      dateNaissance: student.dateNaissance,

      formation: student.formation,

      promo: student.promo,

      anneeDebut: student.anneeDebut,

      anneeSortie: student.anneeSortie,

      diplome: student.diplome,

  formationId:student.formationId,


      autresFormations: student.autresFormations
    };
  }

  // MODIFIER ÉTUDIANT
  updateStudent() {

    this.studentService.updateStudent(
      this.editStudentId,
      this.student
    ).subscribe({

      next: () => {

        this.getStudents();

        this.editMode = false;

        this.resetForm();

        alert('Étudiant modifié');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // télécharger le pdf
  downloadPdf() {

  this.studentService
    .exportPdf()
    .subscribe({

      next: (data: Blob) => {

        const fileURL =
          window.URL.createObjectURL(data);

        const link =
          document.createElement('a');

        link.href = fileURL;

        link.download =
          'etudiants.pdf';

        link.click();
      }
    });
}
exportPdf() {

  window.open(
    'http://localhost:8080/api/students/export/pdf',
    '_blank'
  );
  alert(
            'Pdf téléchargé'
          );

}

  // RESET FORMULAIRE
  resetForm() {

    this.student = {

      ine: '',

      nom: '',

      prenom: '',

      email: '',

      dateNaissance: '',

      formation: '',

      promo: '',

      anneeDebut: 0,

      anneeSortie: 0,

      diplome: '',
              formationId: 0,


      autresFormations: ''
    };
  }
}