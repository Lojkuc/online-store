import homePage from '../assets/pages/homePage';

class Home {
    main;
    constructor(main: Element) {
        this.main = main;
    }

    render() {
        this.main.innerHTML = homePage;
    }
}

export default Home;
