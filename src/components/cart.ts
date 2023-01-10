import cartPageEmpty from '../assets/pages/cartPageEmpty';
import { cartPage } from '../assets/pages/cartPage';
import Popup from './popup';
import { $, $All } from '../assets/utils/helpers';
import { data } from '../assets/utils/types';
import QueryParams from '../assets/utils/queryParams';
import server from '../server';
import { IArrayParams } from '../assets/utils/types';

class Cart {
  main;
  queryParams;
  data: data;
  constructor(main: Element) {
    this.main = main;
    this.queryParams = new QueryParams();
    this.data = JSON.parse(localStorage.getItem('cart') as string).filter((el: string) => Boolean(el));
  }

  render() {
    if (localStorage.getItem('cart') == '[]') {
      this.main.innerHTML = cartPageEmpty;
    } else {
      this.main.innerHTML = cartPage();
      this.eventlisteners();
      if (this.queryParams.url.searchParams.toString() !== '') {
        this.checkQueryParams();
      }
    }
  }

  renderCart(page = 1, limit: number = this.data.length) {
    const containerProducts = <HTMLElement>$('.products-container');
    containerProducts.innerHTML = '';

    if (localStorage.getItem('cart')) {
      for (let i = page * limit - limit; i < limit * page; i++) {
        if (this.data[i] == null) continue;
        containerProducts.innerHTML += `
          <div class="content__inner cart__product">
              <div class="content__item">
                <img src="${this.data[i].image[0]}" width="300" height="200"alt="">
              <div class="item__info">
                  <p class="item__name">${this.data[i].name.toUpperCase()}</p>
                  <p>${this.data[i].category.toUpperCase()}/${this.data[i].company.toUpperCase()}</p>
              </div>
              </div>
              <div class="content__price">
                $${this.data[i].price}
              </div>
              <div class="content__quantity">
                <button class="counter_minus btn button" data-id="${this.data[i].id}">-</button>
                  ${this.data[i].count}
                <button class="counter_plus btn button" data-id="${this.data[i].id}">+</button>
              </div>
              <div class="content__subtotal">
                $${this.data[i].price * this.data[i].count}
              </div>
              <button class="delete__product btn button" data-id="${this.data[i].id}">REMOVE</i></button>
              </div>
              
          `;
      }
    }
  }

  eventlisteners() {
    const limitInput = <HTMLInputElement>$('.limit-pgn__input');
    const buyBtn = <HTMLButtonElement>$('.buy__submit');
    const allBtns = $All('.btn');
    const promoBtn = <HTMLButtonElement>$('.promo__button');
    const leftBtn = <HTMLButtonElement>$('.page-pgn__button-left');
    const rightBtn = <HTMLButtonElement>$('.page-pgn__button-right');

    buyBtn.addEventListener('click', this.openPopup);

    allBtns.forEach((item) =>
      item.addEventListener('click', () => {
        setTimeout(() => {
          this.changeMainSum();
        }, 0);
      })
    );

    promoBtn.addEventListener('click', (e) => {
      this.addPromoCode(e);
    });

    limitInput.addEventListener('change', (e) => {
      const url = this.queryParams.createQueryParams(`limit=${limitInput.value}`);
      server.route(e, url);
    });

    leftBtn.addEventListener('click', (e) => {
      this.changeNumberPage(e, '-');
    });

    rightBtn.addEventListener('click', (e) => {
      this.changeNumberPage(e, '+');
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

  changeNumberPage(e: Event, sign: string) {
    const pageNumber = <HTMLElement>$('.page-pgn__number');
    const currentNumber = <string>pageNumber.textContent;
    const inputLimit = <HTMLInputElement>$('.limit-pgn__input');

    if (sign === '+' && this.data.length > +inputLimit.value * +currentNumber) {
      pageNumber.textContent = String(Number(currentNumber) + 1);
    }
    if (sign === '-' && +currentNumber > 1) {
      pageNumber.textContent = String(Number(currentNumber) - 1);
    }
    const url = this.queryParams.createQueryParams(`page=${pageNumber.textContent}`);

    server.route(e, url);
  }

  checkQueryParams() {
    const params = <IArrayParams[]>this.queryParams.getQueryParams();
    const inputLimit = <HTMLInputElement>$('.limit-pgn__input');
    const pageNumber = <HTMLElement>$('.page-pgn__number');
    const currentPage = <number>Number(pageNumber.textContent);
    let newPage = currentPage;

    params.forEach((item) => {
      if (item.name === 'limit') {
        inputLimit.value = item.value.join('');
      }
      if (item.name === 'page') {
        newPage = +item.value.join('');
        pageNumber.textContent = String(newPage);
      }
    });
    this.renderCart(newPage, +inputLimit.value);
    const allBtns = $All('.btn');
    allBtns.forEach((item) =>
      item.addEventListener('click', () => {
        setTimeout(() => {
          this.changeMainSum();
        }, 0);
      })
    );
  }
}

export default Cart;
