import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripApplication } from 'src/app/models/trip-application.model';
import { TripApplicationService } from 'src/app/services/trip-application.service';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-application-list',
  templateUrl: './trip-application-list.component.html',
  styleUrls: ['./trip-application-list.component.css']
})
export class TripApplicationListComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  private tripApplications: TripApplication[];
  private tripsTitles = new Map();
  private explorersNames = new Map();
  private backgroundColor = new Map();

  dtOptions: any = {};

  constructor(private authService: AuthService,
    private tripApplicationService: TripApplicationService,
    private router: Router,
    private translateService: TranslateService,
    private actorService: ActorService,
    private tripService: TripService) {
    super(translateService);
  }

  getExplorer(explorerId: string) {
    let explorer;
    this.actorService.getActor(explorerId).then((data: any) => {
      explorer = data;
    }).catch(
      error => {
        console.log(error);
      }
    );

    console.log(explorer);
    return explorer;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      lengthMenu: [[2, 4, 6, -1], [2, 4, 6, 'All']],
      data: this.tripApplications
    };

    this.currentActor = this.authService.getCurrentActor();
    this.tripApplications = [];

    this.tripApplicationService.getTripApplications(this.currentActor.role.toLowerCase(), this.currentActor.id).then((data: any) => {
      this.tripApplications = data;

      for (let i = 0; i < this.tripApplications.length; i++) {
        this.tripService.getTrip(this.tripApplications[i].trip)
          .then((trip) => {
            this.tripsTitles.set(this.tripApplications[i].id, trip.title);

            if (this.tripApplications[i].status === 'PENDING') {
              const currentDate = new Date();
              const futureDate = new Date(trip.startDate);
              const daysDifference = Math.ceil((futureDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

              if (daysDifference < 30) {
                this.backgroundColor.set(this.tripApplications[i].id, '#fc8181');
              } else {
                this.backgroundColor.set(this.tripApplications[i].id, '#fff');
              }
            } else if (this.tripApplications[i].status === 'REJECTED') {
              this.backgroundColor.set(this.tripApplications[i].id, '#cbd5e0');
            } else if (this.tripApplications[i]. status === 'DUE') {
              this.backgroundColor.set(this.tripApplications[i].id, '#f6e05e');
            } else if (this.tripApplications[i]. status === 'ACCEPTED') {
              this.backgroundColor.set(this.tripApplications[i].id, '#68d391');
            } else if (this.tripApplications[i]. status === 'CANCELLED') {
              this.backgroundColor.set(this.tripApplications[i].id, '#81e6d9');
            }

            this.actorService.getActor(this.tripApplications[i].explorer)
              .then((explorer) => {
                this.explorersNames.set(this.tripApplications[i].id, explorer.name + ' ' + explorer.surname);
              }).catch((err) => {
                console.error(err);
              });
          }).catch((err) => {
            console.error(err);
          });
      }

    }).catch(
      error => {
        console.log(error);
      }
    );
  }
}
