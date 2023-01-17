describe('Mouse Actions', () => {

    beforeEach( async () => {
        await browser.url('https://demoqa.com/menu#');
    });
    
    it('mouse action', async () => {
        let x = await $('#nav > li:nth-child(2)').getLocation('x');
        let y = await $('#nav > li:nth-child(2)').getLocation('y');
        await $('#nav > li:nth-child(2)').moveTo(x, y);
        await $('#nav > li:nth-child(2) > ul > li:nth-last-child(1)').moveTo();
        await $('#nav > li:nth-child(2) > ul > li:nth-last-child(1) > ul > li:first-child').moveTo();

        await browser.pause(3000);
    }); 
});