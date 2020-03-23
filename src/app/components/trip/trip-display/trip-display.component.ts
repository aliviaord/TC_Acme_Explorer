import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent implements OnInit {
  private trip: Trip;

  constructor() {
    this.trip = new Trip();
    this.trip.ticker = '200321-QYUW';
    this.trip.title = 'Trip to Myst Falls';
    this.trip.description = 'Visit this magic and desert island with your closest friends. ' +
      'There you can find and have a taste of its famous world-known fruit: apples.';
    this.trip.price = 650;
    this.trip.requirements = 'You must be 18 or older to join this trip. Don\'t forget to bring your shovel.';
    this.trip.startDate = new Date('2020-05-20');
    this.trip.endDate = new Date('2020-05-27');
    this.trip.pictures = ['../../../assets/mystfalls_1.jpg', '../../../assets/mystfalls_2.jpg', '../../../assets/mystfalls_3.jpg'];
    this.trip.publicationDate = new Date('2020-03-21');
    this.trip.cancelReason = null;
  }

  ngOnInit() {
  }

}
