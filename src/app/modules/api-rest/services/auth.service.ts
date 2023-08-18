import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError } from 'rxjs';
import { User } from '../../models/user';
import { enviroment } from '../enviroments/enviroment';
import { PathRest } from '../enviroments/path-rest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserResponse } from '../../models/userResponse';
import { UserCredentials } from '../../models/userCredentials';
import { Route, Router } from '@angular/router';
import { endpoint } from '../enviroments/endpoints';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token'; // Clave para guardar el token en el almacenamiento local
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  private currentUser : User | null = null;
  constructor(private router: Router ,private http: HttpClient) {}

  login(authData: UserCredentials): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${PathRest.GET_LOGIN}`, authData)
    .pipe(
      map((response: UserResponse) => {
        this.saveToken(response.token);
        this.currentUser = response.user;
        this.loggedInSubject.next(true);
      }),
      catchError((err) => this.handleError(err))
    )
  }

  handleError(err: any): Observable<never> {
    throw new Error('Method not implemented.');
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedInSubject.next(false);
    this.router.navigate([endpoint.LOGIN]);
  }

  private checkToken(): void {
    const token = this.getToken()!;
    const isExpired = helper.isTokenExpired(token);
    isExpired ? this.logout() : this.loggedInSubject.next(true);
  }

  private saveToken(tokenValue: string): void {
    localStorage.setItem(this.TOKEN_KEY, tokenValue);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get user(): User | null {
    return this.currentUser ? this.currentUser : null;
  }
}
