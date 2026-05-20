import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Formation } from '../../services/formation';

@Component({
  selector: 'app-formations',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './formations.html',

  styleUrl: './formations.css'
})
export class Formations implements OnInit {

  // Liste formations
  formations: any[] = [];

  // Mode édition
  editMode = false;

  // ID formation à modifier
  editFormationId: number = 0;

  // Objet formulaire
  formation = {

    nom: '',

    typeFormation: '',

    niveau: '',

    dateDebut: '',

    dateFin: '',

    financement: '',

    nombreHommes: 0,

    nombreFemmes: 0
  };

  // Constructor
  constructor(
    private formationService: Formation
  ) {

  }

  // Chargement page
  ngOnInit(): void {

    this.getFormations();
  }

  // =========================
  // LISTE FORMATIONS
  // =========================
  getFormations() {

    this.formationService.getFormations()
      .subscribe({

        next: (data: any) => {

          this.formations = data;
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // AJOUTER FORMATION
  // =========================
  addFormation() {

    this.formationService.addFormation(this.formation)
      .subscribe({

        next: () => {

          this.getFormations();

          this.resetForm();

          alert('Formation ajoutée');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // MODIFIER FORMATION
  // =========================
  updateFormation() {

    this.formationService.updateFormation(
      this.editFormationId,
      this.formation
    ).subscribe({

      next: () => {

        this.getFormations();

        this.editMode = false;

        this.resetForm();

        alert('Formation modifiée');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // =========================
  // SUPPRIMER FORMATION
  // =========================
  deleteFormation(id: number) {

    this.formationService.deleteFormation(id)
      .subscribe({

        next: () => {

          this.getFormations();

          alert('Formation supprimée');
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =========================
  // CHARGER FORMATION
  // =========================
  editFormation(formation: any) {

    this.editMode = true;

    this.editFormationId = formation.id;

    this.formation = {

      nom: formation.nom,

      typeFormation: formation.typeFormation,

      niveau: formation.niveau,

      dateDebut: formation.dateDebut,

      dateFin: formation.dateFin,

      financement: formation.financement,

      nombreHommes: formation.nombreHommes,

      nombreFemmes: formation.nombreFemmes
    };
  }

  // =========================
  // RESET FORMULAIRE
  // =========================
  resetForm() {

    this.formation = {

      nom: '',

      typeFormation: '',

      niveau: '',

      dateDebut: '',

      dateFin: '',

      financement: '',

      nombreHommes: 0,

      nombreFemmes: 0
    };
  }
}