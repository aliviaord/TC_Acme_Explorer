import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoMessage } from '../models/info-message.model';

@Injectable({
  providedIn: 'root'
})
export class InfoMessageService {
  infoMessage: Subject<InfoMessage>;

  constructor() {
    this.infoMessage = new Subject();
  }

  notifyMessage(infoMessage: string, cssClass: string) {
    this.infoMessage.next(new InfoMessage(infoMessage, cssClass));
  }

  removeMessage() {
    this.infoMessage.next();
  }
}
