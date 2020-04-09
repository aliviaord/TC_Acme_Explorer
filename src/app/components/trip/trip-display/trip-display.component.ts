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
  trip = new Trip();
  private id: string;
  private pictureId: number;
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true, 
    "autoplaySpeed": 2000,
    "fade": true,
    "arrows": true,
    "dots": true,
    "nextArrow": '<button class="bg-white h-10 w-10 text-orange-400 text-xl rounded-full right-0 absolute custom-arrow"><i class="fa fa-arrow-right"></i></button>',
    "prevArrow": '<button class="bg-white h-10 w-10 bottom-0 absolute custom-arrow text-orange-400 text-xl rounded-full"><i class="fa fa-arrow-left"></i></button>'
  };
  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private route: ActivatedRoute) {
    super(translateService);
  }

  setPictureId(index: number) {
    this.pictureId = index;
  }

  ngOnInit() {
    this.pictureId = 0;
    this.id = this.route.snapshot.params['id'];

    this.tripService.getTrip(this.id)
      .then((val) => {
        this.trip = val;
      }).catch((err) => {
        console.error(err);
      });
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
}
