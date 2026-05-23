import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Formateur } from '../../services/formateur';

@Component({
  selector: 'app-formateurs',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './formateurs.html',

  styleUrl: './formateurs.css'
})
export class Formateurs implements OnInit {

  // Liste formateurs
  formateurs: any[] = [];

  // Formulaire
  formateur = {

    nom: '',

    prenom: '',

    email: '',

    grade: '',

    type: '',

    specialite: ''
  };

  // Mode édition
  editMode = false;

  // ID édition
  editFormateurId = 0;

  // Constructor
  constructor(
    private formateurService: Formateur,
    private cdr: ChangeDetectorRef

  ) {

  }

  // Chargement page
  ngOnInit(): void {

    this.getFormateurs();
  }

  // =========================
  // LISTE
  // =========================
  getFormateurs() {

    this.formateurService.getFormateurs()
      .subscribe({

        next: (data: any) => {

          this.formateurs = data;
          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // AJOUT
  // =========================
  addFormateur() {

    this.formateurService.addFormateur(
      this.formateur
    ).subscribe({

      next: () => {

        this.getFormateurs();

        this.resetForm();

        alert('Formateur ajouté');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // =========================
  // CHARGER ÉDITION
  // =========================
  editFormateur(formateur: any) {

    this.editMode = true;

    this.editFormateurId = formateur.id;

    this.formateur = {

      nom: formateur.nom,

      prenom: formateur.prenom,

      email: formateur.email,

      grade: formateur.grade,

      type: formateur.type,

      specialite: formateur.specialite
    };
  }

  // =========================
  // UPDATE
  // =========================
  updateFormateur() {

    this.formateurService.updateFormateur(
      this.editFormateurId,
      this.formateur
    ).subscribe({

      next: () => {

        this.getFormateurs();

        this.editMode = false;

        this.resetForm();

        alert('Formateur modifié');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // =========================
  // DELETE
  // =========================
  deleteFormateur(id: number) {

    this.formateurService.deleteFormateur(id)
      .subscribe({

        next: () => {

          this.getFormateurs();

          alert('Formateur supprimé');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // RESET
  // =========================
  resetForm() {

    this.formateur = {

      nom: '',

      prenom: '',

      email: '',

      grade: '',

      type: '',

      specialite: ''
    };
  }
}