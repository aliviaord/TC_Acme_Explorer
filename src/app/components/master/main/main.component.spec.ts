import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../security/denied-access-page/denied-access-page.component';
import { SponsorshipListComponent } from '../../sponsorship/sponsorship-list/sponsorship-list.component';
import { TripApplicationListComponent } from '../../tripApplication/trip-application-list/trip-application-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DataTablesModule } from 'angular-datatables';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { APP_BASE_HREF } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        Ng2FlatpickrModule,
        InfiniteScrollModule
      ],
      declarations: [
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
        TripApplicationListComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
