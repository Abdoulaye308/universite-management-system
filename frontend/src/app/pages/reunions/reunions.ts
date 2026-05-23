import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Reunion } from '../../services/reunion';

@Component({
  selector: 'app-reunions',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './reunions.html',

  styleUrl: './reunions.css'
})
export class Reunions implements OnInit {

  // Liste réunions
  reunions: any[] = [];

  // Formulaire
  reunion = {

    type: '',

    sujet: '',

    date: '',

    heure: '',

    salle: '',

    participants: '',

    compteRendu: ''
  };

  // Mode édition
  editMode = false;

  // ID édition
  editReunionId = 0;

  // Constructor
  constructor(
    private reunionService: Reunion,
    private cdr: ChangeDetectorRef

  ) {

  }

  // Chargement page
  ngOnInit(): void {

    this.getReunions();
  }

  // =========================
  // LISTE
  // =========================
  getReunions() {

    this.reunionService.getReunions()
      .subscribe({

        next: (data: any) => {

          this.reunions = data;
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
  addReunion() {

    this.reunionService.addReunion(
      this.reunion
    ).subscribe({

      next: () => {

        this.getReunions();

        this.resetForm();

        alert('Réunion ajoutée');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // =========================
  // ÉDITION
  // =========================
  editReunion(reunion: any) {

    this.editMode = true;

    this.editReunionId = reunion.id;

    this.reunion = {

      type: reunion.type,

      sujet: reunion.sujet,

      date: reunion.date,

      heure: reunion.heure,

      salle: reunion.salle,

      participants: reunion.participants,

      compteRendu: reunion.compteRendu
    };
  }

  // =========================
  // UPDATE
  // =========================
  updateReunion() {

    this.reunionService.updateReunion(
      this.editReunionId,
      this.reunion
    ).subscribe({

      next: () => {

        this.getReunions();

        this.editMode = false;

        this.resetForm();

        alert('Réunion modifiée');
      },

      error: (error: any) => {

        console.log(error);
      }
    });
  }

  // =========================
  // DELETE
  // =========================
  deleteReunion(id: number) {

    this.reunionService.deleteReunion(id)
      .subscribe({

        next: () => {

          this.getReunions();

          alert('Réunion supprimée');
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

    this.reunion = {

      type: '',

      sujet: '',

      date: '',

      heure: '',

      salle: '',

      participants: '',

      compteRendu: ''
    };
  }
}