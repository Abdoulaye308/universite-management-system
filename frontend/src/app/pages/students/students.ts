import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

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

  // Mode édition
  editMode = false;

  // ID étudiant à modifier
  editStudentId: number = 0;

  // Objet étudiant lié au formulaire
  student = {

    ine: '',

    nom: '',

    prenom: '',

    dateNaissance: '',

    formation: '',

    promo: '',

    anneeDebut: 0,

    anneeSortie: 0,

    diplome: '',

    autresFormations: ''
  };

  // Constructor
  constructor(
    private studentService: Student
  ) {

  }

  // Chargement automatique page
  ngOnInit(): void {

    this.getStudents();
  }

  // =========================
  // RÉCUPÉRER ÉTUDIANTS
  // =========================
  getStudents() {

    this.studentService.getStudents()
      .subscribe({

        next: (data: any) => {

          // Stocker données backend
          this.students = data;
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // AJOUTER ÉTUDIANT
  // =========================
  addStudent() {

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

  // =========================
  // SUPPRIMER ÉTUDIANT
  // =========================
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

  // =========================
  // CHARGER ÉTUDIANT À MODIFIER
  // =========================
  editStudent(student: any) {

    // Activer mode édition
    this.editMode = true;

    // Sauvegarder ID
    this.editStudentId = student.id;

    // Copier données étudiant
    this.student = {

      ine: student.ine,

      nom: student.nom,

      prenom: student.prenom,

      dateNaissance: student.dateNaissance,

      formation: student.formation,

      promo: student.promo,

      anneeDebut: student.anneeDebut,

      anneeSortie: student.anneeSortie,

      diplome: student.diplome,

      autresFormations: student.autresFormations
    };
  }

  // =========================
  // MODIFIER ÉTUDIANT
  // =========================
  updateStudent() {

    this.studentService.updateStudent(
      this.editStudentId,
      this.student
    ).subscribe({

      next: () => {

        // Rafraîchir tableau
        this.getStudents();

        // Désactiver mode édition
        this.editMode = false;

        // Reset formulaire
        this.resetForm();

        alert('Étudiant modifié');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // =========================
  // RESET FORMULAIRE
  // =========================
  resetForm() {

    this.student = {

      ine: '',

      nom: '',

      prenom: '',

      dateNaissance: '',

      formation: '',

      promo: '',

      anneeDebut: 0,

      anneeSortie: 0,

      diplome: '',

      autresFormations: ''
    };
  }
}