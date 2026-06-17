import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  // URL backend Spring Boot
  private apiUrl = 'http://localhost:8080/api/formations';

  // Constructor
  constructor(
    private http: HttpClient
  ) {

  }
  
  // LISTE FORMATIONS
  getFormations(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // AJOUTER FORMATION
  addFormation(
    formation: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      formation
    );
  }

  // MODIFIER FORMATION
  updateFormation(
    id: number,
    formation: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      formation
    );
  }

  // SUPPRIMER FORMATION
  deleteFormation(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

    // Formation par ID
  getFormationById(
    id: number
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }
}