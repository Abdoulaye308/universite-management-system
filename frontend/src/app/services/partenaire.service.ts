import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Partenaire {

  private apiUrl =
    'http://localhost:8080/api/partenaires';

  constructor(
    private http: HttpClient
  ) {}

  // Liste
  getPartenaires() {
    return this.http.get(this.apiUrl);
  }

  // Ajouter
  addPartenaire(
    partenaire: any
  ) {
    return this.http.post(
      this.apiUrl,
      partenaire
    );
  }

  // Modifier
  updatePartenaire(
    id: number,
    partenaire: any
  ) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      partenaire
    );
  }

  // Supprimer
  deletePartenaire(
    id: number
  ) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}