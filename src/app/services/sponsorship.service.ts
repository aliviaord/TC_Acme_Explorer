import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sponsorship } from '../models/sponsorship.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {

  private sponsorshipsUrl = environment.backendApiBaseURL + '/sponsorships';

  constructor(private http: HttpClient) { }

  getSponsorships(sponsorId) {
    const url = `${this.sponsorshipsUrl}?sponsor=${sponsorId}`;
    return this.http.get<Sponsorship[]>(url, httpOptions).toPromise();
  }

  getTripSponsorships(tripId) {
    const url = `${this.sponsorshipsUrl}?trip=${tripId}`;
    return this.http.get<Sponsorship[]>(url, httpOptions).toPromise();
  }
}
