import { $, $All } from '../assets/utils/helpers';
import server from '../server';

class Popup {
  formPopup;
  inputName;
  inputPhone;
  inputAdress;
  inputEmail;
  inputCardNumber;
  inputCardData;
  inputCardCVV;
  inputsAll;

  constructor() {
    this.formPopup = <HTMLFormElement>$('.form__popup');
    this.inputName = <HTMLInputElement>$('.popup__name-input');
    this.inputPhone = <HTMLInputElement>$('.popup__phone-input');
    this.inputAdress = <HTMLInputElement>$('.popup__address-input');
    this.inputEmail = <HTMLInputElement>$('.popup__email-input');
    this.inputCardNumber = <HTMLInputElement>$('.card__number_input');
    this.inputCardData = <HTMLInputElement>$('.card__data_input');
    this.inputCardCVV = <HTMLInputElement>$('.card__code_input');
    this.inputsAll = $All('.popup__input');
  }

  openPopup() {
    const popup = <HTMLElement>$('.popup-wrapper');
    popup.classList.add('active');

    popup.addEventListener('click', (e) => {
      this.closePopup(e, popup);
    });

    this.eventListeners();
  }

  closePopup(e: Event, popup: HTMLElement) {
    const blockEvent = <HTMLElement>e.target;

    if (blockEvent.closest('.popup')) {
      return;
    }
    popup.classList.remove('active');
  }

  eventListeners() {
    this.formPopup.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkValids();

      if (this.lastCheckValid()) {
        this.addSuccessMessage();
        setTimeout(() => server.route(e, `${window.location.origin}/`), 4000);
      }
    });

    this.inputCardData.addEventListener('input', () => {
      this.addSlash();
    });

    this.inputCardNumber.addEventListener('input', () => {
      this.changeCardIcon();
    });
  }

  checkValids() {
    this.inputsAll.forEach((item) => {
      const input = <HTMLInputElement>item;

      if (input.value === '') {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    this.nameValidation(this.inputName.value)
      ? this.removeErrorMessage(this.inputName)
      : this.addErrorMessage(this.inputName);
    this.phoneValidation(this.inputPhone.value)
      ? this.removeErrorMessage(this.inputPhone)
      : this.addErrorMessage(this.inputPhone);
    this.adressValidation(this.inputAdress.value)
      ? this.removeErrorMessage(this.inputAdress)
      : this.addErrorMessage(this.inputAdress);
    this.emailValidation(this.inputEmail.value)
      ? this.removeErrorMessage(this.inputEmail)
      : this.addErrorMessage(this.inputEmail);
    this.cardNumberValidation(this.inputCardNumber.value)
      ? this.removeErrorMessage(this.inputCardNumber)
      : this.addErrorMessage(this.inputCardNumber);
    this.cardDataValidation(this.inputCardData.value)
      ? this.removeErrorMessage(this.inputCardData)
      : this.addErrorMessage(this.inputCardData);
    this.cardCvvValidation(this.inputCardCVV.value)
      ? this.removeErrorMessage(this.inputCardCVV)
      : this.addErrorMessage(this.inputCardCVV);
    console.log(window.location);
  }

  nameValidation(value: string) {
    const reg = /^[A-Za-z]+$/;
    const arr = value.split(' ');
    let result = true;

    if (arr.length < 2) {
      return false;
    }

    arr.forEach((item) => {
      if (item.length < 3 || !reg.test(item)) {
        result = false;
      }
    });

    return result;
  }

  phoneValidation(value: string) {
    const number = String(value);
    const reg = /^[+][0-9]+$/;

    if (!reg.test(value) || number.length <= 9) {
      return false;
    }
    return true;
  }

  adressValidation(value: string) {
    const arr = value.split(' ');
    let result = true;

    if (arr.length < 3) {
      return false;
    }

    arr.forEach((item) => {
      if (item.length < 5) {
        result = false;
      }
    });

    return result;
  }

  emailValidation(value: string) {
    const mail = /^[\w]{1}[\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i;
    return value.match(mail);
  }

  cardNumberValidation(value: string) {
    const number = String(value);
    const reg = /^[0-9]+$/;

    if (!reg.test(value) || number.length !== 16) {
      return false;
    }
    return true;
  }

  cardDataValidation(value: string) {
    const arrDate = String(value).split('/');
    const reg = /^[0-9]+$/;
    const month = arrDate[0];
    const day = arrDate[1];

    return (
      !reg.test(value) &&
      Number(month) <= 12 &&
      Number(month) > 0 &&
      Number(day) > 0 &&
      Number(day) <= 31 &&
      value.length === 5
    );
  }

  cardCvvValidation(value: string) {
    const number = String(value);
    const reg = /^[0-9]+$/;

    return reg.test(value) && number.length === 3;
  }

  addSlash() {
    if (this.inputCardData.value.length === 3 && !this.inputCardData.value.includes('/')) {
      this.inputCardData.value = this.inputCardData.value.slice(0, 2) + '/' + this.inputCardData.value.slice(2);
    }
  }

  changeCardIcon() {
    const icon = <HTMLImageElement>$('.card__form');

    switch (this.inputCardNumber.value[0]) {
      case '3':
        icon.src = './img/americ-express.svg';
        break;
      case '4':
        icon.src = './img/visa.png';
        break;
      case '5':
        icon.src = './img/mir.svg';
        break;
      default:
        icon.src = './img/no-logo.webp';
    }
  }

  addErrorMessage(block: HTMLElement) {
    const parent = <HTMLElement>block.parentNode;
    const mistake = $('.error-message', parent);

    if (mistake) {
      return;
    }

    block.classList.add('error');
    block.insertAdjacentHTML('afterend', `<span class="error-message">Error</span>`);
  }

  removeErrorMessage(block: HTMLElement) {
    const parent = <HTMLElement>block.parentNode;
    const mistake = $('.error-message', parent);

    block.classList.remove('error');

    if (mistake) {
      parent.removeChild(mistake);
    }
  }

  lastCheckValid() {
    console.log(this.inputsAll);
    console.log(Array.from(this.inputsAll).every((item) => item.classList.contains('error')));
    return Array.from(this.inputsAll).every((item) => !item.classList.contains('error'));
  }

  addSuccessMessage() {
    this.formPopup.innerHTML = `<h2 class="success-message">Сongratulations! Your order has been placed</h2>`;
  }
}
export default Popup;
