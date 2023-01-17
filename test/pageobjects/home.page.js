const TITLE = '';

class HomePage {

    constructor() {
        this.TITLE ='h4[class*="page-title"]';
    }

    get homePageTitle() {return $(this.TITLE);}
}

module.exports = new HomePage();