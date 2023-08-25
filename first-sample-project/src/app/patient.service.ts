import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { patient } from './Models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'https://localhost:44387/api/Patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<patient[]> {
    return this.http.get<patient[]>(`${this.baseUrl}`);
  }

  getPatient(id: number): Observable<patient> {
    return this.http.get<patient>(`${this.baseUrl}${id}`);
  }

  createPatient(patient: patient): Observable<patient> {
    return this.http.post<patient>(`${this.baseUrl}`, patient);
  }

  updatePatient(id: number, patient: patient): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
