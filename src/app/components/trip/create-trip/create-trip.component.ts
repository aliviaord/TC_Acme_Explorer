import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;
  pictures = [] // Here we store the ids of the pictures for the trip
  
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
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [''],
      requirements: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      pictures: [''],
      publicationDate: ['', Validators.required],
      stages: this.fb.array([this.createStage()]),
      manager: [''],
    });
  }

  createStage(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
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
    trip.pictures = this.pictures;
    this.tripService.createTrip(trip)
      .then(res => {
        console.log(res);
        this.router.navigate(['/my-trips']);
      }, err => {
        console.log(err);
      });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async onPictureUpload(event) {
    let fileReader = new FileReader();
    let that = this;
    for (let file of event.files) {
      await this.delay(1000);
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
          that.pictures.push(fileReader.result)
          console.log(that.pictures)
      };
    }
  }

  onPictureRemove(event) {
    if (this.pictures.length > 0) {
    let fileReader = new FileReader();
    let that = this;
    fileReader.readAsDataURL(event.file);
    fileReader.onload = function () {
        that.pictures.splice(that.pictures.indexOf(fileReader.result), 1);
        console.log(that.pictures)
      };
    }
  }

  ngOnInit() {
  }


}
