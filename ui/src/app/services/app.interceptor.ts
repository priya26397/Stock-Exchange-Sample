import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_AUTHENTICATE_URL } from '../models/url';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url != USER_AUTHENTICATE_URL) {
      const token: string = this.authService.getBearerToken();
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }
    return next.handle(request);
  }
}
