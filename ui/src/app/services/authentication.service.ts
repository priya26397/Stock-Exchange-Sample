import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { USER_AUTHENTICATE_URL } from '../models/url';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {

  }

  authenticateUser(name: string, password: string): Observable<string> {

    return this.apiService.postBody(USER_AUTHENTICATE_URL, [name, password], { responseType: 'text' });
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  setUserName(userName: string) {
    return localStorage.setItem('userName', userName);
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  isUserAuthenticated(): Promise<boolean> {
    let value = false;
    if (this.getBearerToken()) {
      value = true;
    }
    this.isAuthenticated$.next(value)
    return Promise.resolve(value);

  }

}
