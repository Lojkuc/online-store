import cartPageEmpty from '../assets/pages/cartPageEmpty';
import { cartPage } from '../assets/pages/cartPage';
import Popup from './popup';
import { $, $All } from '../assets/utils/helpers';
import { data } from '../assets/utils/types';

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
    const allBtns = $All('.btn');

    buyBtn.addEventListener('click', this.openPopup);

    allBtns.forEach((item) =>
      item.addEventListener('click', () => {
        setTimeout(this.changeMainSum, 0);
      })
    );
  }

  openPopup() {
    const popup = new Popup();
    popup.openPopup();
  }

  changeMainSum() {
    const totalPrice = <HTMLElement>$('.total__price');
    const totalCount = <HTMLElement>$('.total__count');
    const productsJson = <string>localStorage.getItem('cart');
    const productsArr = <data>JSON.parse(productsJson);

    let sum = 0;
    let count = 0;

    productsArr.forEach((element) => {
      const sumElement = element.count * element.price;
      count += element.count;
      sum += sumElement;
    });
    console.log(sum);
    totalPrice.textContent = `$${String(sum)}`;
    totalCount.textContent = `${String(count)}`;
  }
}

export default Cart;
