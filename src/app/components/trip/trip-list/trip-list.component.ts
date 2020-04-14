import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Options, ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent extends TranslatableComponent implements OnInit {
  searchForm: FormGroup;

  private trips: Trip[];
  today: number;
  options: Options = {
    floor: 0,
    ceil: 1000,
    animate:false
  };
  maxValue = 1000;
  minValue = 0;

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
      super(translateService);
      this.createForm();
  }

  getPublicationDate(index: number) {
    return new Date(this.trips[index].publicationDate);
  }

  getTrips() {
    if (this.route.snapshot.url.length > 0 && this.route.snapshot.url[0].path == 'my-trips') { 
      return this.tripService.getManagerTrips('5e78bd7713b68995265511a5');
    }
    return this.tripService.getTrips();
  }
  
  ngOnInit() {
    this.getTrips()
      .then((response: Trip[]) => {
        this.trips = <Trip[]>response;
      }).catch(error => {
        console.error(error);
      });
  }

  createForm() {
    this.searchForm = this.fb.group({
      text: [''],
    });
  }

  searchTrips(changeContext: ChangeContext) {
    let search = this.searchForm.value;
    let minValue = changeContext ? changeContext.value : this.minValue
    let maxValue = changeContext ? changeContext.highValue : this.maxValue
    this.tripService.searchTrips(search.text, minValue, maxValue)
      .then((response: Trip[]) => {
        this.trips = <Trip[]>response;
      }).catch(error => {
        console.error(error);
    });
  }

}
