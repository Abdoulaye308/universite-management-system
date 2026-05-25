import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  constructor(private http: HttpClient) {}

  // Étudiants
  getStudents(): Observable<any> {
    return this.http.get('http://localhost:8080/api/students');
  }

  // Formations
  getFormations(): Observable<any> {
    return this.http.get('http://localhost:8080/api/formations');
  }

  // Formateurs
  getFormateurs(): Observable<any> {
    return this.http.get('http://localhost:8080/api/formateurs');
  }

  // Réunions
  getReunions(): Observable<any> {
    return this.http.get('http://localhost:8080/api/reunions');
  }
}