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
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent extends TranslatableComponent implements OnInit {
  
  private currentActor: Actor;
  tripForm: FormGroup;
  flatpickrOptions: FlatpickrOptions = {
    locale: this.getLang() == 'es' ? Spanish.es : English.en,
    dateFormat: 'd/m/Y'
  };

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
      super(translateService);
      this.createForm();
  }

  getLang() {
    if (localStorage.getItem('language') !== null) {
      return localStorage.getItem('language');
    }
    return this.translateService.getBrowserLang();
  }

  createForm() {
    this.tripForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      requirements: [''],
      startDate: [''],
      endDate: [''],
      pictures: [''],
      publicationDate: [''],
      stages: this.fb.array([this.createStage()]),
      manager: [''],
    });
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

  onCreateTrip() {
    let trip = this.tripForm.value;
    trip.manager = this.authService.getCurrentActor().id;
    trip.price = 500;
    this.tripService.createTrip(trip)
    .then(res => {
      console.log(res); 
      this.router.navigate(['/my-trips']);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    // this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
    //   if (loggedIn) {
    //     this.currentActor = this.authService.getCurrentActor();
    //   } else {
    //     this.currentActor = null;
    //   }
    // });
  }
}
