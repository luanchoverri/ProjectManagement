import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private apiUrl = 'https://lamansysfaketaskmanagerapi.onrender.com/api';
  private direction = '/login';
  private tokenKey = 'auth_token'; // Clave para guardar el token en el almacenamiento local
  private accesToken: string | null = null;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  
  private loggedInUser: User | null = null;
  private isAuth: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit():void{
    
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    this.loggedInSubject.next(true);
    return this.http.post<any>(`${this.apiUrl}${this.direction}`, credentials);
  }

  // setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  //  / this.loggedInSubject.next(true);
  // }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInUser = null;
    this.loggedInSubject.next(false);
   // 
  }

  setLoggedInUser(user : User, jwt:string):void{
    this.loggedInUser = user;
    this.accesToken = jwt;
  }



  getToken(): string | null {
    return this.accesToken;  //local storage o que ??
  }



   // Obtener el _id del usuario
   getUserId(): string | null {
    return this.loggedInUser ? this.loggedInUser._id : null;
  }

   getHeaders(): HttpHeaders {
     return new HttpHeaders({
       auth: `${this.accesToken}`
     });
   }

  // private isAuth = false;
  // private accesToken: string | null = null;
  // private username = 'thomas';
  // private password = '1234';

  // url:string = 'https://lamansysfaketaskmanagerapi.onrender.com/api'

  // constructor(private readonly http: HttpClient) { }

  // //aca iria tambien log ing y log out

  // login(username: string, password: string): Observable<any> {
  //   const credentials = { username, password };
  
  //   return this.http.post<any>(`${this.url}/login`, credentials);
  // }



  // setToken(token: string) {
  //   this.accesToken = token;
  // }

  // getToken() {
  //   return this.accesToken;
  // }

  
  
}
