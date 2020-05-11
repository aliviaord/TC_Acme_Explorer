import { EditTripPage } from './edit-trip.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: EditTripPage;

  beforeEach(() => {
    page = new EditTripPage();
  });

  it('should login', () => {
    page.navigateToLogin();
    var emailInput = element(by.id('email'));
    var passwordInput = element(by.id('pwd'));
    var loginBtn = element(by.id('loginBtn'));

    expect(emailInput.isPresent).toBeTruthy();
    expect(passwordInput.isPresent).toBeTruthy();
    expect(loginBtn.isPresent).toBeTruthy();

    emailInput.sendKeys('sam@estara.com')
    passwordInput.sendKeys('SamanthaOT2020')
    loginBtn.click();
  });

  it('should go to edit page', () => {
    page.navigateToEdit();
    browser.driver.sleep(3000);

    var titleInput = element(by.id('title'));
    expect(titleInput.getText()).toEqual('Trip to Myst Falls');
  });

  it('should edit title', () => {
    var titleInput = element(by.id('title'));

    titleInput.sendKeys('Trip to the best island');
})
});
