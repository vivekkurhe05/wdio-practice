// import { Key } from 'webdriverio'

describe('KOKO', () => {

    before( async () => {

        await browser.url('https://www.google.com/');
    })

    it('Search for a KOKO linkedin profile', async () => {

        await $('input[name="q"]').setValue('KOKO Networks');
    
        // await browser.keys('\uE007');
        await $('input[name="q"]').addValue('Enter');

        await $('.yuRUbf > a[href="https://in.linkedin.com/company/koko-networks"] > h3').click();
        const title = await $('h1.top-card-layout__title');

        await title.waitForDisplayed({timeout : 5000});

        await expect(browser).toHaveTitleContaining('KOKO Networks | LinkedIn');
        await expect(title).toHaveText('KOKO Networks');
    });
});