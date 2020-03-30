import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {
  private trip: Trip;
  private id: number;
  private pictureId: number;

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private activeRoute: ActivatedRoute) {
    super(translateService);
  }

  setPictureId(index: number) {
    this.pictureId = index;
  }

  getTrip() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
    });
    return this.tripService.getTrip(this.id);
  }

  ngOnInit() {
    this.pictureId = 0;

    this.getTrip()
      .then((response: Trip) => {
        this.trip = <Trip>response;
      }).catch(error => {
        console.error(error);
      });
  }
}
