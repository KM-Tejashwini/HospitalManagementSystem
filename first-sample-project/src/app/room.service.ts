import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { room } from './Models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private baseUrl = 'https://localhost:44387/api/Rooms';

  constructor(private http: HttpClient) {}

  getrooms(): Observable<room[]> {
    return this.http.get<room[]>(`${this.baseUrl}`);
  }

  getroom(id: number): Observable<room> {
    return this.http.get<room>(`${this.baseUrl}${id}`);
  }

  createRoom(room: room): Observable<room> {
    return this.http.post<room>(`${this.baseUrl}`, room);
  }

  updateRoom(id: number, room: room): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
