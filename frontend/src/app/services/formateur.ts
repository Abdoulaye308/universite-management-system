import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Formateur {

  // URL backend
  private apiUrl =
    'http://localhost:8080/api/formateurs';

  // Constructor
  constructor(
    private http: HttpClient
  ) {

  }

  // =========================
  // LISTE
  // =========================
  getFormateurs(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // =========================
  // AJOUT
  // =========================
  addFormateur(
    formateur: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      formateur
    );
  }

  // =========================
  // UPDATE
  // =========================
  updateFormateur(
    id: number,
    formateur: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      formateur
    );
  }

  // =========================
  // DELETE
  // =========================
  deleteFormateur(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  getByEmail(
  email: string
): Observable<any> {

  return this.http.get(

    `${this.apiUrl}/email/${email}`
  );
}
}