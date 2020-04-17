import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Options, ChangeContext } from 'ng5-slider';
import * as moment from 'moment';

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
    endDate: moment().add(3, 'months')
  }
  moment: any = moment;

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    super(translateService);
    this.createForm();
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
      return this.tripService.getManagerTrips('5e78bd7713b68995265511a5');
    }
    return this.tripService.getTrips();
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
          endDate: moment().add(1, 'months')
        }],
      prices: new FormControl([0, 1000])
    });
  }

  searchTrips(changeContext: ChangeContext) {
    let search = this.searchForm.value;
    let minValue = changeContext ? changeContext.value : 0;
    let maxValue = changeContext ? changeContext.highValue : 1000;
    this.dates.startDate = search.dates.startDate.toDate();
    this.dates.endDate = search.dates.endDate.toDate();
    
    this.tripService.searchTrips(search.text, minValue, maxValue).then(trips => {
      this.trips = trips;
    }).catch(error => {
        console.error(error);
    });
  }

}
