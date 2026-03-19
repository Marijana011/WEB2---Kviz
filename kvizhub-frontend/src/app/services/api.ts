import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://localhost:7129/api';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/Auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/Auth/register`, data);
  }

  getQuizzes() {
    return this.http.get(`${this.baseUrl}/Quiz`);
  }

  getQuiz(id: number) {
    return this.http.get(`${this.baseUrl}/Quiz/${id}`);
  }

  submitQuiz(data: any) {
    return this.http.post(`${this.baseUrl}/Quiz/submit`, data);
  }

  getResults(id: number) {
    return this.http.get(`${this.baseUrl}/Quiz/${id}/results`);
  }
}
