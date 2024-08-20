const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

describe('Frontend Tests with Selenium and Chrome', function () {
    this.timeout(30000); 
    let driver;
    // const baseUrl = "http://localhost:3000"; 

    before(async function () {

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should open homepage and check the title is "Home"', async function () {
        await driver.get('http://localhost:3000');
        const title = await driver.getTitle();
        if (title !== "Home") {
            throw new Error(`Expected title to be "Home", but got "${title}"`);
        }
    });

    it('should open contact page and check the title is "Contact Us"', async function () {
        await driver.get('http://localhost:3000/contact');
        const title = await driver.getTitle();
        if (title !== "Contact Us") {
            throw new Error(`Expected title to be "Contact Us", but got "${title}"`);
        }
    });

    it('should sign up for more info via email and check the message', async function () {
        await driver.get('http://localhost:3000/contact');

        const inputElement = await driver.findElement(By.id('formInput'));
        const submitButton = await driver.findElement(By.id('formSubmit'));

        const email = "test@example.com";
        await inputElement.sendKeys(email);
        await submitButton.click();

        await driver.wait(until.elementLocated(By.id('formMessage')), 5000);
        const messageElement = await driver.findElement(By.id('formMessage'));
        const messageText = await messageElement.getText();
        const expectedMessage = `More info coming to ${email}`;
        if (messageText !== expectedMessage) {
            throw new Error(`Expected message to be "${expectedMessage}", but got "${messageText}"`);
        }
    });
});


