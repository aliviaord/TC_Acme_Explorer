import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import Spanish from 'flatpickr/dist/l10n/es.js';
import English from 'flatpickr/dist/l10n/uk.js';
import { auth } from 'firebase';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent extends TranslatableComponent implements OnInit {
  
  id: string;
  tripForm: FormGroup;
  flatpickrOptions: FlatpickrOptions = {
    locale: this.getLang() == 'es' ? Spanish.es : English.en,
    dateFormat: 'd/m/Y'
  };

  trip = new Trip();
  
  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
      super(translateService);
  }

  getLang() {
    if (localStorage.getItem('language') !== null) {
      return localStorage.getItem('language');
    }
    return this.translateService.getBrowserLang();
  }

  createForm(trip) {
    this.tripForm = this.fb.group({
      id: this.fb.control(trip.id),
      title: this.fb.control(trip.title),
      description: this.fb.control(trip.description),
      price: this.fb.control(trip.price),
      requirements: this.fb.control(trip.requirements),
      startDate: this.fb.control(trip.startDate),
      endDate: this.fb.control(trip.endDate),
      pictures: this.fb.control(trip.pictures),
      publicationDate: this.fb.control(trip.publicationDate),
      stages: this.fb.array(trip.stages.map(stage => this.fb.group({
        title: this.fb.control(stage.title),
        description: this.fb.control(stage.description),
        price: this.fb.control(stage.price)
      }))),
      manager: this.fb.control(trip.title),
    });
    this.trip = trip;
  }

  createStage(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
      price: ['']
    });
  }

  addStage(): void {
    (this.tripForm.controls['stages'] as FormArray).push(this.createStage())
  }

  deleteStage(index): void {
    (this.tripForm.controls['stages'] as FormArray).removeAt(index)
  }

  onEditTrip() {
    let trip = this.tripForm.value;
    trip.manager = this.authService.getCurrentActor().id;
    trip.price = 500;
    this.tripService.editTrip(trip)
    .then(res => {
      console.log(res); 
      this.router.navigate(['/my-trips']);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id)
      .then((trip) => {
        this.createForm(trip);
      }).catch((err) => {
        console.error(err);
      });
  }

}
