import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { doctor } from './Models/doctor';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'https://localhost:44387/api/Doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<doctor[]> {
    return this.http.get<doctor[]>(`${this.baseUrl}`);
  }

  getDoctor(id: number): Observable<doctor> {
    return this.http.get<doctor>(`${this.baseUrl}${id}`);
  }

  createDoctor(doctor: doctor): Observable<doctor> {
    return this.http.post<doctor>(`${this.baseUrl}`, doctor);
  }

  updateDoctor(id: number, doctor: doctor): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
