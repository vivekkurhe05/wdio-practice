describe('Practice Form', () => {
    
    before( async () => {
        await browser.url('https://demoqa.com/automation-practice-form');
    });

    it('Fill the form', async () => {
        await $('#firstName').setValue('Test');
        await $('#lastName').setValue('Form');
        await $('#userEmail').setValue('test@mail.com');
        await $('.custom-radio').$$('input + label')[0].click();
        await $('#userNumber').setValue('9823207513');
        await $('#dateOfBirthInput').click();
        const month = await $('.react-datepicker__month-select');
        await month.selectByVisibleText('November');

        const year = await $('.react-datepicker__year-select');
        await year.selectByVisibleText('1993');

        await $('.react-datepicker__month > .react-datepicker__week:first-child > div:nth-child(6)').click();

        // await $('#dateOfBirthInput').setAttribute('value','05 Nov 1993');
        await browser.pause(10000);

    });
});