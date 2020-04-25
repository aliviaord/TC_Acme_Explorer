import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private filesUrl = environment.backendApiBaseURL + '/files';

  constructor(private http: HttpClient) { }

  uploadFile(file) {
    const url = `${this.filesUrl}` 
    return this.http.post(url, file, httpOptions).toPromise();
  }

  removeFile(id) {
    const url = `${this.filesUrl}/${id}` 
    return this.http.delete(url, httpOptions).toPromise();
  }

  getFile(id) {
    const url = `${this.filesUrl}/${id}` 
    return this.http.get(url, httpOptions).toPromise();
  }

}
