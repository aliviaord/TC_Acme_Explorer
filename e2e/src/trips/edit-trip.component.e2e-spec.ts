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
    browser.driver.sleep(2000);
  });

  it('should go to edit page', () => {
    var myTripsBtn = element(by.id('myTrips'));
    myTripsBtn.click();

    var tripUrl = element(by.linkText('Trip to Myst Falls'))
    tripUrl.click();

    var editBtn = element(by.id('editBtn'));
    editBtn.click();

    var titleInput = element(by.id('title'));
    expect(titleInput.getAttribute('value')).toEqual('Trip to Myst Falls');
  });

  it('should edit title and submit', () => {
    var titleInput = element(by.id('title'));
    var editBtn = element(by.id('editBtn'));

    titleInput.clear();
    titleInput.sendKeys('Trip to the best island');
    editBtn.click();
    browser.driver.sleep(2000);
  })

  it('should revert change', () => {
    page.navigateToEdit();
    var titleInput = element(by.id('title'));
    var editBtn = element(by.id('editBtn'));

    titleInput.clear();
    titleInput.sendKeys('Trip to Myst Falls');
    editBtn.click();
    browser.driver.sleep(2000);
  })
});
