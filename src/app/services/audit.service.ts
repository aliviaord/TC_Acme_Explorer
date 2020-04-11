import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Audit } from '../models/audit.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private auditsUrl = environment.backendApiBaseURL + '/audits';

  constructor(private http: HttpClient) { }

  getAudit(id) {
    if (id) {
      const url = `${this.auditsUrl}/${id}`;
      return this.http.get<Trip>(url, httpOptions).toPromise();
    }
  }
}
