import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { HeaderComponent } from './components/master/header/header.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import { RegisterComponent } from './components/security/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: "AIzaSyBeyK3jw-oLh1MyZMHrydSJwy0WTxWDZ-0",
  authDomain: "acme-explorer-84e09.firebaseapp.com",
  databaseURL: "https://acme-explorer-84e09.firebaseio.com",
  projectId: "acme-explorer-84e09",
  storageBucket: "acme-explorer-84e09.appspot.com",
  messagingSenderId: "28765984031",
  appId: "1:28765984031:web:1c91ac9bcbd27999e2cc2a",
  measurementId: "G-HPY17ELML2"
};
@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDisplayComponent,
    HeaderComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
