import { CreateTripApplicationPage } from './create-tripApplication.po';
import { browser, by, element } from 'protractor';

describe('Apply for a trip', () => {
  let page: CreateTripApplicationPage;

  beforeEach(() => {
    page = new CreateTripApplicationPage();
  });

  it('should login', () => {
    page.navigateToLogin();
    const emailInput = element(by.id('email'));
    const passwordInput = element(by.id('pwd'));
    const loginBtn = element(by.id('loginBtn'));

    expect(emailInput.isPresent).toBeTruthy();
    expect(passwordInput.isPresent).toBeTruthy();
    expect(loginBtn.isPresent).toBeTruthy();

    emailInput.sendKeys('aitana@war.com');
    passwordInput.sendKeys('AitanaOT2017');
    loginBtn.click();
    browser.driver.sleep(2000);
  });

  it('should go to display trip page', () => {
    const tripsListBtn = element(by.id('tripsList'));
    tripsListBtn.click();

    const tripUrl = element(by.linkText('Trip to Myst Falls'));
    tripUrl.click();
  });

  it('should apply for the trip with some comments and logout', () => {
    const applyBtn = element(by.id('applyButton'));
    applyBtn.click();

    const commentsInput = element(by.id('applicationComments'));
    commentsInput.clear();
    commentsInput.sendKeys('Girls just wanna have fun.');

    const acceptBtn = element(by.id('createApplication'));
    acceptBtn.click();

    const closeModal = element(by.id('closeModal'));
    closeModal.click();

    const logoutBtn = element(by.id('logoutBtn'));
    logoutBtn.click();
    browser.driver.sleep(2000);
  });
});
