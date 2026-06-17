import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
  from '@angular/common';

import { FormsModule }
  from '@angular/forms';

import { Insertion }
  from '../../services/insertion.service';

import { Student }
  from '../../services/student';

@Component({
  selector: 'app-insertions',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './insertions.html',

  styleUrl: './insertions.css'
})
export class Insertions
  implements OnInit {
  autoEmploiCount = 0;
  emploiSalarieCount = 0;
  insertions: any[] = [];

  students: any[] = [];

  insertion = {

    studentId: 0,

    etudiant: '',

    formation: '',

    typeInsertion: 'EMPLOI_SALARIE',

    entreprise: '',

    poste: '',

    dateInsertion: '',

    commentaire: ''
  };

  editMode = false;

  editId = 0;

  constructor(

    private insertionService:
      Insertion,

    private studentService:
      Student,

    private cdr:
      ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadInsertions();

    this.loadStudents();
  }

  loadStudents() {
  this.studentService.getStudents().subscribe({
    next: (data: any) => {
      this.students = [...data];        // ← spread
      this.cdr.detectChanges();         // ← force l'affichage dans le select
    },
    error: (error: any) => { console.log(error); }
  });
}

loadInsertions() {
  this.insertionService.getInsertions().subscribe({
    next: (data: any) => {
      this.insertions = [...data];
      this.autoEmploiCount = data.filter((i: any) => i.typeInsertion === 'AUTO_EMPLOI').length;
      this.emploiSalarieCount = data.filter((i: any) => i.typeInsertion === 'EMPLOI_SALARIE').length;
      this.cdr.detectChanges();
    },
    error: (error: any) => { console.log(error); }
  });
}
  onStudentChange() {

    const student =
      this.students.find(

        (s: any) =>

          s.id ==
          this.insertion.studentId
      );

    if (student) {

      this.insertion.etudiant =

        student.nom +
        ' ' +
        student.prenom;

      this.insertion.formation =
        student.formation;
    }
  }

  addInsertion() {
           if (
    !this.insertion.etudiant?.trim() ||
    !this.insertion.entreprise?.trim() ||
    !this.insertion.typeInsertion?.trim() ||
    !this.insertion.poste?.trim() ||
    !this.insertion.dateInsertion.trim()
  ) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

    this.insertionService
      .addInsertion(
        this.insertion
      )
      .subscribe({

        next: () => {

          this.loadInsertions();

          this.resetForm();

          alert(
            'Insertion ajoutée'
          );
        }
      });
  }

  editInsertion(i: any) {

    this.editMode = true;

    this.editId = i.id;

    this.insertion = {

      ...i
    };
  }

  updateInsertion() {

    this.insertionService
      .updateInsertion(
        this.editId,
        this.insertion
      )
      .subscribe({

        next: () => {

          this.loadInsertions();

          this.resetForm();

          this.editMode = false;

          alert(
            'Insertion modifiée'
          );
        }
      });
  }

  deleteInsertion(id: number) {

    this.insertionService
      .deleteInsertion(id)
      .subscribe({

        next: () => {

          this.loadInsertions();

          alert(
            'Insertion supprimée'
          );
        }
      });
  }

  resetForm() {

    this.insertion = {

      studentId: 0,

      etudiant: '',

      formation: '',

      typeInsertion: 'EMPLOI_SALARIE',

      entreprise: '',

      poste: '',

      dateInsertion: '',

      commentaire: ''
    };
  }
}