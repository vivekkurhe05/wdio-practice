describe('Forms', () => {
    before(async () => {
        await browser.url('https://demoqa.com');

        // click on Elements card
        let ele = await $('div.category-cards').$('div.card:nth-child(2)');
        await ele.scrollIntoView();
        await ele.click();

        // Never put an assertion inside annotations as they don't work.
    });

    it('Fill up the form', async () => {
        const checkBox = await $('div.element-list.show').$('ul.menu-list').$('li');
        await checkBox.click();

        const firstName = await $('#firstName');
        await firstName.setValue('Vivek');

        const lastName = await $('#lastName');
        await lastName.setValue('Kurhe');

        const email = await $('#userEmail');
        await email.setValue('vivek@mail.com');

        const gender = await $("#genterWrapper > div > div:nth-child(1) > label");
        await gender.click();

        const number = await $('#userNumber');
        await number.setValue('8983897126');

        const subjects = await $('#subjectsInput');
        await subjects.scrollIntoView();
        await subjects.setValue('History, Geography, English');

        let hobbies = await $$("#hobbiesWrapper > div > div > input ~ label");
        await hobbies[0].scrollIntoView();
        hobbies.forEach(hobby => {
            hobby.click();
        });

        const filePath = '/Users/launchventures/Desktop/folder/wdio-practice/profile-pic.jpg';
        let remoteFilePath = await browser.uploadFile(filePath);
        await $('#uploadPicture').setValue(remoteFilePath);

        await $('#currentAddress').setValue('abcd street 123 rd.');

        const state = await $('#state > div > div > div.css-1wa3eu0-placeholder');
        await state.scrollIntoView();
        await state.click();
        await state.setValue('Rajasthan');
        await browser.keys('\uE007');

        const city = await $('#city > div > div > div.css-1wa3eu0-placeholder');
        await city.scrollIntoView();
        await city.click();
        await city.setValue('Jaipur');
        await browser.keys('\uE007');

        await browser.pause(3000);
    });
});