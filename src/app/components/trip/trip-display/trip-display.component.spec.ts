import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from '../../../app-routing.module';
import { MainComponent } from '../../master/main/main.component';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { TripListComponent } from '../trip-list/trip-list.component';

import { TripDisplayComponent } from './trip-display.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('TripDisplayComponent', () => {
  // let component: TripDisplayComponent;
  // let fixture: ComponentFixture<TripDisplayComponent>;

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
        AppRoutingModule,
      ],
      declarations: [
        MainComponent,
        LoginComponent,
        RegisterComponent,
        TripListComponent,
        TripDisplayComponent,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    /*fixture = TestBed.createComponent(TripDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
