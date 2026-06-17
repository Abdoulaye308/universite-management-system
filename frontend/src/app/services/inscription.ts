import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Inscription {

  // API URL
  private apiUrl =
    'http://localhost:8080/api/inscriptions';

  constructor(
    private http: HttpClient
  ) {

  }

  // LISTE
  getInscriptions(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // INSCRIPTIONS ÉTUDIANT
  getByStudent(
    studentId: number
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/student/${studentId}`
    );
  }

  // AJOUT
  addInscription(
    inscription: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      inscription
    );
  }

  // MODIFIER
  updateInscription(
    id: number,
    inscription: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      inscription
    );
  }

  // DELETE
  deleteInscription(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}