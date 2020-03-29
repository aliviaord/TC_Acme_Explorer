import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getTrips() {
    const url = `${environment.backendApiBaseURL}/trips`;
    return this.http.get(url, httpOptions).toPromise();
  }
}
