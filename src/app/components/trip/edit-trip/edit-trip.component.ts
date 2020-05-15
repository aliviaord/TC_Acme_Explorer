import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormArray, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Spanish from 'flatpickr/dist/l10n/es.js';
import English from 'flatpickr/dist/l10n/uk.js';
import { InfoMessageService } from '../../../services/info-message.service';
import { ValidateStartDate, ValidateEndDate, ValidatePublicationDate } from 'src/app/validators/trip.validator';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent extends TranslatableComponent implements OnInit {
  
  id: string;
  tripForm: FormGroup;
  totalPrice = 0;
  trip = new Trip();
  pictures = [];

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private infoMessageService: InfoMessageService) {
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
      title: [trip.title, Validators.required],
      description: [trip.description, Validators.required],
      price: this.fb.control(trip.price),
      requirements: [trip.requirements, Validators.required],
      startDate: [new Date(trip.startDate), Validators.required],
      endDate: [new Date(trip.endDate), Validators.required],
      pictures: this.fb.control(trip.pictures),
      publicationDate: [new Date(trip.publicationDate), Validators.required],
      stages: this.fb.array(trip.stages.map(stage => this.fb.group({
        title: [stage.title, Validators.required],
        description: [stage.description, Validators.required],
        price: [stage.price, Validators.required],
      }))),
      manager: this.fb.control(trip.title),
    }, { validator: [ValidateStartDate(), ValidateEndDate(), ValidatePublicationDate()] });
    this.trip = trip;
    this.totalPrice = trip.price;
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

  onEditTrip() {
    let trip = this.tripForm.value;
    trip.manager = this.authService.getCurrentActor().id;
    trip.price = 500;
    trip.pictures = this.pictures;
    this.tripService.editTrip(trip)
    .then(res => {
      console.log(res); 
      this.infoMessageService.notifyMessage('messages.trip.edit.correct',
              'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
      this.router.navigate(['/my-trips']);
    }, err => {
      console.log(err);
      this.infoMessageService.notifyMessage('messages.trip.edit.failed',
              'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
    });
  }

  removeTrip() {
    let alertMsg = 'Are you sure you want to remove the trip?'
    if (this.getLang() == 'es') {
      alertMsg = '¿Estás seguro de que quieres eliminar el viaje?';
    }
    if(confirm(alertMsg)) {
      this.tripService.removeTrip(this.trip.id);
      this.infoMessageService.notifyMessage('messages.trip.removed.correct',
              'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
      this.router.navigate(['/my-trips']);
    }
  }

  toggleModal () {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }

  onReject(form: NgForm) {
    this.trip.cancelReason = form.value.rejectedReason;
    this.tripService.editTrip(this.trip)
      .then((val) => {
        console.log(val);
        this.router.navigate(['/my-trips']);
      }).catch((err) => {
        console.error(err);
      });
  }

  ngOnInit() { 
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id)
      .then((trip) => {
        if(!this.authService.getCurrentActor() || trip.manager != this.authService.getCurrentActor().id) {
          this.router.navigate(['/denied-access']);
        }
        if(trip.cancelReason) {
          this.infoMessageService.notifyMessage('messages.trip.edit.failed.cancelReason',
              'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
          this.router.navigate(['/denied-access']);
        } else if(moment(trip.startDate).diff(moment(), 'weeks') < 1) {
          this.infoMessageService.notifyMessage('messages.trip.edit.failed.date',
              'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
          this.router.navigate(['/denied-access']);
        }
        this.pictures = trip.pictures.slice() // slice to avoid same ref
        this.createForm(trip);
      }).catch((err) => {
        console.error(err);
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

  removePicture(picture) {
    console.log(this.pictures.indexOf(picture))
    this.pictures.splice(this.pictures.indexOf(picture), 1);
    this.trip.pictures.splice(this.trip.pictures.indexOf(picture), 1); // delete here too to avoid display in view
    console.log(this.pictures)
  }

}
