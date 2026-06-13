import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
  from '@angular/common';

import { FormsModule }
  from '@angular/forms';

import { Stage }
  from '../../services/stage.service';

import { Student }
  from '../../services/student';

import { Partenaire }
  from '../../services/partenaire.service';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './stages.html',
  styleUrl: './stages.css'
})
export class Stages implements OnInit {

  stages: any[] = [];

  students: any[] = [];

  partenaires: any[] = [];

  stage = {

    studentId: 0,

    etudiant: '',

    formation: '',

    partenaireId: 0,

    organisme: '',

    dateDebut: '',

    dateFin: '',

    statut: 'EN_COURS',

    bilan: ''
  };

  editMode = false;

  editId = 0;

  constructor(

    private stageService: Stage,

    private studentService: Student,

    private partenaireService:
      Partenaire,
    private cdr: ChangeDetectorRef


  ) { }

  ngOnInit(): void {

    this.loadStages();

    this.loadStudents();

    this.loadPartenaires();
  }

  loadStages() {

    this.stageService
      .getStages()
      .subscribe({

        next: (data: any) => {

          this.stages = data;
          this.cdr.detectChanges();

        }
      });
  }

  loadStudents() {

    this.studentService
      .getStudents()
      .subscribe({

        next: (data: any) => {

          this.students = data;
          this.cdr.detectChanges();

        }
      });
  }

  loadPartenaires() {

    this.partenaireService
      .getPartenaires()
      .subscribe({

        next: (data: any) => {

          this.partenaires = data;
          this.cdr.detectChanges();

        }
      });
  }
  // =========================
  // CHOIX ETUDIANT
  // =========================

  onStudentChange() {

    const etudiant = this.students.find(

      (s: any) =>

        s.id == this.stage.studentId
    );

    if (etudiant) {

      this.stage.etudiant =

        etudiant.prenom +
        ' ' +
        etudiant.nom;

      this.stage.formation =

        etudiant.formation;
    }
  }

  // =========================
  // CHOIX PARTENAIRE
  // =========================

  onPartenaireChange() {

  const partenaire =
    this.partenaires.find(
      (p: any) =>
        p.id == this.stage.organisme
    );

  if (partenaire) {

    this.stage.organisme =
      partenaire.organisme;

    console.log(partenaire);
  }
}

  addStage() {

    this.stageService
      .addStage(this.stage)
      .subscribe({

        next: () => {

          this.loadStages();

          this.resetForm();

          alert('Stage ajouté');
        }
      });
  }

  editStage(stage: any) {

    this.editMode = true;

    this.editId = stage.id;

    this.stage = {

      ...stage
    };
  }

  updateStage() {

    this.stageService
      .updateStage(
        this.editId,
        this.stage
      )
      .subscribe({

        next: () => {

          this.loadStages();

          this.resetForm();

          this.editMode = false;

          alert('Stage modifié');
        }
      });
  }

  deleteStage(id: number) {

    this.stageService
      .deleteStage(id)
      .subscribe({

        next: () => {

          this.loadStages();

          alert('Stage supprimé');
        }
      });
  }

  resetForm() {

    this.stage = {

      studentId: 0,

      etudiant: '',

      formation: '',

      partenaireId: 0,

      organisme: '',

      dateDebut: '',

      dateFin: '',

      statut: 'EN_COURS',

      bilan: ''
    };
  }
}