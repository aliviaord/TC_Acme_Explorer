import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  private userLoggedIn: boolean;
  private activeRole = 'anonymous';

  constructor(private authService: AuthService,
    private translateService: TranslateService) {
      super(translateService);
     }

  changeLanguage(language: string) {
    super.changeLanguage(language);
  }

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role.toString();
      } else {
        this.currentActor = null;
        this.activeRole = 'anonymous';
      }
    });
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }).catch(error => {
        console.log(error);
      });
  }

  expandNavBar() {
    const target = document.getElementById('main-nav');
    target.classList.toggle('hidden');
  }
}
