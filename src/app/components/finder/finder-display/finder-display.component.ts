import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { FinderService } from 'src/app/services/finder.service';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Finder } from 'src/app/models/finder.model';

@Component({
  selector: 'app-finder-display',
  templateUrl: './finder-display.component.html',
  styleUrls: ['./finder-display.component.css']
})
export class FinderDisplayComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  finder = new Finder();

  constructor(private translateService: TranslateService,
    private finderService: FinderService,
    private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.finderService.getFinder(this.currentActor.id)
      .then((val) => {
        this.finder = val[0];
      }).catch((err) => {
        console.error(err);
      });
  }

}
