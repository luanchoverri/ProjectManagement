import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let clonedRequest = request;
    
    if(!this.authService.sessionExpired()){
      clonedRequest = request.clone({
        setHeaders:{
          auth : this.authService.getToken()!        // ! indica que nunca va a ser null
        }
      })
    }
    return next.handle(request);
  }
}
