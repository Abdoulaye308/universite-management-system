import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationDocumentService {

  private apiUrl =
    'http://localhost:8080/api/admin-documents';

  constructor(
    private http: HttpClient
  ) {}

  // Liste
  getDocuments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Ajouter
  addDocument(
    document: any
  ): Observable<any> {
    return this.http.post(
      this.apiUrl,
      document
    );
  }

  // Modifier
  updateDocument(
    id: number,
    document: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      document
    );
  }

  // Supprimer
  deleteDocument(
    id: number
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  exportPdf() {

  window.open(
    'http://localhost:8080/api/administration-documents/export/pdf',
    '_blank'
  );

}
}