import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip.model';
import { Audit } from '../models/audit.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsUrl = environment.backendApiBaseURL + '/trips';
  private auditsUrl = environment.backendApiBaseURL + '/audits';
  private actorsUrl = environment.backendApiBaseURL + '/actors';

  constructor(private http: HttpClient) { }

  getTrips() {
    const url = `${this.tripsUrl}`
    return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }

  getTrip(id) {
    if (id) {
      const url = `${this.tripsUrl}/${id}`;
      return this.http.get<Trip>(url, httpOptions).toPromise();
    }
  }

  searchTrips(text, minPrice, maxPrice) {
    let url = `${this.tripsUrl}?price_lte=${maxPrice}&price_gte=${minPrice}`;
    if (text) {
      url += `&q=${text}`;
    }
      return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }

  createTrip(trip) {
    const url = `${this.tripsUrl}`;
    return this.http.post<Trip>(url, trip, httpOptions).toPromise();
  }

  editTrip(trip) {
    console.log(trip)
    const url = `${this.tripsUrl}/${trip.id}`;
    return this.http.put<Trip>(url, trip, httpOptions).toPromise();
  }

  removeTrip(id) {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.delete<Trip>(url, httpOptions).toPromise();
  }

  getTripAudits(id) {
    const url = `${this.auditsUrl}?trip=${id}` //?publicationDate_lte${new Date()}`;
    return this.http.get<Audit[]>(url, httpOptions).toPromise();
  }

  getTripsPage(start: number, psize: number, text: string, minPrice: number, maxPrice: number) {
    let url = `${this.tripsUrl}?price_lte=${maxPrice}&price_gte=${minPrice}&_start=${start}&_limit=${psize}`;
    if (text) {
      url += `&q=${text}`;
    }
      return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }

  getManagerTrips(start, psize, id) {
    const url = `${this.tripsUrl}?manager=${id}&_start=${start}&_limit=${psize}`;
    return this.http.get<Trip[]>(url, httpOptions).toPromise();
  }
}
