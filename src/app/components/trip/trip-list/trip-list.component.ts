import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {
  private trips: Trip[];
  today: number;

  constructor(private tripService: TripService,
    private translateService: TranslateService) {
      super(translateService);
  }

  getPictures(index: number) {
    return this.trips[index].pictures;
  }

  getPublicationDate(index: number) {
    return new Date(this.trips[index].publicationDate);
  }

  getTrips() {
    return this.tripService.getTrips();
  }

  ngOnInit() {
    this.today = Date.now();

    this.getTrips()
      .then((response: Trip[]) => {
        this.trips = <Trip[]>response;
      }).catch(error => {
        console.error(error);
      });
  }

}
