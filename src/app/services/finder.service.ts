import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Finder } from '../models/finder.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  private findersUrl = environment.backendApiBaseURL + '/finders';

  constructor(private http: HttpClient) { }

  createFinder(finder: Finder) {
    const url = `${this.findersUrl}`;
    const body = JSON.stringify(finder);

    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  getFinder(explorer) {
    const url = `${this.findersUrl}?explorer=${explorer}`;
    return this.http.get<Finder[]>(url, httpOptions).toPromise();
  }

  editFinder(finder) {
    const url = `${this.findersUrl}/${finder.id}`;
    return this.http.put<Finder>(url, finder, httpOptions).toPromise();
  }
}
