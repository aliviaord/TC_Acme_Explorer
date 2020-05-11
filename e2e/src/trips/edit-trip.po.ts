import { browser, by, element } from 'protractor';

export class EditTripPage {

  navigateToLogin() {
    return browser.get('/login');
    
  }
  navigateToEdit() {
    return browser.get('/trips/5e78ac3cf6f9577fd149c9ba/edit');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
