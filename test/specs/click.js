describe('dbclick', () => {
    before(async () => {
        await browser.url('http://127.0.0.1:5500/test/html/click.html')
    });

    it('should demonstrate the click command', async () => {
        const myButton = await $('#myButton')
        await myButton.click()

        const value = await myButton.getText()
        expect(value).toHaveText('I was clicked');
    })

    it('should demonstrate the input value', async () => {
        let val = await browser.execute(function() {
            let inp = document.querySelector('input');
            return inp.value;
        });
        console.log(val);
    })

    it.only('should demonstrate the input value using getText()', async () => {
        let input = await $('input');
        let val = await input.getText();
        console.log("==========")
        console.log(typeof val)
        console.log(val);
        console.log("==========")
    })
})