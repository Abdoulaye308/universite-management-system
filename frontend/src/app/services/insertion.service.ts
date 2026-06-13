import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Insertion {

  private api =
    'http://localhost:8080/api/insertions';

  constructor(
    private http: HttpClient
  ) {}

  getInsertions() {
    return this.http.get(this.api);
  }

  addInsertion(data: any) {
    return this.http.post(
      this.api,
      data
    );
  }

  updateInsertion(
    id: number,
    data: any
  ) {
    return this.http.put(
      `${this.api}/${id}`,
      data
    );
  }

  deleteInsertion(id: number) {
    return this.http.delete(
      `${this.api}/${id}`
    );
  }
}