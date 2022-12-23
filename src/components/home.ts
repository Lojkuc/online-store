import homePage from '../assets/pages/homePage';

class Home {
    main;
    constructor(main: any) {
        this.main = main;
    }
    render() {
        this.main.innerHTML = homePage;
    }
}
