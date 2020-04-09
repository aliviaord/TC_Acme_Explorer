import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { InfoMessageService } from './info-message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentActor: Actor;
  userLoggedIn = new Subject();

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient,
    private infoMessageService: InfoMessageService) { }

  registerUser(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
      .then(_ => {
        const headers = new HttpHeaders();
        headers.append('Content-type', 'application/json');
        const url = `${environment.backendApiBaseURL}/actors`;
        const body = JSON.stringify(actor);
        this.http.post(url, body, httpOptions).toPromise()
          .then(res => {
            resolve(res);
          }, err => {
            reject(err);
          });
      }).catch(err => {
        reject(err);
      });
    });
  }

  getRoles(): string[] {
    return ['MANAGER', 'ADMINISTRATOR', 'EXPLORER', 'SPONSOR', 'AUDITOR'];
  }

  getCurrentActor(): Actor {
    return this.currentActor;
  }

  checkRole(roles: string): boolean {
    let result = false;

    if (this.currentActor) {
      if (roles.indexOf(this.currentActor.role.toString()) !== -1) {
        result = true;
      } else {
        result = false;
      }
    } else {
      if (roles.indexOf('anonymous') !== -1) {
        result = true;
      } else {
        result = false;
      }
    }

    return result;
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          const url = environment.backendApiBaseURL + `/actors?email=` + email;
          this.http.get<Actor[]>(url).toPromise()
            .then((actor: Actor[]) => {
            this.currentActor = actor[0];
            this.userLoggedIn.next(true);
            this.infoMessageService.notifyMessage('messages.auth.login.correct',
              'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
            resolve(this.currentActor);
          }).catch(error => {
            this.infoMessageService.notifyMessage('messages.auth.login.failed',
              'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
            reject(error);
          });
          resolve();
        }).catch(error => {
          this.infoMessageService.notifyMessage('messages.'
            + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'),
            'text-center bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative');
          reject(error);
        });
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          resolve();
        }).catch(error => {
          reject(error);
        });
    });
  }
}
