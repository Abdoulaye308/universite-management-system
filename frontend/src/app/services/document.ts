import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Document {

  private apiUrl =
    'http://localhost:8080/api/documents';

  constructor(
    private http: HttpClient
  ) {

  }

  // LISTE
  getDocuments(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // PAR ROLE
  getDocumentsByRole(
    role: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/role/${role}`
    );
  }

  // AJOUT
  addDocument(
    document: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      document
    );
  }

  // DELETE
  deleteDocument(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

// UPDATE
updateDocument(
  id: number,
  document: any
): Observable<any> {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    document
  );
}
}