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

  constructor(private tripService: TripService,
    private translateService: TranslateService) {
      super(translateService);
      this.trips = tripService.createTrips();
  }

  getPictures(index: number) {
    return this.trips[index].pictures;
  }

  getTrips() {
    return this.trips;
  }

  ngOnInit() {
  }

}
