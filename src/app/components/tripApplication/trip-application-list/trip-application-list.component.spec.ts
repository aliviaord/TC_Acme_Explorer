import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripApplicationListComponent } from './trip-application-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainComponent } from '../../master/main/main.component';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { TripDisplayComponent } from '../../trip/trip-display/trip-display.component';
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { EditTripComponent } from '../../trip/edit-trip/edit-trip.component';
import { CreateTripComponent } from '../../trip/create-trip/create-trip.component';
import { DisplayAuditComponent } from '../../audit/display-audit/display-audit.component';
import { AuditListComponent } from '../../audit/audit-list/audit-list.component';
import { CreateAuditComponent } from '../../audit/create-audit/create-audit.component';
import { DashboardDisplayComponent } from '../../dashboard/dashboard-display/dashboard-display.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../security/denied-access-page/denied-access-page.component';
import { SponsorshipListComponent } from '../../sponsorship/sponsorship-list/sponsorship-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DataTablesModule } from 'angular-datatables';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { TripApplicationService } from 'src/app/services/trip-application.service';
import { NgxPayPalModule } from 'ngx-paypal';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditActorComponent } from '../../actor/edit-actor/edit-actor.component';
import { TripApplicationPaymentComponent } from '../trip-application-payment/trip-application-payment.component';
import { FinderEditComponent } from '../../finder/finder-edit/finder-edit.component';
import { FinderDisplayComponent } from '../../finder/finder-display/finder-display.component';
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

describe('TripApplicationListComponent', () => {
  let component: TripApplicationListComponent;
  let fixture: ComponentFixture<TripApplicationListComponent>;
  let authService: AuthService;
  let tripApplicationService: TripApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SlickCarouselModule,
        DataTablesModule,
        Ng5SliderModule,
        NgxDaterangepickerMd,
        AngularFireModule.initializeApp(firebaseConfig),
        NgxPayPalModule,
        FileUploadModule,
        CalendarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TripApplicationListComponent,
        MainComponent,
        LoginComponent,
        RegisterComponent,
        TripDisplayComponent,
        TripListComponent,
        EditTripComponent,
        CreateTripComponent,
        DisplayAuditComponent,
        AuditListComponent,
        CreateAuditComponent,
        DashboardDisplayComponent,
        NotFoundPageComponent,
        TermsAndConditionsComponent,
        DeniedAccessPageComponent,
        SponsorshipListComponent,
        EditActorComponent,
        TripApplicationPaymentComponent,
        FinderEditComponent,
        FinderDisplayComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/tripApplications'},
        AngularFireAuth,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripApplicationListComponent);
    component = fixture.componentInstance;
    tripApplicationService = TestBed.get(TripApplicationService);

    authService = TestBed.get(AuthService);
    const manager = new Actor();
    manager.name = 'Maialen';
    manager.surname = 'Gurbindo';
    manager.email = 'chicasobresalto@murphy.com';
    manager.password = 'ot2020';
    manager.address = 'C/ Marina, Nº6';
    manager.phoneNumber = '627629862';
    manager.role = 'MANAGER';
    manager.id = '5e78bbd524b1296d559096fb';
    manager.version = 0;
    authService.setCurrentActor(manager);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be six items in the collection', async(done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripApplicationService, 'getTripApplications').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      expect(component.tripApplications.length).toEqual(6);
      done();
    });
  });

  it('should retrieve the fifth application since it is the ' +
    'only one containing a rejected reason', async(done) => {
      component.ngOnInit();
      fixture.detectChanges();
      spyOn(tripApplicationService, 'getTripApplications').and.returnValue(Promise.resolve(true));

      fixture.whenStable().then(() => {
        expect(component.tripApplications.filter(tripApplication => tripApplication.rejectedReason != null))
        .toContain(component.tripApplications[5]);
        done();
      });
  });

  it('should retrieve the first application since it is the ' +
    'only one containing comments', async(done) => {
      component.ngOnInit();
      fixture.detectChanges();
      spyOn(tripApplicationService, 'getTripApplications').and.returnValue(Promise.resolve(true));

      fixture.whenStable().then(() => {
        expect(component.tripApplications.filter(tripApplication => tripApplication.comments != null))
        .toContain(component.tripApplications[0]);
        done();
      });
  });
});
