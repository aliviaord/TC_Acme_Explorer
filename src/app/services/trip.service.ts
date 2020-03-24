import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor() { }

  createTrips(): Trip[] {
    let trip: Trip;
    let trips: Trip[];

    trips = new Array();
    // Trip 1
    trip = new Trip();
    trip.ticker = '200321-QYUW';
    trip.title = 'Trip to Myst Falls';
    trip.description = 'Visit this magic and desert island with your closest friends. ' +
      'There you can find and have a taste of its famous world-known fruit: apples.';
    trip.price = 650;
    trip.requirements = 'You must be 18 or older to join this trip. Don\'t forget to bring your shovel.';
    trip.startDate = new Date('2020-05-20');
    trip.endDate = new Date('2020-05-27');
    trip.pictures = ['../../../assets/mystfalls_1.jpg', '../../../assets/mystfalls_2.jpg'];
    trip.publicationDate = new Date('2020-03-21');
    trip.cancelReason = null;
    trips.push(trip);
    // Trip 2
    trip = new Trip();
    trip.ticker = '200321-AJSF';
    trip.title = 'Visit Cornelia!';
    trip.description = 'Thinking about new beginnings? Cornelia might be your place. ' +
      'You\'ll get mystified by how this city screams your name.';
    trip.price = 2530;
    trip.requirements = 'Buy lover by Taylor Swift on iTunes.';
    trip.startDate = new Date('2020-03-10');
    trip.endDate = new Date('2020-04-10');
    trip.pictures = ['../../../assets/cornelia_1.jpg', '../../../assets/cornelia_2.jpg',
      '../../../assets/cornelia_3.jpg', '../../../assets/cornelia_4.jpg'];
    trip.publicationDate = new Date('2020-02-10');
    trip.cancelReason = null;
    trips.push(trip);
    // Trip 3
    trip = new Trip();
    trip.ticker = '200209-HAHL';
    trip.title = 'Boaters and pirates';
    trip.description = 'Come to enjoy the sea and its mindblowing beaches. We tie the capes ' +
      'and you drive in this sea that\'s full of lights.';
    trip.price = 425;
    trip.requirements = 'You must know how to swim.';
    trip.startDate = new Date('2020-05-28');
    trip.endDate = new Date('2020-06-05');
    trip.pictures = [];
    trip.publicationDate = new Date('2020-03-10');
    trip.cancelReason = 'Public gatherings have been banned because of Coronavirus.';
    trips.push(trip);
    // Trip 4
    trip = new Trip();
    trip.ticker = '200106-CCYW';
    trip.title = 'Tell the gardener I bring flowers';
    trip.description = 'Tired of living in a crowded city? In this trip you can enjoy ' +
      'of some relaxing gardening courses far from all the noises.';
    trip.price = 305;
    trip.requirements = 'Some patience!';
    trip.startDate = new Date('2020-07-16');
    trip.endDate = new Date('2020-07-26');
    trip.pictures = [];
    trip.publicationDate = new Date('2020-03-10');
    trip.cancelReason = null;
    trips.push(trip);
    // Trip 5
    trip = new Trip();
    trip.ticker = '200322-UIWE';
    trip.title = 'Oxytocin island';
    trip.description = 'Discover the food paradise: oranges, madeleines, sardines, broccoli... ' +
      'Everything a foodaholic can dream about.';
    trip.price = 500;
    trip.requirements = 'You must love Maialen';
    trip.startDate = new Date('2020-05-27');
    trip.endDate = new Date('2020-06-27');
    trip.pictures = ['../../../assets/oxytocin_1.jpg'];
    trip.publicationDate = new Date('2020-03-15');
    trip.cancelReason = null;
    trips.push(trip);
    return trips;
  }
}
