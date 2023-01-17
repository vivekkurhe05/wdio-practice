describe('Alerts', () => {
    
    beforeEach(async () => {
        await browser.url('https://demoqa.com/alerts');
    });

    it('Accept alert', async () => {
        await $('#alertButton').click();
        await browser.pause(1000);
        await browser.acceptAlert();
        await browser.pause(3000);
    });

    it('Verify Alert text', async () => {
        await $('#alertButton').click();
        const alerttext = await browser.getAlertText();
        await expect(alerttext).toBeDisplayed();
    });

    it.only('should wait for alert to be displayed', async () => {
        await $('#timerAlertButton').click();
        await browser.waitUntil(async () => (await browser.getAlertText()) === "This alert appeared after 5 seconds", {timeout : 60000, timeoutMsg: "Alert to be present after 5 secs"});
        // or
        // await browser.waitUntil(async function() {
        //     return (await this.getAlertText()) === "This alert appeared after 6 seconds";
        // }, {timeout: 10000});
        
        await browser.acceptAlert();
    });

    it('accept alert', async () => {
        await $('#confirmButton').click();
        await browser.acceptAlert();
        const res = await $('#confirmResult');
        await expect(res).toHaveText('You selected Ok');
    });

    it('dismiss alert', async () => {
        await $('#confirmButton').click();
        await browser.dismissAlert();
        const res = await $('#confirmResult');
        await expect(res).toHaveText('You selected Cancel');
    });

    it('send alert text', async () => {
        await $('#promtButton').click();
        await browser.sendAlertText('Vivek');
        await browser.acceptAlert();
        const res = await $('#promptResult');
        await expect(res).toHaveText('You entered Vivek');
        await browser.pause(2000);
    });

});