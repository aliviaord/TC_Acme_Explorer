import { Injectable } from '@angular/core';

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

  getTrip(id) {
    if (id) {
      const url = `${environment.backendApiBaseURL}/trips/${id}`;
      return this.http.get(url, httpOptions).toPromise();
    }
  }
}
