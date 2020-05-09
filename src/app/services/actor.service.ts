import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorsUrl = environment.backendApiBaseURL + '/actors';

  constructor(private http: HttpClient) { }

  getActor(id) {
    if (id) {
      const url = `${this.actorsUrl}/${id}`;
      return this.http.get<Actor>(url, httpOptions).toPromise();
    }
  }

  editActor(actor) {
    console.log(actor)
    const url = `${this.actorsUrl}/${actor.id}`;
    return this.http.put<Actor>(url, actor, httpOptions).toPromise();
  }
}
