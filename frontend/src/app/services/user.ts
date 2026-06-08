import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {

  // API backend
  private apiUrl =
    'http://localhost:8080/api/users';

  // Constructor
  constructor(
    private http: HttpClient
  ) {

  }

  // =========================
  // LISTE USERS
  // =========================
  getUsers(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // =========================
  // AJOUTER USER
  // =========================
  addUser(user: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      user
    );
  }

  // =========================
  // MODIFIER USER
  // =========================
  updateUser(
    id: number,
    user: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      user
    );
  }

  // =========================
  // DELETE USER
  // =========================
  deleteUser(
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