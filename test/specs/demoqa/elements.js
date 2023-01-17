// const fetch = require('node-fetch');

describe('Elements', () => {
    
    before( async () => {
        await browser.url('https://demoqa.com');

        // click on Elements card
        let ele = await $('div.category-cards').$('div.card:nth-child(1)');
        await ele.scrollIntoView();
        await ele.click();

        // Never put an assertion inside annotations as they don't work.
    });

    it('Text Box', async () => {
        const textBox = await $('div.element-list.show').$('ul.menu-list').$$('li')[0];
        await textBox.click();

        let title = await $('div.main-header');
        expect(title).toHaveText('Text Box');

        await $('#userName').setValue('Test demo');
        await $('#userEmail').setValue('testdemo@mail.com');
        await $('#currentAddress').setValue('ABC street');
        await $('#permanentAddress').setValue('XYZ street');
        await $('#submit').scrollIntoView();
        await $('#submit').click();

        await $('#output').waitForDisplayed({ timeout: 3000 });

        // or

        // await $('#output').waitUntil(async function() {
        //     return await this.isDisplayed();
        // });

        // or

        // await browser.waitUntil(async() => await $('#output').isDisplayed());

        const info = await $('#output').$('div').$$('p');
        info.forEach(async (el) => {
            let len = await el.getText().length;
            expect(len).toBeGreaterThan(0);
        });

    });

    it('Check Box', async () => {
        const checkBox = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await checkBox.click();

        let title = await $('div.main-header');
        expect(title).toHaveText('Check Box');

        await $('label[for=tree-node-home]').click();

        const res = $('#result');
        await res.waitForDisplayed({ timeout: 3000 });

        // or

        // await res.waitUntil(async function() {
        //     return await this.isDisplayed();
        // });

        // or

        // await browser.waitUntil(async () => await res.isDisplayed());

        expect(res).toBeDisplayed();

    });

    it('Radio Button', async () => {
        const radioBtn = await $('div.element-list.show').$('ul.menu-list').$$('li')[2];
        await radioBtn.click();

        await $('#yesRadio ~ label').click();

        const success = await $('p').$('span.text-success');

        await success.waitUntil(async function(){
            return (await this.getText()) === "Yes";
        });
        expect(success).toHaveText('Yes');
    });

    it('Web Tables deleted record', async () => {
        const webTable = await $('div.element-list.show').$('ul.menu-list').$$('li')[3];
        await webTable.scrollIntoView();
        await webTable.click();

        // delete first row
        await $('div.action-buttons').$('#delete-record-1').click();
        
        let name = await $('div.rt-tbody').$('div:nth-child(1)').$('div').$('div:first-child').getText();

        expect(name).not.toEqual('Cierra');
    });

    it('Web Tables updated record', async () => {
        const webTable = await $('div.element-list.show').$('ul.menu-list').$$('li')[3];
        await webTable.scrollIntoView();
        await webTable.click();

        // update first row
        await $('div.action-buttons').$('#edit-record-1').click();

        // open registration form modal
        await $('#registration-form-modal').waitForDisplayed({ timeout: 5000 });

        // update first name
        await $('#firstName').addValue('123');

        // submit changes
        await $('#submit').click();
        
        let name = await $('div.rt-tbody').$('div:nth-child(1)').$('div').$('div:first-child').getText();

        // assert the change
        expect(name).toEqual('Cierra123');
    });

    it('Buttons', async () => {
        const webTable = await $('div.element-list.show').$('ul.menu-list').$$('li')[4];
        await webTable.scrollIntoView();
        await webTable.click();

        await $('#doubleClickBtn').doubleClick();

        expect('#doubleClickMessage').toHaveText('You have done a double click');

        await $('#rightClickBtn').click({ button: 'right' });

        expect(('#rightClickMessage')).toHaveText('You have done a right click');
    });

    describe('Links page', () => {

        before(async () => {
            const links = await $('div.element-list.show').$('ul.menu-list').$$('li')[5];
            await links.scrollIntoView();
            await links.click();
        });

        afterEach(async() => {
            await browser.setupInterceptor();
        });

        it('Links 1 - Handling multiple windows', async () => {

            await $('#linkWrapper').$('p').$('a#simpleLink').click();

            let handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[1]);

            let banner = await $('div.home-banner');
            await expect(banner).toBeDisplayed();

            await browser.closeWindow();

            await browser.switchToWindow(handles[0]);

            let title = await $('div.main-header').getText();
            await expect(title).toEqual('Links');

        });

        it('Links 2 - created', async () => {

            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/created', 201);

            let interLink = await $('#linkWrapper > p > a#created');
            await interLink.scrollIntoView();
            await interLink.click();

            // await browser.pause(1000);

            let resp = await browser.waitUntil( async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            console.log(resp);
            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('created');
            expect(resp.response.statusCode).toEqual(201);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 201 and status text Created');

        });

        it('Links 3 - no content', async () => {

            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/no-content', '204');

            let interLink = await $('#no-content');
            await interLink.scrollIntoView();
            await interLink.click();

            // await browser.pause(1000);

            let resp = await browser.waitUntil( async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('no-content');
            expect(resp.response.statusCode).toEqual(204);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 204 and status text No Content');

        });

        it('Links 4 - moved', async () => {

            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/moved', 301);

            let interLink = await $('#moved');
            await interLink.scrollIntoView();
            await interLink.click();

            let resp = await browser.waitUntil( async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('moved');
            expect(resp.response.statusCode).toEqual(301);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 301 and status text Moved Permanently');
        });

        it('Links 5 - bad request', async () => {
            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/bad-request', 400);

            let interLink = await $('#bad-request');
            await interLink.scrollIntoView();
            await interLink.click();

            let resp = await browser.waitUntil(async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('bad-request');
            expect(resp.response.statusCode).toEqual(400);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 400 and status text Bad Request');
        });

        it('Links 6 - unauthorized', async () => {
            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/unauthorized', 401);

            let interLink = await $('#unauthorized');
            await interLink.scrollIntoView();
            await interLink.click();

            let resp = await browser.waitUntil(async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('unauthorized');
            expect(resp.response.statusCode).toEqual(401);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 401 and status text Unauthorized');
        });

        it('Links 7 - forbidden', async () => {
            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/forbidden', 401);

            let interLink = await $('#forbidden');
            await interLink.scrollIntoView();
            await interLink.click();

            let resp = await browser.waitUntil(async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('forbidden');
            expect(resp.response.statusCode).toEqual(403);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 403 and status text Forbidden');
        });

        it('Links 8 - not found', async () => {
            await browser.setupInterceptor();

            await browser.expectRequest('GET', '/invalid-url', 404);

            let interLink = await $('#invalid-url');
            await interLink.scrollIntoView();
            await interLink.click();

            let resp = await browser.waitUntil(async () => {
                let req = await browser.getRequest(0);
                return req;
            });

            expect(resp.method).toEqual('GET');
            expect(resp.url).toEqual('invalid-url');
            expect(resp.response.statusCode).toEqual(404);

            let res = await $('#linkResponse').getText();
            expect(res).toEqual('Link has responded with staus 404 and status text Not Found');
        });
    });

    it('Broken Links - Images', async () => {
        const links = await $('div.element-list.show').$('ul.menu-list').$$('li')[6];
        await links.scrollIntoView();
        await links.click();

        let arr = await $$('div > p ~ a');
        const urls = await arr.map(link => link.getAttribute('href'));
        const requests = await urls.map(url => fetch(url));
        const responses = await Promise.all(requests);
        const statusCodes = responses.map(response => response.status);

        statusCodes.forEach(statusCode => {
            expect(statusCode).toBeLessThan(400);
        })
    });

    it('Upload and Download', async () => {
        const links = await $('div.element-list.show').$('ul.menu-list').$$('li')[7];
        await links.scrollIntoView();
        await links.click();

        const filePath = '/Users/launchventures/Desktop/folder/wdio-practice/sample.txt';
        let remoteFilePath = await browser.uploadFile(filePath);
        await $('#uploadFile').setValue(remoteFilePath);

        await expect($('#uploadedFilePath')).toHaveTextContaining('sample.txt');
    });

    it.only('Dynamic Properties', async () => {
        const links = await $('div.element-list.show').$('ul.menu-list').$$('li')[8];
        await links.scrollIntoView();
        await links.click();

        let isEnable = await $('#enableAfter');
        await isEnable.waitForEnabled({ timeout: 10000 });

        let bool = await isEnable.isEnabled();

        expect(bool).toBeTruthy();

        let colorBtn = await $('#colorChange');
        let color = await colorBtn.getCSSProperty('color');
        expect(color.parsed.hex).toEqual('#df4957');
        
        let btn = await $('#visibleAfter')
        await btn.waitForDisplayed({timeout : 10000 });
        expect(btn).toBeDisplayed();
    });

});