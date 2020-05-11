import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { FinderService } from 'src/app/services/finder.service';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Finder } from 'src/app/models/finder.model';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import * as moment from 'moment';

@Component({
  selector: 'app-finder-display',
  templateUrl: './finder-display.component.html',
  styleUrls: ['./finder-display.component.css']
})
export class FinderDisplayComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  finder = new Finder();
  minPrice: number;
  maxPrice: number;
  trips: Trip[];
  validTrips = 0;
  dates = {
    startDate: moment(),
    endDate: moment().add(1, 'years')
  };
  moment: any = moment;

  constructor(private translateService: TranslateService,
    private finderService: FinderService,
    private authService: AuthService,
    private tripService: TripService) {
    super(translateService);
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.finderService.getFinder(this.currentActor.id)
      .then((val) => {
        this.finder = val[0];

        this.minPrice = (this.finder.minPrice == null) ? 0 : this.finder.minPrice.valueOf();
        this.maxPrice = (this.finder.maxPrice == null) ? 1000000 : this.finder.maxPrice.valueOf();
        this.dates.startDate = (this.finder.startDate == null) ? moment() : moment(this.finder.startDate);
        this.dates.endDate = (this.finder.endDate == null) ? moment().add(1, 'years') : moment(this.finder.endDate);
      }).catch((err) => {
        console.error(err);
      });
  }

  getTrips() {
    return this.tripService.searchTrips(this.finder.keyword, this.minPrice, this.maxPrice);
  }

  searchTrips() {
    this.getTrips()
      .then((response: Trip[]) => {
        this.trips = <Trip[]>response;

        let validTrips = 0;
        for (let i = 0; i < this.trips.length; i++) {
          if (moment(this.trips[i].publicationDate).isSameOrBefore(moment()) &&
          moment(this.trips[i].startDate).isSameOrAfter(this.dates.startDate) &&
          moment(this.trips[i].endDate).isSameOrBefore(this.dates.endDate)) {
            validTrips += 1;
          }
        }
        this.validTrips = validTrips;

        document.getElementById('nothingToShow').classList.remove('hidden');
        (<HTMLInputElement> document.getElementById('searchButton')).disabled = true;
      }).catch(error => {
        console.error(error);
      });
  }

}
