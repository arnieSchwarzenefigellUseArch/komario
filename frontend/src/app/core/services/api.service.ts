import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getHome() {
    return this.http.get(`${this.baseUrl}/`);
  }

  getCatalog() {
    return this.http.get(`${this.baseUrl}/catalog`);
  }

  getAbout() {
    return this.http.get(`${this.baseUrl}/about`);
  }
}
