import { data } from '../utils/types';
export const cartPage = () => {
  const cart: data[] = [];
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  let blockWithCard = '';
  let blockWithTotalPrice = '';
  let data: data = JSON.parse(localStorage.getItem('cart') as string).filter((el: string) => Boolean(el));
  const price = document.querySelector('.price') as HTMLElement;
  const countProduct = document.querySelector('.counter-products') as HTMLElement;
  const getTotal = () => {
    const totalAmount: number = data.reduce((sum: number, el) => el.price * el.count + sum, 0);
    let count: number = data.reduce((sum: number, el) => el.count + sum, 0);
    price.innerHTML = `$${totalAmount}`;
    countProduct.innerHTML = `${count++}`;
    blockWithTotalPrice += ` <div class="block_buy">
    <div class="block_price">
        <h1>Total</h1>
        <h2 class="total__price">$${totalAmount}</h2>
    </div>
    <div class="block_count">
    <h2 class="total__count">${--count}</h2>
        <h1>items</h1>
    </div>
    <div class="block__submit">
        <button class="buy__submit">SUBMIT</button>
    </div>
  </div>`;
  };
  function renderCart(): void {
    getTotal();
    for (let i = 0; i < data.length; i++) {
      if (data[i] == null) continue;
      blockWithCard += `
        <div class="content__inner cart__product">
            <div class="content__item">
              <img src="${data[i].image}" width="300" height="200"alt="">
              <h5>${data[i].name.toUpperCase()}</h5>
            </div>
            <div class="content__price">
              $${data[i].price}
            </div>
            <div class="content__quantity">
              <button class="counter_minus" data-id="${data[i].id}">-</button>
                ${data[i].count}
              <button class="counter_plus" data-id="${data[i].id}">+</button>
            </div>
            <div class="content__subtotal">
              $${data[i].price * data[i].count}
            </div>
            <button class="delete__product" data-id="${data[i].id}">REMOVE</i></button>
            </div>
            
        `;
    }
  }
  if (localStorage.getItem('cart')) {
    renderCart();
  }
  document.onclick = (event) => {
    const target = event.target as HTMLElement;
    const id = target.dataset.id as string;
    const product = JSON.parse(localStorage.getItem('cart') as string);
    const index = product.findIndex((n: { id: string }) => n.id === id);
    const updateTotal = () => {
      data = product;
      getTotal();
    };
    const deleteItem = (isMinus: boolean) => {
      product.splice(index, 1);
      localStorage.setItem(`cart`, JSON.stringify(product));
      const cartProduct = isMinus ? target.parentElement?.parentElement : target.parentElement;
      cartProduct?.remove();
      if (!product.length) {
        location.reload();
      }
      updateTotal();
    };
    const changeCount = (isMinus: boolean) => {
      if (product[index].stock == 1 && !isMinus) {
        alert('Товар закончился');
        return;
      }
      if (isMinus && product[index].count == 1) {
        deleteItem(true);
      } else {
        if (isMinus && product[index].count) {
          product[index].count--;
          product[index].stock++;
        } else {
          product[index].count++;
          product[index].stock--;
        }
        const counter = isMinus ? <Element>target.nextSibling : <Element>target.previousSibling;
        counter.textContent = ` ${product[index].count} `;
        const cartProduct = <HTMLElement>target.parentElement?.parentElement;
        const cartProductSubtotal = <HTMLElement>cartProduct.querySelector('.content__subtotal');
        const subtotal = `$${(product[index].price as number) * (product[index].count as number)}`;
        cartProductSubtotal.textContent = subtotal;
      }
      localStorage.setItem(`cart`, JSON.stringify(product.filter((el: string) => Boolean(el))));
      updateTotal();
    };
    if (target.classList.contains('delete__product')) deleteItem(false);
    if (target.classList.contains('counter_minus')) changeCount(true);
    if (target.classList.contains('counter_plus')) changeCount(false);
  };
  return ` <div class="history">
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
  </div>
  ${blockWithCard}
  ${blockWithTotalPrice}
</div>
</div>
`;
};
