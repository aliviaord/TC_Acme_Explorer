import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { InfoMessage } from 'src/app/models/info-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends TranslatableComponent implements OnInit, OnDestroy {

  infoMessage: string;
  cssClass: string;
  subscription: Subscription;
  showMessage = true;

  constructor(private translateService: TranslateService,
    private infoMessageService: InfoMessageService) {
    super(translateService);
  }

  ngOnInit() {
    this.subscription = this.infoMessageService.infoMessage.subscribe(
      (data: InfoMessage) => {
        if (data) {
          this.infoMessage = data.infoMessage;
          this.cssClass = data.cssClass;
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
