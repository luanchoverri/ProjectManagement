import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { User } from 'src/app/modules/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  getUsers(): Observable<User[]> {
    let loggedIn = false;

    this.authService.loggedIn$.subscribe((value) => {
      loggedIn = value;
    });

    if (loggedIn) {
      const headers = this.authService.getHeaders();
      return this.http
        .get<ApiResponse>(PathRest.GET_USERS, { headers })
        .pipe(
          map((response) => response.data),
          catchError(() => of([])) // Maneja error y devuelve lista vacia
        );
    } else {
      return of([]); // No esta logueado, devuelve lista vacia
    }
  }
}
