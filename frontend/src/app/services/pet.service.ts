import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PetService {
  private baseUrl = 'http://localhost:8080/api/pets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(pet: any): Observable<any> {
    return this.http.post(this.baseUrl, pet);
  }

  update(id: number, pet: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, pet);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
