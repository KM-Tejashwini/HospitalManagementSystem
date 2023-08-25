import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bill } from './Models/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private baseUrl = 'https://localhost:44387/api/Bills';

  constructor(private http: HttpClient) {}

  getBills(): Observable<bill[]> {
    return this.http.get<bill[]>(`${this.baseUrl}`);
  }

  getBill(id: number): Observable<bill> {
    return this.http.get<bill>(`${this.baseUrl}${id}`);
  }

  createBill(bill: bill): Observable<bill> {
    return this.http.post<bill>(`${this.baseUrl}`, bill);
  }

  updateBill(id: number, bill: bill): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
