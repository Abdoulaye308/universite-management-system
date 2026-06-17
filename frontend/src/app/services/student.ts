import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Student {

  // URL backend Spring Boot
  private apiUrl = 'http://localhost:8080/api/students';

  // Constructor
  constructor(
    private http: HttpClient
  ) {

  }

  // Liste étudiants
  getStudents(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // Ajouter étudiant
  addStudent(student: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      student
    );
  }

  // Supprimer étudiant
  deleteStudent(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  // Modifier étudiant
updateStudent(
  id: number,
  student: any
): Observable<any> {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    student
  );
}

  // Étudiant par email
  getStudentByEmail(
    email: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/email/${email}`
    );
  }

  //export pdf
  exportPdf() {

  return this.http.get(

    `${this.apiUrl}/export/pdf`,

    {
      responseType: 'blob'
    }
  );
}
}