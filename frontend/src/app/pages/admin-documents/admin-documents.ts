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
selectedDocument: any = null;
  documents: any[] = [];

  editMode = false;

  editId = 0;

  document = {

    type: '',

    titre: '',

    contenu: '',

    dateCreation: ''
  };

  constructor(

    private service:
      AdministrationDocumentService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.getDocuments();
  }
//obtenir le document
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
//ajouter
  addDocument() {
    if (
    !this.document.titre?.trim() ||
    !this.document.type?.trim() ||
    !this.document.dateCreation?.trim()||
    !this.document.contenu?.trim()
  ) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }
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
//charger in document pour l'éditer
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
//modifier
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
//supprimer un document
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

//voir document
voirDocument(doc: any) {
  this.selectedDocument = doc;
}
//fermer le modal
fermerModal(event: MouseEvent) {
  // Ferme uniquement si clic sur l'overlay (pas sur la box)
  if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
    this.selectedDocument = null;
  }
}
//charger le type
getTypeLabel(type: string): string {
  const map: any = {
    'COURRIER_ARRIVEE':    'Courrier arrivé',
    'COURRIER_DEPART':     'Courrier départ',
    'NOTE_SERVICE':        'Note de service',
    'NOTE_ADMINISTRATIVE': 'Note administrative',
    'CIRCULAIRE':          'Circulaire'
  };
  return map[type] || type;
}
//charger le type
getTypeClass(type: string): string {
  const map: any = {
    'COURRIER_ARRIVEE':    'type-arrivee',
    'COURRIER_DEPART':     'type-depart',
    'NOTE_SERVICE':        'type-note-service',
    'NOTE_ADMINISTRATIVE': 'type-note-admin',
    'CIRCULAIRE':          'type-circulaire'
  };
  return map[type] || '';
}

exportPdf() {

   window.open(
    'http://localhost:8080/api/admin-documents/export/pdf',
    '_blank'
  );
   alert(
            'Document téléchargé'
          );

}

resetForm() {
  this.document = { type: '', titre: '', contenu: '', dateCreation: '' };
  this.editMode = false;
}
}