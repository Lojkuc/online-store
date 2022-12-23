import api from './api';
import products from '../assets/pages/products';

class Catalog {
    main;
    companies: any = [];
    categories: any = [];
    prices: any = [];

    constructor(main: any) {
        this.main = main;
    }

    renderCatalog(data: any) {

        this.main.innerHTML = products;

        const containerProducts = document.querySelector('.center-content__items') as HTMLElement;
        const containerCategories = document.querySelector('.categories-aside__list') as HTMLElement;
        const containerCompanies = document.querySelector('.aside__companies') as HTMLElement;
        const containerPrice = document.querySelector('.aside__price') as HTMLElement;

        data.forEach(({ image, name, price, company, category }: { image: any, name: any, price: any, company: any, category: any }, index: number) => {

            containerProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product${index}" onclick="route(event)"><img  src="${image}" alt="product" class="product__img"href="/product1" onclick="route(event)"></a>
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
                containerCompanies.innerHTML += `
      <div class="categories-aside__item">
      <div class="item__input-container">
          <label for="${company}">
              <input id="${company}" type="checkbox">
              <span class="item__input-fake"></span>
              ${company}</label>
      </div>
      <span>(3/5)</span>
  </div>
      `

                this.companies.push(company)
            }

            if (!this.categories.includes(category)) {
                containerCategories.innerHTML += `
        <div class="companies-aside__item">
        <div class="item__input-container">
            <label for="${category}">
                <input id="${category}" type="checkbox">
                <span class="item__input-fake"></span>
                ${category}</label>
        </div>
        <span>(3/5)</span>
    </div>
`
                this.categories.push(category)
            }

            if (!this.prices.includes(price)) {
                this.prices.push(price / 100);
            }
        })

        this.price(containerPrice)
    }

    async render() {
        const data = await api.load();
        data ? this.renderCatalog(data) : console.log('no files');
    }

    price(containerPrice: any) {
        const sortPrices = this.prices.sort((a: number, b: number) => a - b)
        const min = sortPrices[0];
        const max = sortPrices[sortPrices.length - 1];
        const length = sortPrices.length;

        containerPrice.innerHTML = `
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
      `
    }
}

export default Catalog;
