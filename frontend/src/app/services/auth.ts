import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class Auth {

// URL backend Spring Boot
private apiUrl = 'http://localhost:8080/api/auth';

// Injection HttpClient
constructor(
    private http: HttpClient
  ) {

  }

  // Login utilisateur
  login(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }
}
