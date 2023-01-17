describe('dbclick', () => {
    before(async () => {
        await browser.url('http://127.0.0.1:5500/test/html/doubleClick.html')
    });
    it('should demonstrate the doubleClick command', async () => {
        const myButton = await $('#myButton')
        await myButton.doubleClick()

        const value = await myButton.getText()
        expect(value).toHaveText('I was dblclicked');
        // expect(value === 'I was dblclicked').toBe(true) // true
    })
})