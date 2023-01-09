import cartPageEmpty from '../assets/pages/cartPageEmpty';
import { cartPage } from '../assets/pages/cartPage';
import Popup from './popup';
import { $ } from '../assets/utils/helpers';

class Cart {
  main;

  constructor(main: Element) {
    this.main = main;
  }

  render() {
    if (localStorage.getItem('cart') == '[]') {
      this.main.innerHTML = cartPageEmpty;
    } else {
      this.main.innerHTML = cartPage();
      this.eventlisteners();
    }
  }

  eventlisteners() {
    const buyBtn = <HTMLButtonElement>$('.buy__submit');

    buyBtn.addEventListener('click', this.openPopup);
  }

  openPopup() {
    const popup = new Popup();
    popup.openPopup();
  }
}
export default Cart;
