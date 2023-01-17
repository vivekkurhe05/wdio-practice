describe('Name of the group', () => {

    before(async() => {
        await browser.url('https://demoqa.com/dragabble');
    });

    it('Drag and Drop api', async () => {
        let box = await $('#dragBox');
        await box.dragAndDrop({x: 211, y:133});
        let elemLocation = await box.getLocation();    
        console.log(elemLocation);    
    });
});