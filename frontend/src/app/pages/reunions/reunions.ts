import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Reunion } from '../../services/reunion';

import { FormationService } from '../../services/formation.service';

import { Formateur } from '../../services/formateur';

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
export class Reunions
  implements OnInit {

  // LISTES
  reunions: any[] = [];

  formations: any[] = [];

  formateurs: any[] = [];

  // FORMULAIRE

  reunion = {

    type: '',

    sujet: '',

    date: '',

    heure: '',

    salle: '',

    participants: '',

    formationId: 0,

    formationNom: '',

    cible: '',

    compteRendu: '',

    serviceConcerne: ''
  };

  // MODE ÉDITION

  editMode = false;

  editReunionId = 0;

  // CONSTRUCTOR
  constructor(

    private reunionService: Reunion,

    private formationService: FormationService,

    private formateurService: Formateur,

    private cdr: ChangeDetectorRef

  ) {

  }

  // INIT
  ngOnInit(): void {

    this.getReunions();

    this.getFormations();

    this.getFormateurs();
  }

  // LISTE RÉUNIONS
  getReunions() {

    this.reunionService
      .getReunions()
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

  // CHANGEMENT FORMATION
  onFormationChange() {

    const formation = this.formations.find(

      (f: any) =>
        f.id == this.reunion.formationId
    );

    if (formation) {

      this.reunion.formationNom =
        formation.nom;
    }
  }


  // AJOUT
  addReunion() {

    // Vérification destinataire
    if (!this.reunion.cible) {

      alert(
        'Veuillez choisir un destinataire.'
      );

      return;
    }

    // Si réunion destinée à une formation
    if (
      this.reunion.cible === 'FORMATION'
      &&
      !this.reunion.formationId
    ) {

      alert(
        'Veuillez choisir une formation.'
      );

      return;
    }

    // Si réunion destinée à un service
    if (
      this.reunion.cible === 'SERVICE'
      &&
      !this.reunion.serviceConcerne
    ) {

      alert(
        'Veuillez choisir un service.'
      );

      return;
    }

    this.reunionService
      .addReunion(this.reunion)
      .subscribe({

        next: () => {

          this.getReunions();

          this.resetForm();

          alert(
            'Réunion ajoutée avec succès.'
          );
        },

        error: (error: any) => {

          console.error(error);

          alert(
            'Erreur lors de l\'ajout de la réunion.'
          );
        }
      });
  }

  // ÉDITION
  editReunion(reunion: any) {

    this.editMode = true;

    this.editReunionId =
      reunion.id;

    this.reunion = {

      type: reunion.type,

      sujet: reunion.sujet,

      date: reunion.date,

      heure: reunion.heure,

      salle: reunion.salle,

      participants: reunion.participants,

      formationId:
        reunion.formationId,

      formationNom:
        reunion.formationNom,

      cible: reunion.cible,

      compteRendu:
        reunion.compteRendu,

      serviceConcerne:
        reunion.serviceConcerne
    };
  }

  // UPDATE
  updateReunion() {

    this.reunionService
      .updateReunion(
        this.editReunionId,
        this.reunion
      )
      .subscribe({

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

  // DELETE
  deleteReunion(id: number) {

    this.reunionService
      .deleteReunion(id)
      .subscribe({

        next: () => {

          this.getReunions();

          alert(
            'Réunion supprimée'
          );
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  getCibleClass(cible: string): string {
    const map: any = {
      'TOUS': 'cible-tous',
      'FORMATEURS': 'cible-formateurs',
      'ADMINISTRATIFS': 'cible-admin',
      'FORMATION': 'cible-formation',
      'SERVICE': 'cible-service'
    };
    return map[cible] || '';
  }

  // RESET
  resetForm() {

    this.reunion = {

      type: '',

      sujet: '',

      date: '',

      heure: '',

      salle: '',

      participants: '',

      formationId: 0,

      formationNom: '',

      cible: '',

      compteRendu: '',

      serviceConcerne: ''
    };
  }
}