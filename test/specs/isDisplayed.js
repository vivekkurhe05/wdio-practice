describe('Name of the group', () => {
    
    before(async () => {
        await browser.url('http://127.0.0.1:5500/test/html/isDisplayed.html');
    });

    it('should detect if an element is displayed', async () => {
        let elem = await $('#notDisplayed > button');
        let isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notVisible > button');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notExisting > button');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        elem = await $('#notInViewport > button');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: true

        elem = await $('#zeroOpacity > button');
        isDisplayed = await elem.isDisplayed();
        console.log(isDisplayed); // outputs: false

        await browser.pause(3000);
    });

});