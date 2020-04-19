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
  private actorsUrl = environment.backendApiBaseURL + '/actors';

  constructor(private http: HttpClient) { }

  getAudit(id) {
    if (id) {
      const url = `${this.auditsUrl}/${id}`;
      return this.http.get<Audit>(url, httpOptions).toPromise();
    }
  }

  getAuditorAudits(id) {
    const url = `${this.actorsUrl}/${id}/audits`;
    return this.http.get<Audit[]>(url, httpOptions).toPromise();
  }

  createAudit(audit) {
    console.log(audit)
    const url = `${this.auditsUrl}`;
    return this.http.post<Audit>(url, audit, httpOptions).toPromise();
  }

  getAuditorAuditsPage(start, psize, id) {
    const url = `${this.auditsUrl}?auditor=${id}&_start=${start}&_limit=${psize}`;
    return this.http.get<Audit[]>(url, httpOptions).toPromise();
  }
}
