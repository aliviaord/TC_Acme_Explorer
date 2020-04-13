import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../models/dashboard.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardsUrl = environment.backendApiBaseURL + '/dashboards';

  constructor(private http: HttpClient) { }

  getDashboards() {
    const url = `${this.dashboardsUrl}`;
    return this.http.get<Dashboard[]>(url, httpOptions).toPromise();
  }
}
