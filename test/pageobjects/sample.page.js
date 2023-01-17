class Sample {

    constructor() {
        this.input = 'input[name="q"]';
        this.link = '.yuRUbf > a[href="https://in.linkedin.com/company/koko-networks"] > h3';
        this.title = 'h1.top-card-layout__title';
    }

    get input() { return $(this.input);}
    get link() {return $(this.link);}
}

export default new Sample();