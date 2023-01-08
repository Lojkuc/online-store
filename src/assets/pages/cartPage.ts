import { data } from '../utils/types';
const cart: data[] = [];
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
let blockWithCard = '';
const data: data = JSON.parse(localStorage.getItem('cart') as string).filter((el: string) => Boolean(el));
const tA = document.querySelector('.price') as HTMLElement;
const countProduct = document.querySelector('.counter-products') as HTMLElement;

function renderCart(): void {
  const totalAmount: number = data.reduce((sum: number, el) => el.price * el.count + sum, 0);
  let count: number = data.reduce((sum: number, el) => el.count + sum, 0);
  tA.innerHTML = `$${totalAmount}`;
  countProduct.innerHTML = `${count++}`;
  for (let i = 0; i < data.length; i++) {
    if (data[i] == null) continue;
    blockWithCard += `
            <div class="content__item">
              <img src="${data[i].image}" width="300" height="200"alt="">
              <h5>${data[i].name.toUpperCase()}</h5>
            </div>
            <div class="content__price">
              $${data[i].price}
            </div>
            <div class="content__quantity">
              <button class="counter_minus ${i}">-</button>
                ${data[i].count}
              <button class="counter_plus ${i}">+</button>
            </div>
            <div class="content__subtotal">
              $${(data[i].price * data[i].count).toFixed(2)}
            </div>
            <button class='delete__product ${i}'>REMOVE</i></button>
        `;
  }
}
if (localStorage.getItem('cart')) {
  renderCart();
}
document.onclick = (event) => {
  const target = event.target as Element;
  const index: number = +target.className.slice(-2).trim();
  const product = JSON.parse(localStorage.getItem('cart') as string);
  if (target.classList.contains('delete__product')) {
    delete product[index];
    localStorage.setItem(`cart`, JSON.stringify(product.filter((el: string) => Boolean(el))));
    location.reload();
  }
  if (target.classList.contains('counter_minus')) {
    product[index].count--;
    if (product[index].count == 0) {
      delete product[index];
    }
    localStorage.setItem(`cart`, JSON.stringify(product.filter((el: string) => Boolean(el))));
    location.reload();
  }
  if (target.classList.contains('counter_plus')) {
    product[index].count++;
    localStorage.setItem(`cart`, JSON.stringify(product.filter((el: string) => Boolean(el))));
    location.reload();
  }
};

const cartPage = `
<div class="history">
<div class="container">
<div class="navigation-main__block">
<h3>
  <a href="/">Home</a>
</h3>
<h3>/</h3>
<h3>
  <a href="/cart">Cart</a>
</h3>
</div>
</div>
</div>
<div class="container__cart">
<div class="container">
    <div class="content__inner">
        <h4>Item</h4>
        <h4>Price</h4>
        <h4>Quantity</h4>
        <h4>Subtotal</h4>
        <h5></h5>
        ${blockWithCard}
</div>
</div>
</div>

<div class= "popup-wrapper">
  <div class="popup">
  <form class="popup__container form__popup">
    <h2 class="popup__title">Personal details </h2>
    <div class="popup__person">
      <div class="popup__name popup__input-container">
        <input type="text" placeholder="Name" class="popup__name-input popup__input">
      </div>
      <div class="popup__phone popup__input-container">
        <input type="phone" placeholder="Phone" class="popup__phone-input popup__input">
      </div>
      <div class="popup__address popup__input-container">
        <input type="text" placeholder="Address" class="popup__address-input popup__input">
      </div>
      <div class="popup__email popup__input-container">
        <input type="text" placeholder="E-mail" class="popup__email-input popup__input">
      </div>
    </div>
    <div class="popup__card">
      <div class="card__container">
        <h2 class="popup__title">Card details</h2>
        <img src="./img/no-logo.webp" alt="card form" class="card__form">
        <div class="card__number">
          <input type="text" placeholder="Card number" class="card__number_input popup__input">
        </div>
        <div class="card__data">
          <input maxlength="5" type="text" placeholder="Month/Year" class="card__data_input popup__input">
        </div>
        <div class="card__code">
          <input type="text" placeholder="CVV" class="card__code_input popup__input">
        </div>
      </div>
    </div>
    <button class="popup__button button">Confirm</button>
  </form>
  </div>
</div>
`;
export default cartPage;
