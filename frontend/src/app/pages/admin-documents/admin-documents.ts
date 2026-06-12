import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AdministrationDocumentService
} from '../../services/administration-document.service';

@Component({
  selector: 'app-admin-documents',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './admin-documents.html',

  styleUrl:
    './admin-documents.css'
})
export class AdminDocuments
implements OnInit {

  documents: any[] = [];

  editMode = false;

  editId = 0;

  document = {

    type: '',

    titre: '',

    contenu: '',

    dateCreation: ''
  };
  selectedDocument: any = null;

voirDocument(doc: any) {

  this.selectedDocument = doc;
}

  constructor(

    private service:
      AdministrationDocumentService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.getDocuments();
  }

  getDocuments() {

    this.service
      .getDocuments()
      .subscribe({

        next: (data: any) => {

          this.documents = data;

          this.cdr.detectChanges();
        }
      });
  }

  addDocument() {

    this.service
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

  editDocument(doc: any) {

    this.editMode = true;

    this.editId = doc.id;

    this.document = {

      type: doc.type,

      titre: doc.titre,

      contenu: doc.contenu,

      dateCreation:
        doc.dateCreation
    };
  }

  updateDocument() {

    this.service
      .updateDocument(
        this.editId,
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
        }
      });
  }

  deleteDocument(id: number) {

    this.service
      .deleteDocument(id)
      .subscribe({

        next: () => {

          this.getDocuments();

          alert(
            'Document supprimé'
          );
        }
      });
  }

  resetForm() {

    this.document = {

      type: '',

      titre: '',

      contenu: '',

      dateCreation: ''
    };
  }
}