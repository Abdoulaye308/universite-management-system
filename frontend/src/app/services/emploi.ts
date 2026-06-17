import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Emploi {

  // URL backend
  private apiUrl =
    'http://localhost:8080/api/emplois';

  // Constructor
  constructor(
    private http: HttpClient
  ) {

  }

  // LISTE EMPLOIS
  getEmplois(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // AJOUTER
  addEmploi(
    emploi: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      emploi
    );
  }

  // MODIFIER
  updateEmploi(
    id: number,
    emploi: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      emploi
    );
  }

  // DELETE
  deleteEmploi(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}