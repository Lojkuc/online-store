const cartPageEmpty = `
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
  <h1>Your cart is empty</h1>
  <a href="/products" onclick="route(event)" class="button-home">Fill it</a>
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
export default cartPageEmpty;
