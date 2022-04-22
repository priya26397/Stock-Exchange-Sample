import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  postBody(url: string, body: any, responseType?: any): Observable<any> {
    if (responseType) {
      return this.httpClient.post(url, body, responseType);
    }
    return this.httpClient.post(url, body);


  }

  get(url: string, params?: HttpParams, ): Observable<any> {
    if (params) {
      return this.httpClient.get(url, { params: params });
    }
    return this.httpClient.get(url);
  }

  delete(url: string, params?: HttpParams, ): Observable<any> {
    if (params) {
      return this.httpClient.delete(url, { params: params });
    }
    return this.httpClient.delete(url);
  }
}
