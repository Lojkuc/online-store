import api from '../assets/utils/api';
import productsPage from '../assets/pages/productsPage';
import { data } from '../assets/utils/types';

class Products {
    main;
    companies: string[] = [];
    categories: string[] = [];
    prices: number[] = [];

    constructor(main: Element) {
        this.main = main;
    }

    renderProducts(data: data) {
        this.main.innerHTML = productsPage;

        const blockProducts = document.querySelector('.center-content__items') as HTMLElement;
        const blockCategories = document.querySelector('.categories-aside__list') as HTMLElement;
        const blockCompanies = document.querySelector('.aside__companies') as HTMLElement;
        const blockPrice = document.querySelector('.aside__price') as HTMLElement;

        data.forEach(
            (
                {
                    image,
                    name,
                    price,
                    company,
                    category,
                }: { image: string; name: string; price: number; company: string; category: string },
                index: number
            ) => {
                blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail${index}" onclick="route(event)"><img  src="${image}" alt="product" class="product__img"href="/product1" onclick="route(event)"></a>
                  <div class="product__footer">
                    <div class="footer-product__info info-product">
                      <div class="info-product__name">${name}</div>
                      <div class="info-product__price">$${price / 100}</div>
                    </div>
                    <button class="footer-product__cart button">Add to cart</button>
                  </div>
                </div>
              </div>
            `;

                if (!this.companies.includes(company)) {
                    blockCompanies.innerHTML += `
      <div class="categories-aside__item">
      <div class="item__input-container">
          <label for="${company}">
              <input id="${company}" type="checkbox">
              <span class="item__input-fake"></span>
              ${company}</label>
      </div>
      <span>(3/5)</span>
  </div>
      `;

                    this.companies.push(company);
                }

                if (!this.categories.includes(category)) {
                    blockCategories.innerHTML += `
        <div class="companies-aside__item">
        <div class="item__input-container">
            <label for="${category}">
                <input id="${category}" type="checkbox">
                <span class="item__input-fake"></span>
                ${category}</label>
        </div>
        <span>(3/5)</span>
    </div>
`;
                    this.categories.push(category);
                }

                if (!this.prices.includes(price)) {
                    this.prices.push(price / 100);
                }
            }
        );

        this.price(blockPrice);
    }

    async render() {
        const data = await api.load();
        data ? this.renderProducts(data) : console.log('no files');
    }

    price(blockPrice: Element) {
        const sortPrices = this.prices.sort((a: number, b: number) => a - b);
        const min = sortPrices[0];
        const max = sortPrices[sortPrices.length - 1];
        const length = sortPrices.length;

        blockPrice.innerHTML = `
    <div class="aside__title title-aside">Price</div>
    <div class="aside__range">
        <div class="aside__range_min">${min}$</div>
        <div class="aside__range_separator"> ⟷ </div>
        <div class="aside__range_max">${max}$</div>
    </div>
    <div class="range-slider">
        <input class="aside__input" type="range" min="0" max="${length}" value="${length}"></input>
        <input class="aside__input" type="range" min="0" max="${length}" value="0"></input>
    </div>
      `;
    }
}

export default Products;
