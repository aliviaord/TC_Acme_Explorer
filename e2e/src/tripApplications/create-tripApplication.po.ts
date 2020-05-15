import { browser, by, element } from 'protractor';

export class CreateTripApplicationPage {

  navigateToLogin() {
    return browser.get('/login');
  }

  navigateToTrip() {
    return browser.get('/trips/5e78ac3cf6f9577fd149c9ba/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
