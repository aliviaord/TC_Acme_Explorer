import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent extends TranslatableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private trips: Trip[];
  today: number;
  table: any = $('#trips-table');

  constructor(private tripService: TripService,
    private translateService: TranslateService,
    private route: ActivatedRoute) {
      super(translateService);
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
    this.today = Date.now();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getTrips()
      .then((response: Trip[]) => {
        this.trips = <Trip[]>response;
        this.dtTrigger.next();
      }).catch(error => {
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
