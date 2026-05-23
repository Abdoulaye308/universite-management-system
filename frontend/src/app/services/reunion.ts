import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reunion {

  // URL backend
  private apiUrl =
    'http://localhost:8080/api/reunions';

  // Constructor
  constructor(
    private http: HttpClient
  ) {

  }

  // =========================
  // LISTE
  // =========================
  getReunions(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // =========================
  // AJOUT
  // =========================
  addReunion(
    reunion: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      reunion
    );
  }

  // =========================
  // UPDATE
  // =========================
  updateReunion(
    id: number,
    reunion: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      reunion
    );
  }

  // =========================
  // DELETE
  // =========================
  deleteReunion(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}