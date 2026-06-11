import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  // LISTE
  getNotifications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // AJOUT
  addNotification(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // UPDATE
  updateNotification(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // DELETE
  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}