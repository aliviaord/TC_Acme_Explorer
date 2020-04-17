import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '../../../app-routing.module';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { MainComponent } from '../../master/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { TripDisplayComponent } from '../trip-display/trip-display.component';
import { EditTripComponent } from '../edit-trip/edit-trip.component';
import { CreateTripComponent } from '../create-trip/create-trip.component';
import { DisplayAuditComponent } from '../../audit/display-audit/display-audit.component';
import { AuditListComponent } from '../../audit/audit-list/audit-list.component';
import { CreateAuditComponent } from '../../audit/create-audit/create-audit.component';
import { TripApplicationListComponent } from '../../tripApplication/trip-application-list/trip-application-list.component';
import { SponsorshipListComponent } from '../../sponsorship/sponsorship-list/sponsorship-list.component';
import { DashboardDisplayComponent } from '../../dashboard/dashboard-display/dashboard-display.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../security/denied-access-page/denied-access-page.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DataTablesModule } from 'angular-datatables';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { TripListComponent } from './trip-list.component';
import { TripService } from 'src/app/services/trip.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;
  let tripService: TripService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        LoginComponent,
        RegisterComponent,
        TripListComponent,
        TripDisplayComponent,
        EditTripComponent,
        CreateTripComponent,
        DisplayAuditComponent,
        AuditListComponent,
        CreateAuditComponent,
        TripApplicationListComponent,
        SponsorshipListComponent,
        DashboardDisplayComponent,
        NotFoundPageComponent,
        TermsAndConditionsComponent,
        DeniedAccessPageComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        Ng5SliderModule,
        NgxDaterangepickerMd.forRoot(),
        DataTablesModule,
        SlickCarouselModule,
        Ng2FlatpickrModule,
        InfiniteScrollModule,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/trips'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be five items in the collection', async(done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      expect(component.trips.length).toEqual(5);
      done();
    })
  });

  it('should retrieve the third trip since it is the ' +
    'only one flagged as cancelled', async(done) => {
      component.ngOnInit();
      fixture.detectChanges();
      spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

      fixture.whenStable().then(() => {
        expect(component.trips.filter(trip => trip.cancelReason != null))
        .toContain(component.trips[2])
        done();
      })
  });

  it('should retrieve trip with three pictures', async(done) => {
    component.ngOnInit();
      fixture.detectChanges();
      spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

      fixture.whenStable().then(() => {
        expect(component.trips.filter(trip => trip.pictures.length == 3))
        .toContain(component.trips[0])
        done();
      })
  });
});
