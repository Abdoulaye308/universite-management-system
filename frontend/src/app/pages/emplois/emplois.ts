import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormationService } from '../../services/formation.service';

import { Formateur } from '../../services/formateur';

import { FormsModule } from '@angular/forms';

import { Emploi } from '../../services/emploi';

@Component({
  selector: 'app-emplois',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './emplois.html',

  styleUrl: './emplois.css'
})
export class Emplois implements OnInit {

  // Liste emplois
  emplois: any[] = [];

  // Liste formations
  formations: any[] = [];

  // Liste formateurs
  formateurs: any[] = [];

  // Formulaire
  emploi = {

    formation: '',

    jour: '',

    heureDebut: '',

    heureFin: '',

    salle: '',

    module: '',

    enseignant: ''
  };

  // Mode édition
  editMode = false;

  // ID édition
  editEmploiId = 0;

  // Constructor
  constructor(
    private emploiService: Emploi,
    private formationService: FormationService,

    private formateurService: Formateur,
    private cdr: ChangeDetectorRef

  ) {

  }

  // Chargement page
  ngOnInit(): void {

    this.getEmplois();
    this.getFormations();

    this.getFormateurs();
  }

  // CHARGER EMPLOIS
  getEmplois() {

    this.emploiService.getEmplois()
      .subscribe({

        next: (data: any) => {

          this.emplois = data;
          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

// LISTE FORMATIONS
getFormations() {

  this.formationService
    .getFormations()
    .subscribe({

      next: (data: any) => {

        this.formations = data;
      },

      error: (error: any) => {

        console.log(error);
      }
    });
}

// LISTE FORMATEURS
getFormateurs() {

  this.formateurService
    .getFormateurs()
    .subscribe({

      next: (data: any) => {

        this.formateurs = data;
      },

      error: (error: any) => {

        console.log(error);
      }
    });
}

  // AJOUTER EMPLOI
  addEmploi() {
      if (
    !this.emploi.formation?.trim() ||
    !this.emploi.heureDebut?.trim() ||
    !this.emploi.heureFin?.trim() ||
    !this.emploi.enseignant?.trim()
  ) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

    this.emploiService.addEmploi(this.emploi)
      .subscribe({

        next: () => {

          this.getEmplois();

          this.resetForm();

          alert('Séance ajoutée');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // CHARGER ÉDITION
  editEmploi(emploi: any) {

    this.editMode = true;

    this.editEmploiId = emploi.id;

    this.emploi = {

      formation: emploi.formation,

      jour: emploi.jour,

      heureDebut: emploi.heureDebut,

      heureFin: emploi.heureFin,

      salle: emploi.salle,

      module: emploi.module,

      enseignant: emploi.enseignant
    };
  }

  // UPDATE
  updateEmploi() {

    this.emploiService.updateEmploi(
      this.editEmploiId,
      this.emploi
    ).subscribe({

      next: () => {

        this.getEmplois();

        this.editMode = false;

        this.resetForm();

        alert('Séance modifiée');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // DELETE
  deleteEmploi(id: number) {

    this.emploiService.deleteEmploi(id)
      .subscribe({

        next: () => {

          this.getEmplois();

          alert('Séance supprimée');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }


  // RESET
  resetForm() {

    this.emploi = {

      formation: '',

      jour: '',

      heureDebut: '',

      heureFin: '',

      salle: '',

      module: '',

      enseignant: ''
    };
  }
}