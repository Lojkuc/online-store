import cartPageEmpty from '../assets/pages/cartPageEmpty';
import cartPage from '../assets/pages/cartPage';
//import { $ } from '../assets/utils/helpers';
import Popup from './popup';
class Cart {
  main;
  constructor(main: Element) {
    this.main = main;
  }
  render() {
    if (localStorage.getItem('cart') == '[]') {
      this.main.innerHTML = cartPageEmpty;
    } else {
      this.main.innerHTML = cartPage;
    }
  }

  openPopup() {
    const popup = new Popup();
    popup.openPopup();
  }
}

export default Cart;
