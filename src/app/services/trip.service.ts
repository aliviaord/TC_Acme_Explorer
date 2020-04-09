import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsUrl = environment.backendApiBaseURL + '/trips';

  constructor(private http: HttpClient) { }

  getTrips() {
    const url = `${this.tripsUrl}`;
    return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }

  getTrip(id) {
    if (id) {
      const url = `${this.tripsUrl}/${id}`;
      return this.http.get<Trip>(url, httpOptions).toPromise();
    }
  }
}
