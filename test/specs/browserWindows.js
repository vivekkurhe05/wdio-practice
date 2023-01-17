describe('Handling Windows', () => {

    beforeEach(async () => {
        await browser.url('https://demoqa.com/browser-windows');
    })
    it('should open a new tab after clicking a New tab button', async () => {
        await $('#tabButton').click();
        await browser.switchWindow(/sample/g);
        await expect($('#sampleHeading')).toHaveText('This is a sample page');
        await browser.closeWindow();
        await browser.switchWindow(/browser-windows/g);
        await browser.pause(5000);

    });

    it('should open a new window by clicking on a New Window button', async () => {
        await $('#windowButton').click();
        await browser.switchWindow('sample');
        await expect($('#sampleHeading')).toHaveText('This is a sample page');
        await browser.closeWindow();
        await browser.switchWindow(/browser-windows/g);
        console.log(await browser.getWindowSize());
        await browser.pause(5000);
    })

    it.only('should open a new window', async () => {
        /**
         * this can be used to switch to a new tab and a new window
         */
        await $('#windowButton').click();
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect($('#sampleHeading')).toHaveText('This is a sample page');
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await expect($('.main-header')).toHaveText('Browser Windows');
        await browser.pause(3000);
    })
});