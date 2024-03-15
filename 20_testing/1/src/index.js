import { el, mount,setChildren } from 'redom';
import { createPayForm } from './assets/form.js';
import './main.scss';
import visa from './assets/img/visa.svg'
import mir from './assets/img/mir.svg'
import mastercard from './assets/img/mastercard.svg'

const valid = require('card-validator');
const validator = require('email-validator');

const container = el('div', { className: 'container pt-5' });
const headingFormPayPage = el('h1', 'Проверка карты', {
  className: 'mb-4 fs-1 fw-medium text-primary',
});
export const formCard = createPayForm();

const table = el('table',{
    className: 'table',
});
const thead = el('thead');
const trTb = el ('tr',{
    className: 'table-primary'
})
const thNumber = el('th','Номер карты',{
    scope: 'col',
});
const thEmail = el('th','Email',{
    scope: 'col',
});

const tbody = el('tbody');
setChildren(trTb,[thNumber,thEmail])
setChildren(thead,trTb)
setChildren(table,[thead,tbody])
mount(container, headingFormPayPage);
mount(container, formCard.form);
mount(container,table)
mount(window.document.body, container);
let imageElement;
let _isValid;

function createDataValidAtributeFalse(input) {
  input.setAttribute('data-valid', false);
  _isValid = input.dataset.valid;
}

function createDataValidAtributeTrue(input) {
  input.setAttribute('data-valid', true);
  _isValid = input.dataset.valid;
}

function showErrorMessage(errorMessage, input) {
  errorMessage.style.display = 'block';
  input.classList.add('is-invalid');
}

function hideErrorMessage(errorMessage, input) {
  errorMessage.style.display = 'none';
  input.classList.remove('is-invalid');
}

function createImageLogoPaySystem(srcImage) {
  imageElement = el('img', {
    className: 'img-fluid position-absolute',
    src: srcImage,
    style: {
        top: '-7px',
      right: '25px',
      width: '50px',
      borderRadius: '5px',
    },
  });
}

function getDataInput() {
  const cardNumberData = formCard.cardNumber.dataset.valid;
  const cardDateData = formCard.cardDate.dataset.valid;
  const cardCCVData = formCard.cardCCV.dataset.valid;
  const cardEmailData = formCard.cardEmail.dataset.valid;

  const isDisabled =
    cardNumberData !== 'true' ||
    cardDateData !== 'true' ||
    cardCCVData !== 'true' ||
    cardEmailData !== 'true';
  formCard.cardFormButton.disabled = isDisabled;
}

formCard.cardNumber.addEventListener('blur', () => {
  const numberValidation = valid.number(formCard.cardNumber.value);

  if (!numberValidation.isPotentiallyValid) {
    imageElement?.remove();
    showErrorMessage(formCard.cardNumberErrorMessage, formCard.cardNumber);
    createDataValidAtributeFalse(formCard.cardNumber);
    getDataInput();
  } else {
    imageElement?.remove();
    hideErrorMessage(formCard.cardNumberErrorMessage, formCard.cardNumber);
    createDataValidAtributeTrue(formCard.cardNumber);
    getDataInput();
  }

  if (numberValidation.card) {
    if (numberValidation.card.type === 'visa') {
      imageElement?.remove();
      createImageLogoPaySystem(visa);
      imageElement.style.top = 0;
      imageElement.style.height = '38px';
      mount(formCard.cardNumberDiv, imageElement);
    }
    if (numberValidation.card.type === 'mastercard') {
      imageElement?.remove();
      createImageLogoPaySystem(mastercard);
      imageElement.style.top = 0;
      imageElement.style.height = '38px';
      mount(formCard.cardNumberDiv, imageElement);
    }
    if (numberValidation.card.type === 'mir') {
      imageElement?.remove();
      createImageLogoPaySystem(mir);
      imageElement.style.top = 0;
      imageElement.style.height = '38px';
      mount(formCard.cardNumberDiv, imageElement);
    }
  }
});

formCard.cardDate.addEventListener('blur', () => {
  const cardDate = valid.expirationDate(
    formCard.cardDate.value
  );

  if (!cardDate.isPotentiallyValid) {
    showErrorMessage(
      formCard.cardDateErrorMessage,
      formCard.cardDate
    );
    createDataValidAtributeFalse(formCard.cardDate);
    getDataInput();
  } else {
    hideErrorMessage(
      formCard.cardDateErrorMessage,
      formCard.cardDate
    );
    createDataValidAtributeTrue(formCard.cardDate);
    getDataInput();
  }
});

formCard.cardCCV.addEventListener('blur', () => {
  const cardCCV = valid.cvv(formCard.cardCCV.value);

  if (!cardCCV.isValid) {
    showErrorMessage(formCard.cardCCVErrorMessage, formCard.cardCCV);
    createDataValidAtributeFalse(formCard.cardCCV);
    getDataInput();
  } else {
    hideErrorMessage(formCard.cardCCVErrorMessage, formCard.cardCCV);
    createDataValidAtributeTrue(formCard.cardCCV);
    getDataInput();
  }
});

formCard.cardEmail.addEventListener('blur', () => {
  const emailValid = validator.validate(formCard.cardEmail.value);

  if (emailValid !== true) {
    showErrorMessage(formCard.cardEmailErrorMessage, formCard.cardEmail);
    createDataValidAtributeFalse(formCard.cardEmail);
    getDataInput();
  } else {
    hideErrorMessage(formCard.cardEmailErrorMessage, formCard.cardEmail);
    createDataValidAtributeTrue(formCard.cardEmail);
    getDataInput();
  }
});


formCard.form.addEventListener('submit', e => {
  const trTh = el ('tr',{
    className: 'table-success'
})
const thNumberh = el('th',cardNumber.value,{
    scope: 'col',
});

const thEmailh = el('th',cardEmail.value,{
    scope: 'col',
});
setChildren(trTh,[thNumberh,thEmailh])
setChildren(tbody,trTh) 
e.preventDefault();
});
