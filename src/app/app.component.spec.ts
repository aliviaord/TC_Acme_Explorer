import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DataTablesModule } from 'angular-datatables';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/master/footer/footer.component';
import { HeaderComponent } from './components/master/header/header.component';
import { MainComponent } from './components/master/main/main.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { EditTripComponent } from './components/trip/edit-trip/edit-trip.component';
import { CreateTripComponent } from './components/trip/create-trip/create-trip.component';
import { DisplayAuditComponent } from './components/audit/display-audit/display-audit.component';
import { AuditListComponent } from './components/audit/audit-list/audit-list.component';
import { CreateAuditComponent } from './components/audit/create-audit/create-audit.component';
import { TripApplicationListComponent } from './components/tripApplication/trip-application-list/trip-application-list.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from './components/security/denied-access-page/denied-access-page.component';
import { MessageComponent } from './components/master/message/message.component';


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

describe('AppComponent', () => {
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
        InfiniteScrollModule
      ],
      declarations: [
        FooterComponent,
        HeaderComponent,
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
        TripApplicationListComponent,
        SponsorshipListComponent,
        DashboardDisplayComponent,
        NotFoundPageComponent,
        TermsAndConditionsComponent,
        DeniedAccessPageComponent,
        MessageComponent,
        AppComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/'},
        AngularFireAuth
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'acme-explorer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('acme-explorer');
  });
});
