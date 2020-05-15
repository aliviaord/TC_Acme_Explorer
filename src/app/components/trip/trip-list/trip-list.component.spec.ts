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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { TripListComponent } from './trip-list.component';
import { TripService } from 'src/app/services/trip.service';
import { TripApplicationPaymentComponent } from '../../tripApplication/trip-application-payment/trip-application-payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FinderDisplayComponent } from '../../finder/finder-display/finder-display.component';
import { EditActorComponent } from '../../actor/edit-actor/edit-actor.component';
import { FinderEditComponent } from '../../finder/finder-edit/finder-edit.component';
import { CookieService } from 'ngx-cookie-service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const firebaseConfig = {
  apiKey: 'AIzaSyBeyK3jw-oLh1MyZMHrydSJwy0WTxWDZ-0',
  authDomain: 'acme-explorer-84e09.firebaseapp.com',
  databaseURL: 'https://acme-explorer-84e09.firebaseio.com',
  projectId: 'acme-explorer-84e09',
  storageBucket: 'acme-explorer-84e09.appspot.com',
  messagingSenderId: '28765984031',
  appId: '1:28765984031:web:1c91ac9bcbd27999e2cc2a',
  measurementId: 'G-HPY17ELML2'
};

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
        DeniedAccessPageComponent,
        FinderDisplayComponent,
        EditActorComponent,
        TripApplicationPaymentComponent,
        FinderEditComponent
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
        AngularFireModule.initializeApp(firebaseConfig),
        AppRoutingModule,
        HttpClientModule,
        Ng5SliderModule,
        NgxDaterangepickerMd.forRoot(),
        DataTablesModule,
        SlickCarouselModule,
        InfiniteScrollModule,
        NgxPayPalModule,
        FileUploadModule,
        CalendarModule,
        BrowserAnimationsModule
      ],


      providers: [
        {provide: APP_BASE_HREF, useValue : '/trips'},
        AngularFireAuth,
        CookieService
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

  it('should be six items in the collection', async(done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTripsPage').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      expect(component.trips.length).toEqual(6);
      done();
    });
  });

  it('should retrieve the third trip since it is the ' +
    'only one flagged as cancelled', async(done) => {
      component.ngOnInit();
      fixture.detectChanges();
      spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

      fixture.whenStable().then(() => {
        expect(component.trips.filter(trip => trip.cancelReason != null))
        .toContain(component.trips[2]);
        done();
      });
  });

  it('should retrieve trip with three pictures', async(done) => {
    component.ngOnInit();
      fixture.detectChanges();
      spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

      fixture.whenStable().then(() => {
        expect(component.trips.filter(trip => trip.pictures.length === 3))
        .toContain(component.trips[0]);
        done();
      });
  });
});
