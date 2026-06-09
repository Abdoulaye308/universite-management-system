import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


import { CommonModule }
  from '@angular/common';

import { FormsModule }
  from '@angular/forms';

import { Document }
  from '../../services/document';

@Component({
  selector: 'app-documents',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './documents.html',

  styleUrl: './documents.css'
})
export class Documents
  implements OnInit {

  documents: any[] = [];
  editMode = false;

editDocumentId = 0;
editDocument(
  document: any
) {

  this.editMode = true;

  this.editDocumentId =
    document.id;

  this.document = {

    titre: document.titre,

    type: document.type,

    description:
      document.description,

    roleCible:
      document.roleCible,

    dateCreation:
      document.dateCreation
  };
}

  document = {

    titre: '',

    type: '',

    description: '',

    roleCible: '',

    dateCreation: ''
  };

  constructor(
    private documentService: Document,
    private cdr: ChangeDetectorRef

  ) {

  }

  ngOnInit(): void {

    this.getDocuments();
  }

  // =====================
  // LISTE
  // =====================
  getDocuments() {

    this.documentService
      .getDocuments()
      .subscribe({

        next: (data: any) => {

          this.documents = data;
          this.cdr.detectChanges();

        }
      });
  }

  // =====================
  // AJOUT
  // =====================
  addDocument() {

    this.documentService
      .addDocument(
        this.document
      )
      .subscribe({

        next: () => {

          this.getDocuments();

          this.resetForm();

          alert(
            'Document ajouté'
          );
        }
      });
  }

  // =====================
  // DELETE
  // =====================
  deleteDocument(
    id: number
  ) {

    this.documentService
      .deleteDocument(id)
      .subscribe({

        next: () => {

          this.getDocuments();
        }
      });
  }

  updateDocument() {

  this.documentService
    .updateDocument(
      this.editDocumentId,
      this.document
    )
    .subscribe({

      next: () => {

        this.getDocuments();

        this.editMode = false;

        this.resetForm();

        alert(
          'Document modifié'
        );
      },

      error: (error: any) => {

        console.log(error);
      }
    });
}

  // =====================
  // RESET
  // =====================
  resetForm() {

    this.document = {

      titre: '',

      type: '',

      description: '',

      roleCible: '',

      dateCreation: ''
    };
  }
}