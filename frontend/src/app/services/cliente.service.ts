import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(cliente: any): Observable<any> {
    return this.http.post(this.baseUrl, cliente);
  }

  update(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
