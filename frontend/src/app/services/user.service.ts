import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
