describe('Key Events', () => {
    before(async () => {
        await browser.url('https://the-internet.herokuapp.com/key_presses?');
    });

    it('Command', async () => {
        await $('#target').addValue('Command');

        const result = await $('#result');
        await result.waitForDisplayed({ timeout: 5000 });
        const res = await result.getText();

        await expect(res).toEqual('You entered: WIN');
    });

    it('Tab', async () => {
        await $('#target').addValue('Tab');

        const result = await $('#result');
        await result.waitForDisplayed({ timeout: 5000 });
        const res = await result.getText();

        await expect(res).toEqual('You entered: TAB');
    });

    it('Space', async () => {
        await $('#target').addValue('Space');

        const result = await $('#result');
        await result.waitForDisplayed({ timeout: 5000 });
        const res = await result.getText();

        await expect(res).toEqual('You entered: SPACE');
    });

    it('Alt', async () => {
        await $('#target').addValue('Alt');

        const result = await $('#result');
        await result.waitForDisplayed({ timeout: 5000 });
        const res = await result.getText();

        await expect(res).toEqual('You entered: ALT');
    });
});