import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TripApplication } from '../models/trip-application.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TripApplicationService {

  private tripApplicationsUrl = environment.backendApiBaseURL + '/tripApplications';

  constructor(private http: HttpClient) { }

  getTripApplications(start, limit, role, actorId) {
    const url = `${this.tripApplicationsUrl}?${role}=${actorId}&_sort=status&_order=ASC&_start=${start}&_limit=${limit}`;
    return this.http.get<TripApplication[]>(url, httpOptions).toPromise();
  }

  updateTripApplication(tripApplication: TripApplication) {
    const url = `${this.tripApplicationsUrl}/${tripApplication.id}`;
    const body = JSON.stringify(tripApplication);

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
