import errorPage from '../assets/pages/errorPage';

class Err {
  main;
  constructor(main: Element) {
    this.main = main;
  }

  render() {
    this.main.innerHTML = errorPage;
  }
}

export default Err;
