import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Options, ChangeContext } from 'ng5-slider';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

const MAX_TRIPS = 6
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent extends TranslatableComponent implements OnInit {
  searchForm: FormGroup;

  public trips: Trip[];
  today: number;
  options: Options = {
    floor: 0,
    ceil: 1000,
    animate: false
  };
  locale = {
    applyLabel: this.getLang() == 'es' ? 'Aplicar' : 'Apply',
    format: this.getLang() == 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY',
  };
  dates = {
    startDate: moment(),
    endDate: moment().add(1, 'years')
  }
  moment: any = moment;
  numTrips = MAX_TRIPS;
  minPrice = 0;
  maxPrice = 1000;
  managerView = false;

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService) {
    super(translateService);
    this.createForm();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.locale = {
        applyLabel: event.lang == 'es' ? 'Aplicar' : 'Apply',
        format: event.lang == 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY',
      };
    });
  }

  getLang() {
    if (localStorage.getItem('language') !== null) {
      return localStorage.getItem('language');
    }
    return this.translateService.getBrowserLang();
  }

  getPublicationDate(index: number) {
    return new Date(this.trips[index].publicationDate);
  }

  getTrips() {
    if (this.route.snapshot.url.length > 0 && this.route.snapshot.url[0].path == 'my-trips') {
      var managerId = this.authService.getCurrentActor().id;
      this.managerView = true;
      return this.tripService.getManagerTrips(0, MAX_TRIPS, managerId);
    }
    this.managerView = false;
    return this.tripService.getTripsPage(0, MAX_TRIPS, null, this.minPrice, this.maxPrice);
  }

  ngOnInit() {
    this.getTrips()
      .then((response: Trip[]) => {
        this.trips = <Trip[]>response;
      }).catch(error => {
        console.error(error);
      });
  }

  createForm() {
    this.searchForm = this.fb.group({
      text: [''],
      dates: [{
          startDate: moment(),
          endDate: moment().add(1, 'years')
        }],
      prices: new FormControl([0, 1000])
    });
  }

  searchTrips(changeContext: ChangeContext) {
    let search = this.searchForm.value;
    this.minPrice = changeContext ? changeContext.value : 0;
    this.maxPrice = changeContext ? changeContext.highValue : 1000;
    this.dates.startDate = search.dates.startDate.toDate();
    this.dates.endDate = search.dates.endDate.toDate();
    
    this.tripService.getTripsPage(0, MAX_TRIPS, search.text, this.minPrice, this.maxPrice).then(trips => {
      this.trips = trips;
    }).catch(error => {
        console.error(error);
    });
  }

  onScrollDown(ev) {
    const startIndex = this.trips.length;
    if (this.route.snapshot.url.length > 0 && this.route.snapshot.url[0].path == 'my-trips') {
      var managerId = this.authService.getCurrentActor().id;
      this.tripService.getManagerTrips(startIndex, MAX_TRIPS, managerId)
      .then(val => { this.trips = this.trips.concat(val); })
      .catch(err => { console.log(err); });
    } else {
      this.tripService.getTripsPage(startIndex, MAX_TRIPS, 
      null, this.minPrice, this.maxPrice)
      .then(val => { this.trips = this.trips.concat(val); })
      .catch(err => { console.log(err); });
    }
  }
}
