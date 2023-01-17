const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');

describe('My Login application', () => {

    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('testautomation@mail.com', 'Testautomation@123');
        const titleEle = await HomePage.homePageTitle;
        await expect(titleEle).toHaveTextContaining("Welcome");
    });
});


