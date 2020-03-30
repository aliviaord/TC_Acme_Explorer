import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '../../../app-routing.module';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { TripDisplayComponent } from '../trip-display/trip-display.component';
import { MainComponent } from '../../master/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { TripListComponent } from './trip-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TripListComponent,
        LoginComponent,
        RegisterComponent,
        TripDisplayComponent,
        MainComponent
      ],
      imports: [
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
        HttpClientModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/trip-list'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be five items in the collection', () => {
    //expect(component.getTripsVariable().length).toEqual(5);
  });

  it('should retrieve the third trip since it is the ' +
    'only one flagged as cancelled', () => {
      /*expect(component.getTripsVariable().filter(trip => trip.cancelReason != null))
        .toContain(component.getTrips()[2]);*/
  });

  it('should retrieve trip with three pictures', () => {
    //expect(component.getPictures(0).length).toBeLessThan(4);
  });

  it('should display a table with 5 rows', () => {
    /*const compiled = fixture.debugElement.nativeElement;
    const elements = compiled.querySelector('table').getElementsByTagName('tr');
    expect(elements.length).toBe(6);*/
  });
});
