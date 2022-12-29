import aboutPage from '../assets/pages/aboutPage';

class About {
    main;
    constructor(main: Element) {
        this.main = main;
    }

    render() {
        this.main.innerHTML = aboutPage;
    }
}

export default About;
