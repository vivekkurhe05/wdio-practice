describe('Handling Dropdown', () => {
    
    beforeEach(async () => {
        await browser.url('https://www.facebook.com/');
    })
    
    it('Select dropdown value by text', async () => {
        await $('._42ft._4jy0._6lti._4jy6._4jy2.selected._51sy').click();

        const day = await $('#day');
        // await day.click();
        await day.selectByVisibleText('5');

        const month = await $('#month');
        // await month.click();
        await month.selectByVisibleText('Dec');

        const year = await $('#year');
        // await year.click();
        await year.selectByVisibleText('1993');

        await browser.pause(3000);
    });

    it('Select dropdown value by index', async () => {
        await $('._42ft._4jy0._6lti._4jy6._4jy2.selected._51sy').click();

        const day = await $('#day');
        await day.selectByIndex(1); // 2

        const month = await $('#month');
        await month.selectByIndex(1); // feb

        const year = await $('#year');
        await year.selectByIndex(1); // 2021;
        
        await browser.pause(3000);
    });

    it.only('Select dropdown value by attribute', async () => {
        await $('._42ft._4jy0._6lti._4jy6._4jy2.selected._51sy').click();

        let day = await $('#day');
        await day.selectByAttribute('value', '5');

        let month = await $('#month');
        await month.selectByAttribute('value', '11');

        let year = await $('#year');
        await year.selectByAttribute('value', '1993');

        await browser.pause(5000);
    });

    it("get all values from month dropdown", async () => {
        let arr = [];
        await $('._42ft._4jy0._6lti._4jy6._4jy2.selected._51sy').click();

        const month = await $('#month');
        await month.click();

        const months = await $$('#month > option');
        console.log("Is array",Array.isArray(months));
        console.log("Is object",toString.call(months) === '[object Object]')
        console.log("Length is",await months.length);
        // await months.forEach(async (month) => {
        //     arr.push(await month.getText());
        // });
        let len = await months.length;
        for(let i=0;i<len; i++) {
            let text = await months[i].getText()
            arr.push(text);
        }
        console.log(arr);
        // await browser.pause(3000);
    });
});