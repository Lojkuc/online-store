const productsPage = `
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
                   <div class="aside__checkboxes">
                        <div class="aside__categories">
                            <div class="categories-aside__title title-aside">Category</div>
                            <div class="categories-aside__list">
                            </div>
                        </div>
                        <div class="aside__companies">
                            <div class="companies-aside__title title-aside">Companies</div>
                            <div class="companies-aside__list">
                            </div>
                        </div>
                   </div>
                    <div class="aside__price">
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
                                <option value="disabled">Choose sort category</option>
                                <option id="price" value="sort=price-low">Price (lowest)</option>
                                <option id="price"  value="sort=price-high">Price (highest)</option>
                                <option id="name"  value="sort=name-high">Name (A-Z)</option>
                                <option id="name"  value="sort=name-low">Name (Z-A)</option>
                            </select>
                        </form>
                    </div>
                    <div class="center-content__items items-center">
                    </div>
            </div>
        </div>
    </div>
</main>
`;
export default productsPage;
