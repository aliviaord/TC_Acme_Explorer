import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateStartDate, ValidateEndDate, ValidatePublicationDate } from 'src/app/validators/trip.validator';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;
  pictures = []; // Here we store the ids of the pictures for the trip
  totalPrice = 0;

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
      startDate: ['', [Validators.required]],
      endDate: ['', Validators.required],
      pictures: [''],
      publicationDate: ['', Validators.required],
      stages: this.fb.array([this.createStage()]),
      manager: [''],
    }, { validator: [ValidateStartDate(), ValidateEndDate(), ValidatePublicationDate()] });
    this.tripForm.get('stages').valueChanges.subscribe(values => {
      var stages = this.tripForm.get('stages')['controls'];
      var price = 0;
      for (var i in stages) {
        var stage = stages[i];
        price += stage['controls']['price'].value;
      }
      this.totalPrice = price;
      console.log(this.totalPrice)
    }) 
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
    trip.price = this.totalPrice;
    trip.pictures = this.pictures;
    trip.ticker = this.generateTicker(new Date);
    this.tripService.createTrip(trip)
      .then(res => {
        console.log(res);
        this.router.navigate(['/my-trips']);
      }, err => {
        console.log(err);
      });
  }

  generateTicker(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().substr(-2);
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var selectedChars = '';
    for (var i = 0; i < 4; i++) {
        selectedChars += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    return year + month + day + '-' + selectedChars;
}

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
