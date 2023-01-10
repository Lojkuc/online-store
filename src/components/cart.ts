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
    const promoBtn = <HTMLButtonElement>$('.promo__button');

    buyBtn.addEventListener('click', this.openPopup);

    allBtns.forEach((item) =>
      item.addEventListener('click', () => {
        setTimeout(this.changeMainSum, 0);
      })
    );

    promoBtn.addEventListener('click', (e) => {
      this.addPromoCode(e);
    });
  }

  openPopup() {
    const popup = new Popup();
    popup.openPopup();
  }

  changeMainSum() {
    const totalPrice = <HTMLElement>$('.total-price__number');
    const totalPriceBlock = <HTMLElement>$('.block_price');
    const totalDiscountBlock = <HTMLElement>$('.total__discount-number');
    const discontNumber = <string>totalDiscountBlock.textContent;
    const newTotal = <HTMLElement>$('.discount_price');

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
    totalPrice.textContent = `Total: $${String(sum)}`;
    totalCount.textContent = `Items: ${String(count)}`;

    if (+discontNumber > 0) {
      const discountSum = sum - (sum / 100) * +discontNumber;
      totalPriceBlock.classList.add('crossed');
      newTotal.innerHTML = `
    <h2 class="total__price">Total: $${discountSum}</h2>`;
      totalPriceBlock.before(newTotal);
    } else {
      newTotal.innerHTML = ``;
      totalPriceBlock.classList.remove('crossed');
    }
  }

  addPromoCode(e: Event) {
    e.preventDefault();
    const input = <HTMLInputElement>$('.promo__input');
    const value = input.value;
    const btn = document.createElement('button');
    btn.classList.add('add__promo');

    if (value === 'RS') {
      const promoBlock = <HTMLElement>$('.codes__apply1');
      promoBlock.innerHTML = '<span>RS - 10%</span>';
      promoBlock.prepend(btn);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = <HTMLButtonElement>e.currentTarget;
        btn.classList.contains('remove') ? this.deleteDiscount(btn, 'RS') : this.addDiscountSum(btn, 'RS - 10%', 'RS');
        this.changeMainSum();
      });
    }

    if (value === 'EPM') {
      const promoBlock = <HTMLElement>$('.codes__apply2');
      promoBlock.innerHTML = '<span>EPAM - 10%</span>';
      promoBlock.prepend(btn);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = <HTMLButtonElement>e.currentTarget;
        btn.classList.contains('remove')
          ? this.deleteDiscount(btn, 'EPM')
          : this.addDiscountSum(btn, 'EPAM - 10%', 'EPM');
        this.changeMainSum();
      });
    }
  }

  addDiscountSum(btn: HTMLElement, promo: string, cls: string) {
    btn.classList.add('remove');
    const discountNumber = <HTMLElement>$('.total__discount-number');
    const currentDiscount = <string>discountNumber.textContent;
    discountNumber.textContent = String(+currentDiscount + 10);
    const blockPromoCodes = <HTMLElement>$('.promo-list');
    blockPromoCodes.innerHTML += `<span class = "${cls}"> ${promo}</span>`;
  }

  deleteDiscount(btn: HTMLElement, cls: string) {
    btn.classList.remove('remove');
    const discountNumber = <HTMLElement>$('.total__discount-number');
    const currentDiscount = <string>discountNumber.textContent;
    discountNumber.textContent = String(+currentDiscount - 10);
    const blockPromoCodes = <HTMLElement>$('.promo-list');
    const blockForDelete = <HTMLElement>$(`.${cls}`);
    blockPromoCodes.removeChild(blockForDelete);
  }
}

export default Cart;
