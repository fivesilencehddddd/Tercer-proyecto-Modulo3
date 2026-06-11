import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = AppConfig.API_URL;

  constructor(private http: HttpClient) { }

  buscarItems(termino: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json'
    });

    return this.http.get<any[]>(`${this.url}/items?q=${termino}`, { headers });
  }
}