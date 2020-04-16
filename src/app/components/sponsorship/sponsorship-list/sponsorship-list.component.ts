import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TripService } from 'src/app/services/trip.service';

const MAX_ITEMS = 10;

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent extends TranslatableComponent implements OnInit {

  private numObjects = MAX_ITEMS;
  private currentActor: Actor;
  private sponsorships: Sponsorship[];
  private tripsTitles = new Map();

  constructor(private translateService: TranslateService,
    private authService: AuthService,
    private sponsorshipService: SponsorshipService,
    private tripService: TripService) {
    super(translateService);
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.sponsorships = [];

    this.sponsorshipService.getSponsorships(0, MAX_ITEMS, this.currentActor.id).then((data: any) => {
      this.sponsorships = data;

      for (let i = 0; i < data.length; i++) {
        this.tripService.getTrip(data[i].trip)
          .then((trip) => {
            if (!this.tripsTitles.has(data[i].trip)) {
              this.tripsTitles.set(data[i].trip, trip.title);
            }
          }).catch((err) => {
            console.log(err);
          });
      }

    }).catch(
      error => {
        console.log(error);
    });
  }

  addItems(startIndex, endIndex, _method) {
    this.sponsorshipService.getSponsorships(startIndex, MAX_ITEMS, this.currentActor.id).then((data: any) => {
      this.sponsorships = this.sponsorships.concat(data);

      for (let i = 0; i < data.length; i++) {
        this.tripService.getTrip(data[i].trip)
          .then((trip) => {
            if (!this.tripsTitles.has(data[i].trip)) {
              this.tripsTitles.set(data[i].trip, trip.title);
            }
          }).catch((err) => {
            console.log(err);
          });
      }

    }).catch(
      error => {
        console.log(error);
    });
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown(ev) {
    const start = this.numObjects;
    this.numObjects += MAX_ITEMS;
    this.appendItems(start, this.numObjects);
  }

  onScrollUp(ev) {
    const start = this.numObjects;
    this.numObjects += MAX_ITEMS;
    this.prependItems(start, this.numObjects);
  }
}
