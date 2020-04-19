import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

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

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      declarations: [ HeaderComponent ],
      providers: [
        AngularFireAuth
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
