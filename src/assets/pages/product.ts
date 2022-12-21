const product = `
<main class="main">
<div class="main__navigation">
  <div class="container">
    <div class="navigation-main__block">
      <h3>
        <a href="/">Home</a>
      </h3>
      <h3>/</h3>
      <h3>
        <a href="/product">Products</a>
      </h3>
    </div>
  </div>
</div>
<div class="main__center">
  <div class="container">
    <div class="main-center__content">
      <aside class="content__aside">
        <div class="aside__search">
          <input class="search__input" placeholder="Search" type="text">
        </div>
        <div class="aside__btns">
          <button class="btns-aside__reset button">Reset Filters</button>
          <button class="btns-aside__save button">Save Filters</button>
        </div>
        <div class="aside__categories">
          <div class="categories-aside__title title-aside">Category</div>
          <div class="categories-aside__list">
            <div class="categories-aside__item">
              <div class="item__input-container">
                <label for="office">
                  <input id="office" type="checkbox">
                  <span class="item__input-fake"></span>
                  office</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="categories-aside__item">
              <div class="item__input-container">
                <label for="living room">
                  <input id="living room" type="checkbox">
                  <span class="item__input-fake"></span>
                  living room</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="categories-aside__item">
              <div class="item__input-container">
                <label for="kitchen">
                  <input id="kitchen" type="checkbox">
                  <span class="item__input-fake"></span>
                  kitchen</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="categories-aside__item">
              <div class="item__input-container">
                <label for="bedroom">
                  <input id="bedroom" type="checkbox">
                  <span class="item__input-fake"></span>
                  bedroom</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="categories-aside__item">
              <div class="item__input-container">
                <label for="dining">
                  <input id="dining" type="checkbox">
                  <span class="item__input-fake"></span>
                  dining</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="categories-aside__item">
              <div class="item__input-container">
                <label for="kids">
                  <input id="kids" type="checkbox">
                  <span class="item__input-fake"></span>
                  kids</label>
              </div>
              <span>(3/5)</span>
            </div>
          </div>
        </div>
        <div class="aside__companies">
          <div class="companies-aside__title title-aside">Companies</div>
          <div class="companies-aside__list">
            <div class="companies-aside__item">
              <div class="item__input-container">
                <label for="marcos">
                  <input id="marcos" type="checkbox">
                  <span class="item__input-fake"></span>
                  marcos</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="companies-aside__item">
              <div class="item__input-container">
                <label for="liddy">
                  <input id="liddy" type="checkbox">
                  <span class="item__input-fake"></span>
                  liddy</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class=" companies-aside__item">
              <div class="item__input-container">
                <label for="ikea">
                  <input id="ikea" type="checkbox">
                  <span class="item__input-fake"></span>
                  ikea</label>
              </div>
              <span>(3/5)</span>
            </div>
            <div class="companies-aside__item">
              <div class="item__input-container">
                <label for="caressa">
                  <input id="caressa" type="checkbox">
                  <span class="item__input-fake"></span>
                  caressa</label>
              </div>
              <span>(3/5)</span>
            </div>
          </div>
        </div>
        <div class="aside__price">
          <div class="aside__title title-aside">Price</div>
          <div class="aside__range">
            <div class="aside__range_min">100$</div>
            <div class="aside__range_separator"> ⟷ </div>
            <div class="aside__range_max">300$</div>
          </div>
          <div class="range-slider">
            <input class="aside__input" type="range" min="0" max="10" value="10"></input>
            <input class="aside__input" type="range" min="0" max="10" value="0"></input>
          </div>
        </div>
        <div class="aside__stock">
          <div class="aside__title title-aside">Stock</div>
          <div class="aside__range">
            <div class="aside__range_min">1</div>
            <div class="aside__range_separator"> ⟷ </div>
            <div class="aside__range_max">5</div>
          </div>
          <div class="range-slider">
            <input class="aside__input" type="range" min="0" max="10" value="10"></input>
            <input class="aside__input" type="range" min="0" max="10" value="0"></input>
          </div>
        </div>
      </aside>
      <section class="content__center">
        <div class="center-content__filtres filtres-center">
          <div class="filtres-center__layouts">
            <button class="layouts__grid">
              <img class="layouts__grid-img" src="./img/grid-fill.svg" alt="grid layout">
            </button>
            <button class="layouts__list">
              <img class="layouts__list-img" src="./img/list.svg" alt="list layout">
            </button>
          </div>
          <p class="filtres-center__products">
            23 products found
          </p>
          <hr>
          <form class="filtres-center__sort">
            <label for="sort">Sort by</label>
            <select class="sort__select" name="sort" id="sort">
              <option disabled>Choose sort category</option>
              <option value="price-lowest">Price (lowest)</option>
              <option value="price-highest">Price (highest)</option>
              <option value="name-a">Name (A-Z)</option>
              <option value="name-z">Name (Z-A)</option>
            </select>
          </form>
        </div>
        <div class="center-content__items items-center">
          <div class="items-center__product product">
            <div class="product__icon">
              <a href="/product1" onclick="route(event)"><img  src="./img/product1.jpg" alt="product" class="product__img"href="/product1" onclick="route(event)"></a>
              <div class="product__footer">
                <div class="footer-product__info info-product">
                  <div class="info-product__name">Modern Poster</div>
                  <div class="info-product__price">$30.99</div>
                </div>

                <button class="footer-product__cart button">Add to cart</button>

              </div>
            </div>
          </div>
          <div class="items-center__product product">
            <div class="product__icon">
              <img src="./img/product1.jpg" alt="product" class="product__img">
              <div class="product__footer">
                <div class="footer-product__info info-product">
                  <div class="info-product__name">Modern Poster</div>
                  <div class="info-product__price">$30.99</div>
                </div>
                <button class="footer-product__cart button">Add to cart</button>
              </div>
            </div>
          </div>
          <div class="items-center__product product">
            <div class="product__icon">
              <img src="./img/product1.jpg" alt="product" class="product__img">
              <div class="product__footer">
                <div class="footer-product__info info-product">
                  <div class="info-product__name">Modern Poster</div>
                  <div class="info-product__price">$30.99</div>
                </div>
                <button class="footer-product__cart button">Add to cart</button>
              </div>
            </div>
          </div>
          <div class="items-center__product product">
            <div class="product__icon">
              <img src="./img/product1.jpg" alt="product" class="product__img">
              <div class="product__footer">
                <div class="footer-product__info info-product">
                  <div class="info-product__name">Modern Poster</div>
                  <div class="info-product__price">$30.99</div>
                </div>
                <button class="footer-product__cart button">Add to cart</button>
              </div>
            </div>
          </div>
          <div class="items-center__product product">
            <div class="product__icon">
              <img src="./img/product1.jpg" alt="product" class="product__img">
              <div class="product__footer">
                <div class="footer-product__info info-product">
                  <div class="info-product__name">Modern Poster</div>
                  <div class="info-product__price">$30.99</div>
                </div>
                <button class="footer-product__cart button">Add to cart</button>
              </div>
            </div>
          </div>
          <div class="items-center__product product">
            <div class="product__icon">
              <img src="./img/product1.jpg" alt="product" class="product__img">
              <div class="product__footer">
                <div class="footer-product__info info-product">
                  <div class="info-product__name">Modern Poster</div>
                  <div class="info-product__price">$30.99</div>
                </div>
                <button class="footer-product__cart button">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
</main>
`;
export default product;
