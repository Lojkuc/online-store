import api from './api';
import singleProductPage from '../assets/pages/singleProductPage';
import { data } from '../assets/helper/types';

class SingleProduct {
    main;

    constructor(main: Element) {
        this.main = main;
    }

    async render() {
        this.main.innerHTML = singleProductPage;

        const productNumber = this.getNumberProduct();
        const data: data = await api.load();
        const container = document.querySelector('.main__content') as HTMLElement;

        const { image, name, price, company, description, id } = data[productNumber];

        container.innerHTML = `
            <section class="content__gallery">
            <div class="gallery__photo">
              <img src="${image}" alt="photo product" class="gallery__photo-img">
            </div>
            <div class="gallery__subphoto">
              <img src="${image}" alt="photo product" class="gallery__photo-img">
              <img src="./img/product-addition1.jpg" alt="photo product" class="gallery__photo-img">
              <img src="./img/product-addition2.jpg" alt="photo product" class="gallery__photo-img">
              <img src="./img/product-addition3.jpg" alt="photo product" class="gallery__photo-img">
            </div>
          </section>
          <section class="content__info">
            <h1 class="info__title">${name}</h1>
            <div class="info__grade">
              <div class="grade__reviews">(100 customer reviews)</div>
            </div>
            <div class="info__price">$${price / 100}</div>
            <p class="info__description">${description}</p>
            <p class="info__details">
              <span class="details__key">Available : </span>
              <span class="details__value">In stock</span>
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
              <button class="info__cart button">Add to cart</button>
              <button class="info__buy button">Buy now</button>
            </div>
          </section>
            `;
    }

    getNumberProduct() {
        const productNumber = Number(window.location.pathname.slice(15));
        return productNumber;
    }
}

export default SingleProduct;
