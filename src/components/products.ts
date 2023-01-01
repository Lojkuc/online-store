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
                      <div class="info-product__price">$${price / 100}</div>
                    </div>
                    <button class="footer-product__cart button">Add to cart</button>
                  </div>
                </div>
              </div>
            `;

                const categoryObj = this.categories.find((item) => item.category === category);

                if (!categoryObj) {
                    blockCategories.innerHTML += `
        <div class="companies-aside__item">
        <div class="item__input-container">
            <label for="${category}">
                <input id="${category}" type="checkbox">
                <span class="item__input-fake"></span>
                ${category}</label>
        </div>
        <p>(<span id="${category}-stock">1</span>/<span>20</span>)</p>
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
      </div>
      <p>(<span id="${company}-stock">1</span>/<span>20</span>)</p>
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
                    this.prices.push(price / 100);
                }
            }
        );

        this.price(blockPrice);
        this.eventListeners();
    }

    async render() {
        this.productsData = await api.load();

        if (this.queryParams.url.searchParams.toString() !== '') {
            const sortData = this.selectSortingMethod() as data;

            if ($('.center-content__items')) {
                this.renderOnlyGoods(sortData);
            } else {
                this.renderProducts(this.productsData);
                this.renderOnlyGoods(sortData);
            }
        } else {
            this.productsData ? this.renderProducts(this.productsData) : console.log('no files');
        }
    }

    eventListeners() {
        const select = $('.filtres-center__sort');
        const blockProducts = $('.center-content__items') as HTMLElement;
        const asideCategories = $('.aside__categories');
        const asideCompanies = $('.aside__companies');

        asideCategories?.addEventListener('click', (e) => {
            const categoryBlock = e.target as HTMLElement;
            const filterParam = categoryBlock.closest('label')?.getAttribute('for');

            const url = this.queryParams.createQueryParams(`category=${filterParam}`);

            if (url) {
                server.route(e, url);
            }
            checkAttribute(e);
        });

        asideCompanies?.addEventListener('click', (e) => {
            const categoryBlock = e.target as HTMLElement;
            const filterParam = categoryBlock.closest('label')?.getAttribute('for');

            const url = this.queryParams.createQueryParams(`company=${filterParam}`);

            if (url) {
                server.route(e, url);
            }
            checkAttribute(e);
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

    selectSortingMethod() {
        const params = this.queryParams.getQueryParams() as IArrayParams[];
        let result: data = [];
        // let productsData: data = this.currentProductsData;

        if (params !== null) {
            params.forEach((element) => {
                // if (element.name === 'category' && params.find((item) => item.name === 'companies')) {
                //     productsData = this.currentProductsData;
                // } else if (element.name === 'companies' && params.find((item) => item.name === 'categories')) {
                //     productsData = this.currentProductsData;
                // }
                addAttribute(element.name, element.value, 'checked');
                this.productsData.forEach((item) => {
                    const key = element.name as keyof IDataObj;

                    for (const param of element.value) {
                        if (param === item[key] && !result.includes(item)) {
                            result.push(item);
                        }
                    }
                });
            });

            params.forEach((item) => {
                if (item.name === 'sort') {
                    result =
                        result.length > 0
                            ? this.sortProducts(item.value.join(''), result)
                            : this.sortProducts(item.value.join(''), this.productsData);
                }
            });

            this.currentProductsData = result;
            return result;
        }
        // if (params !== null) {
        //     params.forEach((element) => {
        //         this.productsData = this.productsData.map((item) => {
        //             const key = element.name as keyof IDataObj;

        //             for (const param of element.value) {
        //                 if (param === item[key]) {
        //                     return item;
        //                 }
        //             }
        //         }) as data;
        //     });
        //     console.log(this.productsData);
        // }

        // this.productsData = this.productsData.
    }

    // addAttributes() {
    //     console.log(this.queryParams.getQueryParams());
    //     const params = this.queryParams.getQueryParams() as IArrayParams[];
    //     params.foEach(())
    //     // const asideContainer = $(`.${name}`);

    //     // if (asideContainer !== null) {
    //     //     values.forEach((item) => {
    //     //         const aim = $(`#${item}`, asideContainer);
    //     //         console.log(aim);
    //     //         aim?.hasAttribute('checked') ? aim.removeAttribute('checked') : aim?.setAttribute('checked', 'checked');
    //     //     });
    //     // }
    // }

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
