import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = AppConfig.API_URL;

  constructor(private http: HttpClient) {}

  buscarItems(termino: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/videojuegos?q=${encodeURIComponent(termino)}`);
  }
}