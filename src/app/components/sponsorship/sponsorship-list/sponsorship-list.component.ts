import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  private sponsorships: Sponsorship[];
  private tripsTitles = new Map();

  dtOptions: any = {};

  constructor(private translateService: TranslateService,
    private authService: AuthService,
    private sponsorshipService: SponsorshipService,
    private tripService: TripService) {
    super(translateService);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      lengthMenu: [[2, 4, 6, -1], [2, 4, 6, 'All']],
      data: this.sponsorships
    };

    this.currentActor = this.authService.getCurrentActor();
    this.sponsorships = [];

    this.sponsorshipService.getSponsorships(this.currentActor.id).then((data: any) => {
      this.sponsorships = data;

      for (let i = 0; i < this.sponsorships.length; i++) {
        this.tripService.getTrip(this.sponsorships[i].trip)
          .then((trip) => {
            this.tripsTitles.set(this.sponsorships[i].id, trip.title);
          }).catch((err) => {
            console.log(err);
          });
      }

    }).catch(
      error => {
        console.log(error);
    });
  }

}
