describe('Widgets', () => {
    
    before(async() => {
        await browser.url('https://demoqa.com');

        // click on Elements card
        let ele = await $('div.category-cards').$('div.card:nth-child(4)');
        await ele.scrollIntoView();
        await ele.click();

        // Never put an assertion inside annotations as they don't work.
    });

    it('Auto Complete', async() => {
        const autocomplete = await $('div.element-list.show').$('ul.menu-list').$$('li')[1];
        await autocomplete.click();

        const multiColor = await $('#autoCompleteMultipleContainer input');
        await multiColor.setValue('red');
        await multiColor.addValue('Enter');

        await multiColor.setValue('green');
        await multiColor.addValue('Enter');

        await multiColor.setValue('blue');
        await multiColor.addValue('Enter');

        await multiColor.setValue('yellow');
        await multiColor.addValue('Enter');

        const singleColor = await $('#autoCompleteSingleContainer input');
        await singleColor.setValue('red');
        await singleColor.addValue('Enter');

        const clearMulticolorField = await $('div.auto-complete__clear-indicator');
        await clearMulticolorField.click();

        await browser.pause(3000);
    });

    it('Slider', async () => {
        const autocomplete = await $('div.element-list.show').$('ul.menu-list').$$('li')[3];
        await autocomplete.scrollIntoView();
        await autocomplete.click();

        const slider = await $('#sliderContainer span input');
        // await slider.waitForDisplayed();
        // await slider.setValue('100');

        await browser.execute(() => {
            const inputSlider = document.querySelector('#sliderContainer span input');
            inputSlider.setAttribute('value', '100');
        })

        const val = await slider.getAttribute('value');
        console.log(val);

        await browser.pause(3000);
    });

    it.only('Menu', async () => {
        const autocomplete = await $('div.element-list.show').$('ul.menu-list').$$('li')[7];
        await autocomplete.scrollIntoView();
        await autocomplete.click();

        let x = await $('#nav > li:nth-child(2)').getLocation('x');
        let y = await $('#nav > li:nth-child(2)').getLocation('y');
        await $('#nav > li:nth-child(2)').moveTo(x, y);
        await $('#nav > li:nth-child(2) > ul > li:nth-last-child(1)').moveTo();
        await $('#nav > li:nth-child(2) > ul > li:nth-last-child(1) > ul > li:first-child').moveTo();

        await browser.pause(3000);
    });
});