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
import { NgForm } from '@angular/forms';

const MAX_ITEMS = 9;

@Component({
  selector: 'app-trip-application-list',
  templateUrl: './trip-application-list.component.html',
  styleUrls: ['./trip-application-list.component.css']
})
export class TripApplicationListComponent extends TranslatableComponent implements OnInit {

  private numObjects = MAX_ITEMS;
  private currentActor: Actor;
  tripApplications: TripApplication[];
  private tripsTitles = new Map();
  private explorersNames = new Map();
  private backgroundColor = new Map();
  private hasStarted = new Map();
  private applicationPrice = new Map();

  constructor(private authService: AuthService,
    private tripApplicationService: TripApplicationService,
    private router: Router,
    private translateService: TranslateService,
    private actorService: ActorService,
    private tripService: TripService) {
    super(translateService);
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.tripApplications = [];

    this.tripApplicationService.getTripApplications(0, MAX_ITEMS, this.currentActor.role.toLowerCase(),
      this.currentActor.id).then((data: any) => {
      this.tripApplications = data;

      for (let i = 0; i < data.length; i++) {
        this.tripService.getTrip(data[i].trip)
          .then((trip) => {

            const currentDate = new Date();
            const futureDate = new Date(trip.startDate);
            if (!this.hasStarted.has(data[i].trip)) {
              this.hasStarted.set(data[i].trip, (currentDate > futureDate));
            }

            this.applicationPrice.set(data[i].id, trip.price);

            if (data[i].status === 'PENDING') {
              const daysDifference = Math.ceil((futureDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

              if (daysDifference < 30) {
                this.backgroundColor.set(data[i].id, ['#fc8181', '#fed7d7']);
              } else {
                this.backgroundColor.set(data[i].id, ['#fff', '#fff']);
              }
            } else if (data[i].status === 'REJECTED') {
              this.backgroundColor.set(data[i].id, ['#cbd5e0', '#edf2f7']);
            } else if (data[i]. status === 'DUE') {
              this.backgroundColor.set(data[i].id, ['#f6e05e', '#fefcbf']);
            } else if (data[i]. status === 'ACCEPTED') {
              this.backgroundColor.set(data[i].id, ['#68d391', '#c6f6d5']);
            } else if (data[i]. status === 'CANCELLED') {
              this.backgroundColor.set(data[i].id, ['#4fd1c5', '#b2f5ea']);
            }

            if (!this.tripsTitles.has(data[i].trip)) {
              this.tripsTitles.set(data[i].trip, trip.title);
            }

            if (!this.explorersNames.has(data[i].explorer)) {
              this.actorService.getActor(data[i].explorer)
                .then((explorer) => {
                  this.explorersNames.set(data[i].explorer, explorer.name + ' ' + explorer.surname);
                }).catch((err) => {
                  console.error(err);
                });
            }
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

  getInternationalCode(status) {
    return 'tripApplication.' + status.toLowerCase();
  }

  changeStatus(tripApplication, newStatus) {
    if (tripApplication) {
      tripApplication.status = newStatus;
      this.tripApplicationService.updateTripApplication(tripApplication)
        .then((val) => {
          console.log(val);
          this.router.navigate(['/tripApplications']);
        }).catch((err) => {
          console.error(err);
        });
    }
  }

  toggleModal () {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }

  onReject(form: NgForm, tripApplication: TripApplication) {
    tripApplication.status = 'REJECTED';
    tripApplication.rejectedReason = form.value.rejectedReason;

    this.tripApplicationService.updateTripApplication(tripApplication)
      .then((val) => {
        console.log(val);
        this.router.navigate(['/tripApplications']);
      }).catch((err) => {
        console.error(err);
      });
  }

  addItems(startIndex, endIndex, _method) {
    this.tripApplicationService.getTripApplications(startIndex, MAX_ITEMS, this.currentActor.role.toLowerCase(),
      this.currentActor.id).then((data: any) => {
      this.tripApplications = this.tripApplications.concat(data);

      for (let i = 0; i < data.length; i++) {
        this.tripService.getTrip(data[i].trip)
          .then((trip) => {

            if (data[i].status === 'PENDING') {
              const currentDate = new Date();
              const futureDate = new Date(trip.startDate);
              const daysDifference = Math.ceil((futureDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

              if (daysDifference < 30) {
                this.backgroundColor.set(data[i].id, ['#fc8181', '#fed7d7']);
              } else {
                this.backgroundColor.set(data[i].id, ['#fff', '#fff']);
              }
            } else if (data[i].status === 'REJECTED') {
              this.backgroundColor.set(data[i].id, ['#cbd5e0', '#edf2f7']);
            } else if (data[i]. status === 'DUE') {
              this.backgroundColor.set(data[i].id, ['#f6e05e', '#fefcbf']);
            } else if (data[i]. status === 'ACCEPTED') {
              this.backgroundColor.set(data[i].id, ['#68d391', '#c6f6d5']);
            } else if (data[i]. status === 'CANCELLED') {
              this.backgroundColor.set(data[i].id, ['#4fd1c5', '#b2f5ea']);
            }

            if (!this.tripsTitles.has(data[i].trip)) {
              this.tripsTitles.set(data[i].trip, trip.title);
            }

            if (!this.explorersNames.has(data[i].explorer)) {
              this.actorService.getActor(data[i].explorer)
                .then((explorer) => {
                  this.explorersNames.set(data[i].explorer, explorer.name + ' ' + explorer.surname);
                }).catch((err) => {
                  console.error(err);
                });
            }
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
