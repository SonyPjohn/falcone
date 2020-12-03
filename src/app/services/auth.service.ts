import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // function api to get authentication token
  getAuthToken(): any {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this.httpClient.post(environment.tokenUrl, '',
      { headers: header, responseType: 'json', observe: 'response' });
  }
}
