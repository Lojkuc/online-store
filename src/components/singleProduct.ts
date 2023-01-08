import singleProductPage from '../assets/pages/singleProductPage';
import { data, IDataObj } from '../assets/utils/types';
import { $ } from '../assets/utils/helpers';
import api from '../assets/utils/api';
import { cartPage } from '../assets/pages/cartPage';
class SingleProduct {
  main;

  constructor(main: Element) {
    this.main = main;
  }
  async render() {
    this.main.innerHTML = singleProductPage;

    const productId = this.getIdProduct();
    const data: data = await api.load();
    const currentProduct = data.find((i) => i.id === productId);
    const container = $('.main__content') as HTMLElement;

    if (currentProduct !== undefined) {
      const { image, name, price, company, description, id, stock } = currentProduct;
      const navigationTitle = $('#breadcrumb') as HTMLElement;

      navigationTitle.textContent = currentProduct.name;

      container.innerHTML = `
            <section class="content__gallery">
            <div class="gallery__photo">
              <img src="${image}" id="main-photo" alt="photo product" class="gallery__photo-img">
            </div>
            <div class="gallery__subphoto">
              <img src="${image}" alt="photo product" class="gallery__photo-img">
              <img src="../img/product-addition1.jpg" alt="photo product" class="gallery__photo-img">
              <img src="../img/product-addition2.jpg" alt="photo product" class="gallery__photo-img">
              <img src="../img/product-addition3.jpg" alt="photo product" class="gallery__photo-img">
            </div>
          </section>
          <section class="content__info">
            <h1 class="info__title">${name}</h1>
            <div class="info__grade">
              <div class="grade__reviews">(100 customer reviews)</div>
            </div>
            <div class="info__price">$${price}</div>
            <p class="info__description">${description}</p>
            <p class="info__details">
              <span class="details__key">Stock : </span>
              <span class="details__value">${stock}</span>
            </p>
            <p class="info__details">
              <span class="details__key">SKU :</span>
              <span class="details__value">${id}</span>
            </p>
            <p class="info__details">
              <span class="details__key">Brand :</span>
              <span class="details__value">${company}</span>
            </p>
            <div class="info__cart">
              <div class="cart__amount">
                <button class="cart__minus">-</button>
                <h2 class="cart__number">1</h2>
                <button class="cart__plus">+</button>
              </div>
              <button class="info__cart button " id ='${id}'>Add to cart</button>
              <button class="info__buy button">Buy now</button>
            </div>
          </section>
            `;
      this.eventLiteners();
    }
  }

  getIdProduct() {
    const productNumber = window.location.pathname.split('_')[1];

    return productNumber;
  }

  eventLiteners() {
    const photoCont = document.querySelector('.gallery__subphoto');
    const addProduct = document.querySelector('.info__cart');
    const countProductPlus = document.querySelector('.cart__plus');
    const countProductMinus = document.querySelector('.cart__minus');
    const countProducts = document.querySelector('.cart__number') as Element;
    photoCont?.addEventListener('click', (e: Event) => {
      this.changeMainPhoto(e);
    });
    addProduct?.addEventListener('click', async (e) => {
      const countNow = +countProducts.innerHTML;
      const dataArr = await api.load();
      const target = e.target as HTMLElement;
      const id = target.id;
      const component = dataArr.find((el: IDataObj) => el.id == id);
      const arr = JSON.parse(localStorage.getItem('cart') as string);
      const arrId = arr.map((el: IDataObj) => el.id);
      if (arrId.includes(component.id)) {
        arr.map((el: IDataObj) => {
          if (el.id == component.id) {
            el.count += countNow;
            el.stock -= countNow;
          } else {
            el.count;
          }
        });
      } else arr.push(component);
      localStorage.setItem(`cart`, JSON.stringify(arr));
      cartPage();
    });
    countProductPlus?.addEventListener('click', (e: Event) => {
      const target = e.target as Element;
      const component = target.previousElementSibling as Element;
      let content = +component.innerHTML as number;
      component.innerHTML = `${++content}`;
    });
    countProductMinus?.addEventListener('click', (e: Event) => {
      const target = e.target as Element;
      const component = target.nextElementSibling as Element;
      let content = +component.innerHTML as number;
      if (component.innerHTML == `${1}`) {
        return;
      }
      component.innerHTML = `${--content}`;
    });
  }

  changeMainPhoto(e: Event) {
    const currentImage = e.target as HTMLImageElement;
    const mainPhoto: HTMLImageElement | null = document.querySelector('#main-photo');

    if (mainPhoto !== null) {
      mainPhoto.src = currentImage?.src;
    }
  }
}

export default SingleProduct;
