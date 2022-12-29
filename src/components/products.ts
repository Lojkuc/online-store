import api from '../assets/utils/api';
import productsPage from '../assets/pages/productsPage';
import { data } from '../assets/utils/types';
import { sort, $ } from '../assets/utils/helpers';
import QueryParams from '../assets/utils/queryParams';
import server from '../server';

class Products {
    main;
    productsData: data = [];
    companies: string[] = [];
    categories: string[] = [];
    prices: number[] = [];
    queryParams;

    constructor(main: Element) {
        this.main = main;
        this.queryParams = new QueryParams();
    }

    renderProducts(data: data) {
        this.main.innerHTML = productsPage;

        const blockProducts = $('.center-content__items') as HTMLElement;
        const blockCategories = $('.categories-aside__list') as HTMLElement;
        const blockCompanies = $('.aside__companies') as HTMLElement;
        const blockPrice = $('.aside__price') as HTMLElement;

        data.forEach(
            ({
                image,
                name,
                price,
                company,
                category,
                id,
            }: {
                image: string;
                name: string;
                price: number;
                company: string;
                category: string;
                id: string;
            }) => {
                blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail_${id}"><img  src="${image}" alt="product" class="product__img"></a>
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
        this.eventListeners();
    }

    async render() {
        this.productsData = await api.load();

        if (this.queryParams.isIncludeQueryParams('=')) {
            const sortData = this.sortProducts(this.queryParams.getQueryParams());
            this.renderProducts(sortData);
        } else {
            this.productsData ? this.renderProducts(sort(this.productsData, 'price', 'low')) : console.log('no files');
        }
    }

    eventListeners() {
        const select = $('.filtres-center__sort');
        const blockProducts = $('.center-content__items') as HTMLElement;

        select?.addEventListener('click', (e: Event) => {
            const currentSelect = e.target as HTMLOptionElement;
            const sortData = this.sortProducts(currentSelect.value);

            if (currentSelect.value === 'disabled') {
                return;
            }

            this.queryParams.addQueryParams(`${currentSelect.value}`);
            this.renderOnlyGoods(sortData);
        });

        blockProducts.addEventListener('click', (e) => {
            server.route(e);
        });
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

    sortProducts(method: string) {
        let data: data = this.productsData;

        switch (method) {
            case 'sort=price-low':
                data = sort(this.productsData, 'price', 'low');
                break;
            case 'sort=price-high':
                data = sort(this.productsData, 'price', 'high');
                break;
            case 'sort=name-high':
                data = sort(this.productsData, 'name', 'high');
                break;
            case 'sort=name-low':
                data = sort(this.productsData, 'name', 'low');
        }

        return data;
    }

    renderOnlyGoods(data: data) {
        const blockProducts = $('.center-content__items') as HTMLElement;

        blockProducts.innerHTML = '';

        data.forEach(({ image, name, price, id }: { image: string; name: string; price: number; id: string }) => {
            blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail_${id}"><img  src="${image}" alt="product" class="product__img"></a>
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
        });
    }
    // findCurrentProduct(e: Event) {
    //     const imageBlock = e.target as HTMLElement;
    //     const nameElem = imageBlock.closest('.product') as HTMLElement;
    //     const aimElement = nameElem.querySelector('.info-product__name') as HTMLElement;
    //     const nameElement = aimElement.textContent;
    //     const currentProduct = this.productsData.find((i) => i.name === nameElement);
    //     return currentProduct;
    // }
}

export default Products;
