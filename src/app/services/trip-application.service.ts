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

  getTripApplications(role, actorId) {
    const url = `${this.tripApplicationsUrl}?${role}=${actorId}&_sort=status&_order=DESC`;
    return this.http.get<TripApplication[]>(url, httpOptions).toPromise();
  }
}
