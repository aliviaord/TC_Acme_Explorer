import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppRoutingModule } from '../../../app-routing.module';
import { MainComponent } from '../../master/main/main.component';
import { TripDisplayComponent } from '../../trip/trip-display/trip-display.component';
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { LoginComponent } from '../login/login.component';

import { RegisterComponent } from './register.component';
import { EditTripComponent } from '../../trip/edit-trip/edit-trip.component';
import { CreateTripComponent } from '../../trip/create-trip/create-trip.component';
import { DisplayAuditComponent } from '../../audit/display-audit/display-audit.component';
import { AuditListComponent } from '../../audit/audit-list/audit-list.component';
import { CreateAuditComponent } from '../../audit/create-audit/create-audit.component';
import { TripApplicationListComponent } from '../../tripApplication/trip-application-list/trip-application-list.component';
import { SponsorshipListComponent } from '../../sponsorship/sponsorship-list/sponsorship-list.component';
import { DashboardDisplayComponent } from '../../dashboard/dashboard-display/dashboard-display.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../denied-access-page/denied-access-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DataTablesModule } from 'angular-datatables';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        AngularFireModule.initializeApp(firebaseConfig),
        AppRoutingModule,
        SlickCarouselModule,
        DataTablesModule,
        Ng5SliderModule,
        NgxDaterangepickerMd,
        Ng2FlatpickrModule,
        InfiniteScrollModule
      ],
      declarations: [
        MainComponent,
        TripDisplayComponent,
        TripListComponent,
        LoginComponent,
        RegisterComponent,
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
      providers: [
        {provide: APP_BASE_HREF, useValue : '/register'},
        AngularFireAuth
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
