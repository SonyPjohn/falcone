import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Planet } from '../models/planets'
import { Vehicle } from '../models/vehicles';

@Injectable({
  providedIn: 'root'
})
export class FalconeService {
  result: any;
  timeTaken: any;

  constructor(private httpClient: HttpClient) { }

  // function api to get all planet details
  getPlanets(): Observable<Planet[]> {
    return this.httpClient.get<Planet[]>(environment.planetUrl)
      .pipe(map(response => {
        return response;
      })
      );
  }

  // function api to get all vehicle details
  getVechicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(environment.vehicleUrl)
      .pipe(map(response => {
        return response;
      })
      );
  }

  // function api to find falcone
  findFalcone(data: any): any {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this.httpClient.post(environment.findUrl, data,
      { headers: header, responseType: 'json', observe: 'response' });
  }

  // function api to store the result
  falconeResult(data: any, time: number): void {
    this.result = data;
    this.timeTaken = time;
  }

  // function api to get the result
  getFalconeResult(): any {
    return { data: this.result, time: this.timeTaken };
  }
}
