import api from '../assets/utils/api';
import productsPage from '../assets/pages/productsPage';
import { data, categoryArr, companyArr, IArrayParams, IDataObj } from '../assets/utils/types';
import { sort, $, addAttribute, checkAttribute } from '../assets/utils/helpers';
import QueryParams from '../assets/utils/queryParams';
import server from '../server';

class Products {
    main;
    productsData: data = [];
    currentProductsData: data = [];
    companies: companyArr = [];
    categories: categoryArr = [];
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
                stock,
            }: {
                image: string;
                name: string;
                price: number;
                company: string;
                category: string;
                id: string;
                stock: number;
            }) => {
                blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail_${id}"><img  src="${image}" alt="product" class="product__img"></a>
                  <div class="product__footer">
                    <div class="footer-product__info info-product">
                      <div class="info-product__name">${name}</div>
                      <div class="info-product__price">$${price}</div>
                    </div>
                    <button class="footer-product__cart button">Add to cart</button>
                  </div>
                </div>
              </div>
            `;

                const categoryObj = this.categories.find((item) => item.category === category);

                if (!categoryObj) {
                    blockCategories.innerHTML += `
        <div class="categories-aside__item">
        <div class="item__input-container">
            <label for="${category}">
                <input id="${category}" type="checkbox">
                <span class="item__input-fake"></span>
                ${category}</label>
                <p>(<span id="${category}-stock">1</span>/<span>20</span>)</p>
        </div>
      
    </div>
`;

                    this.categories.push({
                        category: category,
                        stock: stock,
                    });
                } else {
                    categoryObj.stock += stock;

                    const currentStockBlock = $(`#${category}-stock`);

                    if (currentStockBlock !== null) {
                        currentStockBlock.textContent = String(categoryObj.stock);
                    }
                }
                const companyObj = this.companies.find((item) => item.company === company);

                if (!companyObj) {
                    blockCompanies.innerHTML += `
      <div class="categories-aside__item">
      <div class="item__input-container">
          <label for="${company}">
              <input id="${company}" type="checkbox">
              <span class="item__input-fake"></span>
              ${company}</label>
              <p>(<span id="${company}-stock">1</span>/<span>20</span>)</p>
      </div>
  </div>
      `;

                    this.companies.push({
                        company: company,
                        stock: stock,
                    });
                } else {
                    companyObj.stock += stock;

                    const currentStockBlock = $(`#${company}-stock`);

                    if (currentStockBlock !== null) {
                        currentStockBlock.textContent = String(companyObj.stock);
                    }
                }

                if (!this.prices.includes(price)) {
                    this.prices.push(price);
                }
            }
        );

        this.price(blockPrice);
        this.eventListeners();
    }

    async render() {
        this.productsData = await api.load();

        if (this.queryParams.url.searchParams.toString() !== '') {
            if (!$('.center-content__items')) {
                this.renderProducts(this.productsData);
            }

            const sortData = this.selectSortingMethod() as data;
            this.renderOnlyGoods(sortData);
        } else {
            this.productsData ? this.renderProducts(this.productsData) : console.log('no files');
        }
    }

    eventListeners() {
        const select = $('.filtres-center__sort');
        const blockProducts = $('.center-content__items') as HTMLElement;
        const asideCheckboxes = $('.aside__checkboxes');
        // const sliderPriceBlock = $('.slider__price');
        const inputPriceMin = $('.price-min') as HTMLInputElement;
        const inputPriceMax = $('.price-max') as HTMLInputElement;

        asideCheckboxes?.addEventListener('click', (e) => {
            const eventBlock = e.target as HTMLElement;
            const itemContainer = eventBlock.closest('.item__input-container') as HTMLElement;
            const input = $('input', itemContainer) as HTMLInputElement;
            const filterParam = input.getAttribute('id');

            if (filterParam) {
                const url = input.closest('.category')
                    ? this.queryParams.createQueryParams(`category=${filterParam}`)
                    : this.queryParams.createQueryParams(`company=${filterParam}`);

                if (url) {
                    server.route(e, url);
                }
            }
            checkAttribute(input);
        });

        select?.addEventListener('click', (e: Event) => {
            const currentSelect = e.target as HTMLOptionElement;

            if (currentSelect.value === 'disabled') {
                return;
            }

            const url = this.queryParams.createQueryParams(`${currentSelect.value}`);
            server.route(e, url);
        });

        blockProducts.addEventListener('click', (e) => {
            let block = e.target as HTMLLinkElement;
            block = block.parentElement as HTMLLinkElement;
            server.route(e, block.href);
        });

        inputPriceMin?.addEventListener('change', (e) => {
            const url = this.queryParams.createQueryParams(`price=${inputPriceMin?.value}-${inputPriceMax.value}`);
            server.route(e, url);
        });
        inputPriceMax?.addEventListener('change', (e) => {
            const url = this.queryParams.createQueryParams(`price=${inputPriceMin?.value}-${inputPriceMax.value}`);
            server.route(e, url);
        });
    }

    price(blockPrice: Element) {
        const sortPrices = this.prices.sort((a: number, b: number) => a - b);
        const min = sortPrices[0];
        const max = sortPrices[sortPrices.length - 1];
        //const length = sortPrices.length;

        blockPrice.innerHTML = `
    <div class="aside__title title-aside">Price</div>
    <div class="aside__range">
        <div class="aside__range_min">${min}$</div>
        <div class="aside__range_separator"> ⟷ </div>
        <div class="aside__range_max">${max}$</div>
    </div>
    <div class="range-slider slider__price">
        <input class="aside__input price-max" step="10" type="range" min="0" max="${max}" value="${max}"></input>
        <input class="aside__input price-min" step="10" type="range" min="0" max="${max}" value="0"></input>
    </div>
      `;
    }

    sortProducts(method: string, data: data) {
        const options = $(`option[value="sort=${method}"]`);
        options?.setAttribute('selected', 'selected');

        switch (method) {
            case 'price-low':
                data = sort(data, 'price', 'low');
                break;
            case 'price-high':
                data = sort(data, 'price', 'high');
                break;
            case 'name-high':
                data = sort(data, 'name', 'high');
                break;
            case 'name-low':
                data = sort(data, 'name', 'low');
        }

        return data;
    }

    renderOnlyGoods(data: data) {
        const blockProducts = $('.center-content__items') as HTMLElement;
        const amountProductsBlock = $('.filtres-center__products') as HTMLElement;
        amountProductsBlock.textContent = `
        ${data.length} products found
    `;

        blockProducts.innerHTML = '';

        data.forEach(({ image, name, price, id }: { image: string; name: string; price: number; id: string }) => {
            blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail_${id}"><img  src="${image}" alt="product" class="product__img"></a>
                  <div class="product__footer">
                    <div class="footer-product__info info-product">
                      <div class="info-product__name">${name}</div>
                      <div class="info-product__price">$${price}</div>
                    </div>
                    <button class="footer-product__cart button">Add to cart</button>
                  </div>
                </div>
              </div>
            `;
        });
    }

    selectSortingMethod() {
        const params = this.queryParams.getQueryParams() as IArrayParams[];
        let productsData: data = this.productsData;

        if (params !== null) {
            params.forEach((element) => {
                const result: data = [];

                if (element.name === 'sort') {
                    productsData =
                        productsData.length > 0
                            ? this.sortProducts(element.value.join(''), productsData)
                            : this.sortProducts(element.value.join(''), this.productsData);
                    return;
                }

                addAttribute(element.name, element.value, 'checked');

                productsData.forEach((item) => {
                    const key = element.name as keyof IDataObj;

                    if (element.name === 'category' || element.name === 'comapny') {
                        for (const param of element.value) {
                            if (param === item[key] && !result.includes(item)) {
                                result.push(item);
                            }
                        }
                    } else {
                        if (element.name === 'price') {
                            const valueArr = element.value.join('').split('-');
                            const min = valueArr[0];
                            const max = valueArr[1];

                            this.renderOnlyPrice(element.name, min, max);

                            if (item[key] <= max && item[key] >= min && !result.includes(item)) {
                                result.push(item);
                            }
                        }
                    }
                    productsData = Array.from(result);
                });
            });

            return productsData;
        }
    }

    renderOnlyPrice(name: string, min: string, max: string) {
        const rangeContainer = $(`.aside__${name}`);
        if (rangeContainer !== null) {
            const asideMaxNumber = <HTMLElement>$('.aside__range_max', rangeContainer);
            const asideMinNumber = <HTMLElement>$('.aside__range_min', rangeContainer);
            const inputMin = $(`.${name}-min`) as HTMLInputElement;
            const inputMax = $(`.${name}-max`) as HTMLInputElement;
            inputMin.value = min;
            inputMax.value = max;
            asideMaxNumber.textContent = max;
            asideMinNumber.textContent = min;
        }
    }
}

export default Products;
