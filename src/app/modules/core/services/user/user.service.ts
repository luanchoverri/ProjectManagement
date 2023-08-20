import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { User } from 'src/app/modules/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse>(PathRest.GET_USERS).pipe(
      map((response) => response.data),
      catchError(() => of([])) // Maneja error y devuelve lista vacia
    );
  }
}
