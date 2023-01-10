import api from '../assets/utils/api';
import productsPage from '../assets/pages/productsPage';
import { data, categoryArr, companyArr, IArrayParams, IDataObj } from '../assets/utils/types';
import {
  sort,
  $,
  addAttribute,
  checkAttribute,
  deleteAllAtriutes,
  changeTextHTML,
  $All,
} from '../assets/utils/helpers';
import QueryParams from '../assets/utils/queryParams';
import server from '../server';
import { cartPage } from '../assets/pages/cartPage';
class Products {
  main;
  productsData: data = [];
  currentProductsData: data = [];
  companies: companyArr = [];
  categories: categoryArr = [];
  prices: number[] = [];
  stocks: number[] = [];
  queryParams;
  arrParams: string[] = ['category', 'company', 'view', 'sort', 'search', 'price', 'stock'];

  constructor(main: Element) {
    this.main = main;
    this.queryParams = new QueryParams();
  }

  renderProducts(data: data) {
    this.main.innerHTML = productsPage;
    cartPage();

    const blockProducts = $('.center-content__items') as HTMLElement;
    const blockCategories = $('.categories-aside__list') as HTMLElement;
    const blockCompanies = $('.aside__companies') as HTMLElement;
    const blockPrice = $('.aside__price') as HTMLElement;
    const blockStock = $('.aside__stock') as HTMLElement;

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
        image: string[];
        name: string;
        price: number;
        company: string;
        category: string;
        id: string;
        stock: number;
        count: number;
      }) => {
        let text = 'Add to cart';
        const arr = JSON.parse(localStorage.getItem('cart') as string);
        const arrId = arr.map((el: IDataObj) => el.id);
        if (arrId.includes(id)) {
          text = 'Remove from cart';
        } else {
          text = 'Add to cart';
        }
        blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail_${id}"><img  src="${image[0]}" alt="product" class="product__img"></a>
                  <div class="product__footer">
                    <div class="footer-product__info info-product">
                      <div class="info-product__name">${name}</div>
                      <div class="info-product__price">$${price}</div>
                    </div>
                    <button class="footer-product__cart button">${text}</button>
                  </div>
                </div>
              </div>
            `;

        blockProducts.querySelectorAll('.button')?.forEach((el, index) =>
          el.addEventListener('click', function () {
            let arr = JSON.parse(localStorage.getItem('cart') as string);
            const arrId = arr.map((el: IDataObj) => el.id);
            if (!arrId.includes(data[index].id)) {
              arr.push(data[index]);
            } else {
              arr = arr.filter((el: IDataObj) => el.id != data[index].id);
            }
            localStorage.setItem(`cart`, JSON.stringify(arr));
            cartPage();
          })
        );

        const categoryObj = this.categories.find((item) => item.category === category);

        if (!categoryObj) {
          blockCategories.innerHTML += `
        <div class="categories-aside__item">
        <div class="item__input-container">
            <label for="${category}">
                <input id="${category}" type="checkbox">
                <span class="item__input-fake"></span>
                ${category}</label>
                <p>(<span class="current-stock" id="${category}-stock">1</span>/<span>1</span>)</p>
        </div>
    </div>
`;
          this.categories.push({
            category: category,
            stock: 1,
          });
        } else {
          categoryObj.stock += 1;

          const currentStockBlock = <HTMLElement>$(`#${category}-stock`);
          const AllStockBlock = <HTMLElement>currentStockBlock?.nextElementSibling;

          currentStockBlock.textContent = String(categoryObj.stock);
          AllStockBlock.textContent = String(categoryObj.stock);
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
              <p>(<span class="current-stock" id="${company}-stock">1</span>/<span>20</span>)</p>
      </div>
  </div>
      `;

          this.companies.push({
            company: company,
            stock: 1,
          });
        } else {
          companyObj.stock += 1;

          const currentStockBlock = $(`#${company}-stock`);
          const AllStockBlock = <HTMLElement>currentStockBlock?.nextElementSibling;

          if (currentStockBlock !== null) {
            currentStockBlock.textContent = String(companyObj.stock);
            AllStockBlock.textContent = String(companyObj.stock);
          }
        }

        if (!this.prices.includes(price)) {
          this.prices.push(price);
        }
        if (!this.stocks.includes(stock)) {
          this.stocks.push(stock);
        }
      }
    );

    this.slider(blockPrice, 'price');
    this.slider(blockStock, 'stock');
    this.eventListeners();
  }

  slider(block: Element, type: string) {
    const sortArr =
      type === 'price'
        ? this.prices.sort((a: number, b: number) => a - b)
        : this.stocks.sort((a: number, b: number) => a - b);
    // const min = sortArr[0];
    const max = sortArr[sortArr.length - 1];

    block.innerHTML = `
    <div class="aside__title title-aside">${type}</div>
    <div class="aside__range">
        <div class="aside__range_min">${type === 'price' ? 0 + '$' : 0}</div>
        <div class="aside__range_separator"> ⟷ </div>
        <div class="aside__range_max">${type === 'price' ? max + '$' : max}</div>
    </div>
    <div class="range-slider slider__${type}">
        <input class="aside__input ${type}-max" step="1" type="range" min="0" max="${max}" value="${max}"></input>
        <input class="aside__input ${type}-min" step="1" type="range" min="0" max="${max}" value="0"></input>
    </div>
      `;
  }

  async render() {
    this.productsData = await api.load();

    if (this.queryParams.url.searchParams.toString() !== '') {
      if (!$('.center-content__items')) {
        this.renderProducts(this.productsData);
      }

      deleteAllAtriutes();
      const sortData = this.selectSortingMethod() as data;
      if (sortData.length) {
        this.changeStocks(sortData);
        this.renderOnlyGoods(sortData);
      }
    } else {
      this.productsData ? this.renderProducts(this.productsData) : console.log('no files');
    }
  }

  eventListeners() {
    const select = $('.filtres-center__sort');
    const blockProducts = $('.center-content__items') as HTMLElement;
    const asideCheckboxes = $('.aside__checkboxes');
    const inputSearch = $('.search__input') as HTMLInputElement;
    const buttonSave = $('.btns-aside__save') as HTMLButtonElement;
    const buttonReset = $('.btns-aside__reset') as HTMLButtonElement;
    const inputPriceMin = $('.price-min') as HTMLInputElement;
    const inputPriceMax = $('.price-max') as HTMLInputElement;
    const inputStockMin = $('.stock-min') as HTMLInputElement;
    const inputStockMax = $('.stock-max') as HTMLInputElement;
    const btnsView = $('.filtres-center__layouts');

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
          url.searchParams.delete('price');
          url.searchParams.delete('stock');
          server.route(e, url);
        }
      }
      checkAttribute(input);
    });

    select?.addEventListener('change', (e: Event) => {
      const currentSelect = e.target as HTMLOptionElement;

      const url = this.queryParams.createQueryParams(`${currentSelect.value}`);
      server.route(e, url);
    });

    blockProducts.addEventListener('click', (e) => {
      let block = e.target as HTMLLinkElement;
      block = block.parentElement as HTMLLinkElement;
      server.route(e, block.href);
    });

    buttonReset.addEventListener('click', (e) => {
      server.route(e, `${window.location.origin}${window.location.pathname}`);
    });

    buttonSave.addEventListener('click', () => {
      this.copyLink();
      changeTextHTML(buttonSave, 'Copied');
      setTimeout(changeTextHTML, 1000, buttonSave, 'Copy Filtres');
    });

    btnsView?.addEventListener('click', (e) => {
      const bttn = <HTMLElement>e.target;
      const url = bttn.classList.value.includes('grid')
        ? this.queryParams.createQueryParams('view=grid')
        : this.queryParams.createQueryParams('view=list');

      server.route(e, url);
    });

    inputSearch?.addEventListener('input', (e) => {
      const url = this.queryParams.createQueryParams(`search=${inputSearch.value}`);
      server.route(e, url);
    }),
      inputPriceMin?.addEventListener('change', (e) => {
        const url = this.queryParams.createQueryParams(`price=${inputPriceMin?.value}-${inputPriceMax.value}`);
        server.route(e, url);
      });
    inputPriceMax?.addEventListener('change', (e) => {
      const url = this.queryParams.createQueryParams(`price=${inputPriceMin?.value}-${inputPriceMax.value}`);
      server.route(e, url);
    });
    inputStockMin?.addEventListener('change', (e) => {
      const url = this.queryParams.createQueryParams(`stock=${inputStockMin?.value}-${inputStockMax.value}`);
      server.route(e, url);
    });
    inputStockMax?.addEventListener('change', (e) => {
      const url = this.queryParams.createQueryParams(`stock=${inputStockMin?.value}-${inputStockMax.value}`);
      server.route(e, url);
    });
    inputPriceMin?.addEventListener('input', () => {
      this.renderDualSlider('price', '0', '0', 'input');
    });
    inputPriceMax?.addEventListener('input', () => {
      this.renderDualSlider('price', '0', '0', 'input');
    });
    inputStockMin?.addEventListener('input', () => {
      this.renderDualSlider('stock', '0', '0', 'input');
    });
    inputStockMax?.addEventListener('input', () => {
      this.renderDualSlider('stock', '0', '0', 'input');
    });
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

  selectSortingMethod() {
    const params = this.queryParams.getQueryParams() as IArrayParams[];
    let productsData: data = this.productsData;

    if (params !== null) {
      params.forEach((element) => {
        const result: data = [];

        if (!this.arrParams.includes(element.name)) {
          return;
        }

        if (element.name === 'view') {
          this.switchViewProducts(element.value.join(''));
          return;
        }
        console.log(element);

        if (element.name === 'sort') {
          productsData =
            productsData.length > 0
              ? this.sortProducts(element.value.join(''), productsData)
              : this.sortProducts(element.value.join(''), this.productsData);
          return;
        }

        productsData.forEach((item) => {
          const key = element.name as keyof IDataObj;

          if (element.name === 'category' || element.name === 'company') {
            addAttribute(element.name, element.value, 'checked');

            for (const param of element.value) {
              if (param === item[key] && !result.includes(item)) {
                result.push(item);
              }
            }
            if (result.length === 0) {
              this.addNotFoundMessage();
            }
          }

          if (element.name === 'search') {
            for (const key in item) {
              const currentKey = key as keyof IDataObj;
              this.renderSearch(element.value.join(''));

              if (
                String(item[currentKey]).includes(element.value.join('')) &&
                !result.includes(item) &&
                currentKey !== 'description'
              ) {
                result.push(item);
              } else {
                this.addNotFoundMessage();
              }
            }
          } else {
            if (element.name === 'price' || element.name === 'stock') {
              const valueArr = element.value.join('').split('-');
              const min = valueArr[0];
              const max = valueArr[1];

              this.renderDualSlider(element.name, min, max); //for the slider at the selected price

              if (item[key] <= max && item[key] >= min && !result.includes(item)) {
                result.push(item);
              }
              if (result.length === 0) {
                this.addNotFoundMessage();
              }
            }
          }
          productsData = Array.from(result);
        });
      });

      return productsData;
    }
  }

  async copyLink() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Error in copying text: ', err);
    }
  }

  changeStocks(dat: data) {
    const data: data = dat.slice(0);

    if (!window.location.href.includes('price=')) {
      const sortPrices = data.sort((a, b) => a.price - b.price);
      const minPrice = String(sortPrices[0].price);
      const maxPrice = String(sortPrices[sortPrices.length - 1].price);
      this.renderDualSlider('price', minPrice, maxPrice);
    }
    if (!window.location.href.includes('stock=')) {
      const sortStocks = data.sort((a, b) => a.stock - b.stock);
      const minStock = String(sortStocks[0].stock);
      const maxStock = String(sortStocks[sortStocks.length - 1].stock);
      this.renderDualSlider('stock', minStock, maxStock);
    }
    const allCurrentSpans = $All('.current-stock');

    allCurrentSpans.forEach((item) => {
      const atribute = item.getAttribute('id')?.split('-')[0];
      const elementsFilter = data.filter((item) => item.category === atribute || item.company === atribute);
      item.textContent = String(elementsFilter.length);
    });
  }

  renderOnlyGoods(data: data) {
    const blockProducts = $('.center-content__items') as HTMLElement;
    const amountProductsBlock = $('.filtres-center__products') as HTMLElement;
    amountProductsBlock.textContent = `
        ${data.length} products found
    `;

    blockProducts.innerHTML = '';

    data.forEach(({ image, name, price, id }: { image: string[]; name: string; price: number; id: string }) => {
      let text = 'Add to cart';
      const arr = JSON.parse(localStorage.getItem('cart') as string);
      const arrId = arr.map((el: IDataObj) => el.id);
      if (arrId.includes(id)) {
        text = 'Remove from cart';
      }
      blockProducts.innerHTML += `
                <div class="items-center__product product">
                <div class="product__icon">
                  <a href="/product-detail_${id}"><img  src="${image[0]}" alt="product" class="product__img"></a>
                  <div class="product__footer">
                    <div class="footer-product__info info-product">
                      <div class="info-product__name">${name}</div>
                      <div class="info-product__price">$${price}</div>
                    </div>
                    <button class="footer-product__cart button">${text}</button>
                  </div>
                </div>
              </div>
            `;
      blockProducts.querySelectorAll('.button')?.forEach((el, index) =>
        el.addEventListener('click', function () {
          let arr = JSON.parse(localStorage.getItem('cart') as string);
          const arrId = arr.map((el: IDataObj) => el.id);
          if (!arrId.includes(data[index].id)) {
            arr.push(data[index]);
          } else {
            arr = arr.filter((el: IDataObj) => el.id != data[index].id);
          }
          localStorage.setItem(`cart`, JSON.stringify(arr));
          cartPage();
        })
      );
    });
  }

  renderDualSlider(name: string, min: string, max: string, event?: string) {
    const rangeContainer = $(`.aside__${name}`);
    if (rangeContainer !== null) {
      const asideMaxNumber = <HTMLElement>$('.aside__range_max', rangeContainer);
      const asideMinNumber = <HTMLElement>$('.aside__range_min', rangeContainer);
      const inputMin = $(`.${name}-min`) as HTMLInputElement;
      const inputMax = $(`.${name}-max`) as HTMLInputElement;

      if (event === 'input') {
        asideMaxNumber.textContent = inputMax.value;
        asideMinNumber.textContent = inputMin.value;
        return;
      }

      inputMin.value = min;
      inputMax.value = max;
      asideMaxNumber.textContent = name === 'price' ? max + '$' : max;
      asideMinNumber.textContent = name === 'price' ? min + '$' : min;
    }
  }

  renderSearch(value: string) {
    const inputSearch = <HTMLInputElement>$('.search__input');
    inputSearch.value = value;
  }

  switchViewProducts(method: string) {
    const productView = document.querySelector('.center-content__items') as HTMLElement;

    if (method === 'list') {
      productView.style.gridTemplateColumns = '2fr';
    } else {
      productView.style.gridTemplateColumns = '1fr 1fr 1fr';
    }
  }

  addNotFoundMessage() {
    const blockProducts = $('.center-content__items') as HTMLElement;
    blockProducts.innerHTML = `<h2>Products not found!</h2>`;
    const amountProductsBlock = $('.filtres-center__products') as HTMLElement;
    amountProductsBlock.textContent = `
                    0 products found
                `;
  }
}

export default Products;
