import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '../../../app-routing.module';
import { MainComponent } from '../../master/main/main.component';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { TripListComponent } from '../trip-list/trip-list.component';
import { EditTripComponent } from './edit-trip.component';
import { CreateTripComponent } from '../create-trip/create-trip.component';
import { TripDisplayComponent } from '../trip-display/trip-display.component';
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('EditTripComponent', () => {
  let component: EditTripComponent;
  let fixture: ComponentFixture<EditTripComponent>;
  let tripService: TripService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        AppRoutingModule,
        Ng5SliderModule,
        NgxDaterangepickerMd,
        DataTablesModule,
        SlickCarouselModule,
        InfiniteScrollModule,
        NgxPayPalModule,
        FileUploadModule,
        CalendarModule,
        BrowserAnimationsModule
      ],
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
      providers: [
        {provide: APP_BASE_HREF, useValue : '/'},
        AngularFireAuth,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {id: '5e78ac3cf6f9577fd149c9ba'}
            }
          }
        },
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize total price to 0', () => {
    expect(component.totalPrice).toEqual(0);
  });

  it('should have initialized item', () => {
    expect(component.trip).not.toBeUndefined;
  });

  it('should have initialized pictures array', () => {
    expect(component.pictures).toEqual([]);
  });

  it('should have correct price', async(done) => {
    expect(component.trip.price).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      expect(component.trip.price).toBeGreaterThan(600);
      done();
    });
  });

  it('should have correct id', async(done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      expect(component.trip.id).toEqual('5e78ac3cf6f9577fd149c9ba');
      done();
    });
  });

  it('should have correct title', async(done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      expect(component.trip.title).toEqual('Trip to Myst Falls');
      done();
    });
  });


});
