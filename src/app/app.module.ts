import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { HeaderComponent } from './components/master/header/header.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { LocalizedDataPipe } from './components/shared/localized-data.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/master/main/main.component';
import { MessageComponent } from './components/master/message/message.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { HttpModule } from '@angular/http';
import { DeniedAccessPageComponent } from './components/security/denied-access-page/denied-access-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CreateTripComponent } from './components/trip/create-trip/create-trip.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { EditTripComponent } from './components/trip/edit-trip/edit-trip.component';
import { DisplayAuditComponent } from './components/audit/display-audit/display-audit.component';
import { AuditListComponent } from './components/audit/audit-list/audit-list.component';
import { CreateAuditComponent } from './components/audit/create-audit/create-audit.component';

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

registerLocaleData(locales, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDisplayComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    TranslatableComponent,
    FooterComponent,
    LocalizedDataPipe,
    MainComponent,
    MessageComponent,
    NotFoundPageComponent,
    TermsAndConditionsComponent,
    DeniedAccessPageComponent,
    CreateTripComponent,
    EditTripComponent,
    DisplayAuditComponent,
    AuditListComponent,
    CreateAuditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    HttpModule,
    SlickCarouselModule,
    Ng2FlatpickrModule
  ],
  exports: [AppRoutingModule],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
