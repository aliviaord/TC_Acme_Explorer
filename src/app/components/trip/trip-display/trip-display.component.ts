import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { TripApplication } from 'src/app/models/trip-application.model';
import { TripApplicationService } from 'src/app/services/trip-application.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  id: string;
  trip = new Trip();
  audits = [];
  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'autoplay': true,
    'autoplaySpeed': 2000,
    'fade': true,
    'arrows': true,
    'dots': true,
    'nextArrow': '<button class="bg-white h-10 w-10 text-orange-400 text-xl rounded-full right-0 absolute custom-arrow">'
      + '<i class="fa fa-arrow-right"></i></button>',
    'prevArrow': '<button class="bg-white h-10 w-10 bottom-0 absolute custom-arrow text-orange-400 text-xl rounded-full">'
      + '<i class="fa fa-arrow-left"></i></button>'
  };
  moment = moment;
  
  private randomSponsorship: Sponsorship;
  private currentActor: Actor;
  private hasStarted: Boolean;

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private sponsorshipService: SponsorshipService,
    private authService: AuthService,
    private tripApplicationService: TripApplicationService) {
    super(translateService);
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id)
      .then((val) => {
        if ((!this.currentActor || (val.manager !== this.currentActor.id)) && moment(val.publicationDate).isAfter(moment())) {
          this.router.navigate(['/denied-access']);
        }
        this.trip = val;

        const currentDate = new Date();
        const startingDate = new Date(val.startDate);
        this.hasStarted = currentDate > startingDate;

        this.tripService.getTripAudits(this.id)
          .then((audits) => {
            this.audits = audits;
          }).catch((err) => {
            console.error(err);
          });
      }).catch((err) => {
        console.error(err);
      });
      this.dtOptions = {
        searching: false,
        lengthChange: false,
        info: false,
        ordering: false
      };

    this.sponsorshipService.getTripSponsorships(this.id).then((data: any) => {
      let sponsorship = null;
      if (data.length > 0) {
        while (sponsorship == null || sponsorship.paid === false) {
          sponsorship = data[Math.floor(Math.random() * data.length)];
        }
      }
      this.randomSponsorship = sponsorship;
    }).catch(
      error => {
        console.log(error);
    });
  }

  toggleModal () {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }

  onAccept(form: NgForm) {
    const newTripApplication = new TripApplication();

    newTripApplication.id = null;
    newTripApplication.moment = new Date();
    newTripApplication.status = 'PENDING';
    newTripApplication.comments = form.value.comments;
    newTripApplication.paidDate = null;
    newTripApplication.rejectedReason = null;
    newTripApplication.trip = this.trip.id;
    newTripApplication.explorer = this.currentActor.id;
    newTripApplication.manager = this.trip.manager;

    this.tripApplicationService.createTripApplication(newTripApplication)
      .then((val) => {
        console.log(val);
        this.router.navigate(['/trips/' + this.trip.id]);
      }).catch((err) => {
        console.error(err);
      });
  }
}
