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
  private actorsUrl = environment.backendApiBaseURL + '/actors';

  constructor(private http: HttpClient) { }

  getTrips() {
    const url = `${this.tripsUrl}` //?publicationDate_lte${new Date()}`;
    return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }

  getTrip(id) {
    if (id) {
      const url = `${this.tripsUrl}/${id}`;
      return this.http.get<Trip>(url, httpOptions).toPromise();
    }
  }

  getManagerTrips(id) {
    const url = `${this.actorsUrl}/${id}/trips`;
    return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }

  createTrip(trip) {
    console.log(trip)
    const url = `${this.tripsUrl}`;
    return this.http.post<Trip[]>(url, trip, httpOptions).toPromise();
  }

  editTrip(trip) {
    console.log(trip)
    const url = `${this.tripsUrl}/${trip.id}`;
    return this.http.put<Trip[]>(url, trip, httpOptions).toPromise();
  }

  removeTrip(id) {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.delete<Trip[]>(url, httpOptions).toPromise();
  }
}
