import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent implements OnInit {
  private ticker: String;
  private title: String;
  private description: String;
  private price: Number;
  private requirements: String;
  private startDate: Date;
  private endDate:  Date;
  private pictures: string[];
  private publicationDate: Date;
  private cancelReason: String;

  constructor() {
    this.ticker = '200321-QYUW';
    this.title = 'Trip to Myst Falls';
    this.description = 'Visit this magic and desert island with your closest friends. ' +
      'There you can find and have a taste of its famous world-known fruit: apples.';
    this.price = 650;
    this.requirements = 'You must be 18 or older to join this trip. Don\'t forget to bring your shovel.';
    this.startDate = new Date('2020-05-20');
    this.endDate = new Date('2020-05-27');
    this.pictures = ['../../../assets/mystfalls_1.jpg', '../../../assets/mystfalls_2.jpg', '../../../assets/mystfalls_3.jpg'];
    this.publicationDate = new Date('2020-03-21');
    this.cancelReason = null;
  }

  getDescription() {
    return this.description;
  }

  ngOnInit() {
  }

}
