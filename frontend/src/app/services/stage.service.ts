import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Stage {

  private apiUrl =
    'http://localhost:8080/api/stages';

  constructor(
    private http: HttpClient
  ) {}

  // Liste
  getStages() {
    return this.http.get(this.apiUrl);
  }

  // Ajouter
  addStage(stage: any) {
    return this.http.post(
      this.apiUrl,
      stage
    );
  }

  // Modifier
  updateStage(
    id: number,
    stage: any
  ) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      stage
    );
  }

  // Supprimer
  deleteStage(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}