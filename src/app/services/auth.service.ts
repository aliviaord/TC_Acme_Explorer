import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { InfoMessageService } from './info-message.service';
import { FinderService } from './finder.service';
import { Finder } from '../models/finder.model';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn = new Subject();

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient,
    private infoMessageService: InfoMessageService,
    private finderService: FinderService,
    private cookieService: CookieService) {
      // this.fireAuth.auth.onAuthStateChanged((authState) => {
      //   if (authState) {
      //     const url = `${environment.backendApiBaseURL}/actors?email=${authState.email}`;
      //     this.http.get(url, httpOptions).toPromise()
      //     .then(actor => {
      //       this.currentActor = actor[0] as Actor;
      //       this.userLoggedIn.next(true);
      //     }, err => {
      //       console.log(err);
      //     });
      //   }
      // });
    }

  registerUser(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
      .then(_ => {
        const headers = new HttpHeaders();
        headers.append('Content-type', 'application/json');
        const url = `${environment.backendApiBaseURL}/actors`;
        const body = JSON.stringify(actor);
        httpOptions.headers.append('observe', 'response');
        this.http.post<Actor>(url, body, httpOptions).subscribe(createdActor => {
          if (createdActor.role === 'EXPLORER') {
            const newFinder = new Finder();

            newFinder.id = null;
            newFinder.keyword = null;
            newFinder.minPrice = null;
            newFinder.maxPrice = null;
            newFinder.startDate = null;
            newFinder.endDate = null;
            newFinder.explorer = createdActor.id;

            this.finderService.createFinder(newFinder)
            .then(res => {
              resolve(res);
            }, err => {
              reject(err);
            });
          }
        });
      }).catch(err => {
        reject(err);
      });
    });
  }

  getRoles(): string[] {
    return ['MANAGER', 'ADMINISTRATOR', 'EXPLORER', 'SPONSOR', 'AUDITOR'];
  }

  getCurrentActor() {
    let result = null;
    const currentActor = localStorage.getItem('currentActor');
    if (currentActor) {
      result = JSON.parse(currentActor);
    }
    return result;
  }

  checkRole(roles: string): boolean {
    let result = false;
    const currentActor = this.getCurrentActor();
    if (currentActor) {
      if (roles.indexOf(currentActor.role.toString()) !== -1) {
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
            this.setCurrentActor(actor[0]);
            this.userLoggedIn.next(true);
            this.infoMessageService.notifyMessage('messages.auth.login.correct',
              'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
            resolve(this.getCurrentActor());
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
          this.setCurrentActor(null);
          this.userLoggedIn.next(false);
          resolve();
        }).catch(error => {
          this.infoMessageService.notifyMessage(error.code,
            'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
          reject(error);
        });
    });
  }

  setCurrentActor(actor: any, token?: any) {
    if (actor) {
      localStorage.setItem('currentActor', JSON.stringify({
        id: actor.id,
        name: actor.name,
        surname: actor.surname,
        role: actor.role
      }));

      if (token) {
        this.cookieService.set('currentToken', token);
      }
    } else {
      localStorage.removeItem('currentActor');
      this.cookieService.delete('currentToken');
    }
  }
}
