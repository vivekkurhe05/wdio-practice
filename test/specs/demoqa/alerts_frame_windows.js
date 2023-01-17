describe('Alerts, Frame and Windows', () => {
    
    before(async() => {
        await browser.url('https://demoqa.com');

        // click on Elements card
        let ele = await $('div.category-cards').$('div.card:nth-child(3)');
        await ele.scrollIntoView();
        await ele.click();

        // Never put an assertion inside annotations as they don't work.
    });

    it('Browser Windows', async () => {
        const bwindow = await $('div.element-list.show').$('ul.menu-list').$$('li')[0];
        await bwindow.click();

        const tabBtn = await $('#tabButton');
        await tabBtn.waitForDisplayed();
        await tabBtn.click();

        let handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        let heading = await $('#sampleHeading');

        await expect(heading).toHaveText('This is a sample page');

        await browser.closeWindow();

        await browser.switchToWindow(handles[0]);
        const img = await $('a[href*="demoqa.com"] > img');
        await img.scrollIntoView();
        await expect(img).toHaveAttributeContaining('src', 'Toolsqa.jpg');
    });

    it('Alerts', async () => {
        const alert = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await alert.scrollIntoView();
        await alert.click();

        const alertBtn = await $('#alertButton');
        await alertBtn.click();

        await browser.waitUntil(async() => {
            return await browser.getAlertText() === 'You clicked a button';
        });

        await browser.acceptAlert();
    });

    it('Timer alert', async () => {
        const alert = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await alert.scrollIntoView();
        await alert.click();

        const timerAlert = await $('#timerAlertButton');
        await timerAlert.waitForDisplayed();
        await timerAlert.click();

        await browser.waitUntil( async () => {
            console.log(await browser.getAlertText());
            return (await browser.getAlertText()) === 'This alert appeared after 5 seconds';
        });

        await browser.acceptAlert();

        const isOpen = await browser.isAlertOpen();
        await expect(isOpen).toBeFalsy();
    });

    it('confirm alert', async () => {
        const alert = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await alert.scrollIntoView();
        await alert.click();

        const confirmBtn = await $('#confirmButton');
        await confirmBtn.waitForDisplayed();
        await confirmBtn.click();

        await browser.acceptAlert();

        const res = await $('#confirmResult');
        await expect(res).toHaveText('you selected ok', {ignoreCase: true});
    });

    it('dismiss alert', async () => {
        const alert = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await alert.scrollIntoView();
        await alert.click();

        const confirmBtn = await $('#confirmButton');
        await confirmBtn.waitForDisplayed();
        await confirmBtn.click();

        await browser.dismissAlert();

        const res = await $('#confirmResult');
        await expect(res).toHaveText('you selected cancel', {ignoreCase: true});
    });

    it('Send alert text', async () => {
        const alert = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await alert.scrollIntoView();
        await alert.click();

        const promptBtn = await $('#promtButton');
        await promptBtn.waitForDisplayed();
        await promptBtn.click();

        const isPromptOpen = await browser.isAlertOpen();

        if(isPromptOpen) {
            await browser.sendAlertText("Vivek");
            await browser.acceptAlert();
        }

        const res = await $('#promptResult');
        await expect(res).toHaveText('you entered vivek', {ignoreCase: true});
    });

    it('Frames', async () => {
        const frames = await $('div.element-list.show').$('ul.menu-list').$$('li')[2];
        await frames.scrollIntoView();
        await frames.click();

        const parentFrame = await $('div#framesWrapper').$('div:nth-child(1)');
        console.log(await parentFrame.getText());
        expect(parentFrame).toHaveTextContaining('sample iframe page', { ignoreCase: true });

        const iframe1 = await $('#frame1');
        await browser.switchToFrame(iframe1);

        const frame1Heading = await $('#sampleHeading');
        console.log(await frame1Heading.getText());
        await expect(frame1Heading).toHaveText('This is a sample page',{ignoreCase:true});

        await browser.switchToParentFrame();

        const iframe2 = await $('#frame2')
        await browser.switchToFrame(iframe2);

        const frame2Heading = await $('#sampleHeading');
        console.log(await frame2Heading.getText());
        await expect(frame2Heading).toHaveText('This is a sample page', {ignoreCase:true});

        await browser.switchToParentFrame();
        console.log(await parentFrame.getText());
        await expect(parentFrame).toHaveTextContaining('sample iframe page', { ignoreCase: true });   
    });

    it('Nested frames', async () => {
        const nestedFrames = await $('div.element-list.show').$('ul.menu-list').$$('li')[3];
        await nestedFrames.scrollIntoView();
        await nestedFrames.click();

        const parentFrame = await $('#framesWrapper').$('div:nth-child(1)');
        await expect(parentFrame).toHaveTextContaining('sample nested iframe page', {ignoreCase: true});

        const iframe1 = await $('#frame1');
        await browser.switchToFrame(iframe1);

        const parentText = await $("//body[contains(text(),'Parent frame')]").getText();
        await expect(parentText).toEqual('Parent frame');

        const nestIframe = await $("//body[contains(text(),'Parent frame')]/iframe");
        await browser.switchToFrame(nestIframe);

        const childText = await $("//body/p[contains(text(),'Child Iframe')]").getText();
        await expect(childText).toEqual('Child Iframe');

        await browser.switchToParentFrame();
        await browser.switchToParentFrame();

        await expect(parentFrame).toHaveTextContaining('sample nested iframe page', {ignoreCase: true});
    });

    it.only('Modal Dialogs', async () => {
        const modal = await $('div.element-list.show').$('ul.menu-list').$$('li')[4];
        await modal.scrollIntoView();
        await modal.click();

        const smallModal = await $('#showSmallModal');
        await smallModal.scrollIntoView();
        await smallModal.click();

        const body = await $('div.modal-body');
        await body.waitForDisplayed({timeout: 5000});
        await expect(body).toHaveText('This is a small modal. It has very less content');

        await $('#closeSmallModal').click();

        const largeModal = await $('#showLargeModal');
        await largeModal.click();

        const paragraph = await $('div.modal-body > p');
        await expect(paragraph).toHaveTextContaining(/^Lorem Ipsum/);
    });
});