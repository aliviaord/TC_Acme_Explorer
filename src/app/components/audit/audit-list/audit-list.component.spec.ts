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
import { TripDisplayComponent } from '../../trip/trip-display/trip-display.component';
import { EditTripComponent } from '../../trip/edit-trip/edit-trip.component';
import { CreateTripComponent } from '../../trip/create-trip/create-trip.component';
import { DisplayAuditComponent } from '../display-audit/display-audit.component';
import { AuditListComponent } from '../audit-list/audit-list.component';
import { CreateAuditComponent } from '../create-audit/create-audit.component';
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
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { TripService } from 'src/app/services/trip.service';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

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

describe('AuditListComponent', () => {
  let component: AuditListComponent;
  let fixture: ComponentFixture<AuditListComponent>;
  let auditService: AuditService;
  let authService: AuthService;

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
        AngularFireModule.initializeApp(firebaseConfig),
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
        {provide: APP_BASE_HREF, useValue : '/trips'},
        AngularFireAuth,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditListComponent);
    component = fixture.componentInstance;
    auditService = TestBed.get(TripService);
    authService = TestBed.get(AuthService);
    const auditor = new Actor();
    auditor.name = 'Sabela';
    auditor.surname = 'Ramil';
    auditor.email = 'sabela@ravera.com';
    auditor.password = 'SabelaOT2018';
    auditor.role = 'AUDITOR';
    auditor.id = '5e938c9e9f78e625809e7051';
    auditor.version = 0;
    authService.currentActor = auditor;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
