import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { payment } from './Models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'https://localhost:44387/api/Payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<payment[]> {
    return this.http.get<payment[]>(`${this.baseUrl}`);
  }

  getPayment(id: number): Observable<payment> {
    return this.http.get<payment>(`${this.baseUrl}${id}`);
  }

  createPayment(payment: payment): Observable<payment> {
    return this.http.post<payment>(`${this.baseUrl}`, payment);
  }

  updatePayment(id: number, payment: payment): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
