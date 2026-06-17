import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormationService } from '../../services/formation.service';

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

  formateurs: any[] = [];
 formations: any[] = [];
  formateur = {
    nom: '',
    prenom: '',
    email: '',
    grade: '',
    type: '',
    specialite: '',
    formationId: null
  };

  editMode = false;
  editFormateurId = 0;

  // Constructor
  constructor(
    private formateurService: Formateur,
    private formationService: FormationService,
    private cdr: ChangeDetectorRef

  ) {

  }

  ngOnInit(): void {

    this.getFormateurs();
    this.getFormations();
  }

 getFormations() {
    this.formationService.getFormations().subscribe({
      next: (data: any) => {
        this.formations = [...data];
        this.cdr.detectChanges();
      },
      error: (error: any) => { console.log(error); }
    });
  }
  
  // LISTE
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

  // AJOUT
  addFormateur() {
    if (
    !this.formateur.nom?.trim() ||
    !this.formateur.prenom?.trim() ||
    !this.formateur.email?.trim() ||
    !this.formateur.type?.trim()
  ) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

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

  // CHARGER ÉDITION
  editFormateur(formateur: any) {

    this.editMode = true;

    this.editFormateurId = formateur.id;

    this.formateur = {

      nom: formateur.nom,

      prenom: formateur.prenom,

      email: formateur.email,

      grade: formateur.grade,

      type: formateur.type,

      specialite: formateur.specialite,
      formationId: formateur.formationId
    };
  }

  // UPDATE
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

  // DELETE
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
  getFormationName(id: number): string {
  const f = this.formations.find(f => f.id === id);
  return f ? f.nom : '—';
}

  // RESET
  resetForm() {

    this.formateur = {

      nom: '',

      prenom: '',

      email: '',

      grade: '',

      type: '',

      specialite: '',
      formationId: null
    };
  }
}