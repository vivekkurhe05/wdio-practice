describe('Upload file', () => {
    
    beforeEach(async () => {
        await browser.url('https://demoqa.com/automation-practice-form');
    });

    it('upload file', async () => {
        let filepath = '/Users/launchventures/Desktop/wdio-practice/sample.txt';
        let remotefile = await browser.uploadFile(filepath);
        await $('#uploadPicture').setValue(remotefile);
        await browser.pause(3000);
    })
});