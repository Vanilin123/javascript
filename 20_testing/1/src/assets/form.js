import { el, setChildren } from "redom";
import Inputmask from "inputmask";

export function createPayForm() {
  const form = el("form", {
    className: "form d-flex flex-column",
    action: "POST",
  });

  const cardNumberDiv = el("div", {
    className: "position-relative",
  });

  const cardDateDiv = el("div", {
    className: "position-relative",
  });

  const cardCCVDiv = el("div", {
    className: "position-relative",
  });

  const cardEmailDiv = el("div", {
    className: "position-relative",
  });
  const cardNumber = el("input", {
    className: "form-control mb-4 position-reletive",
    id: "cardNumber",
    placeholder: "Номер карты",
    "data-valid": "false",
    required: true,
  });

  const cardNumberErrorMessage = el(
    "p",
    "Введите номер карты в нужном формате",
    {
      className: "position-absolute text-danger",
      style: { top: "-25px", display: "none" },
    },
  );

  const cardDate = el("input", {
    className: "form-control card-number-input mb-4 position-reletive",
    id: "cardDate",
    placeholder: "Дата",
    "data-valid": "false",
    required: true,
  });

  const cardDateErrorMessage = el("p", "Введите дату в нужном формате", {
    className: "position-absolute text-danger",
    style: { top: "-25px", display: "none" },
  });

  const cardCCV = el("input", {
    className: "form-control card-number-input mb-4 position-reletive",
    id: "cardCCV",
    placeholder: "CCV",
    "data-valid": "false",
    required: true,
  });

  const cardCCVErrorMessage = el("p", "Введите CCV в нужном формате", {
    className: "position-absolute text-danger",
    style: { top: "-25px", display: "none" },
  });

  const cardEmail = el("input", {
    className: "form-control card-number-input mb-4 position-reletive",
    id: "cardEmail",
    placeholder: "Email",
    "data-valid": "false",
    required: true,
  });

  const cardEmailErrorMessage = el("p", "Введите email в нужном формате", {
    className: "position-absolute text-danger",
    style: { top: "-25px", display: "none" },
  });

  const cardFormButton = el("button", "Проверить", {
    className: "btn btn-primary w-25 mb-3",
    disabled: "true",
  });
  setChildren(cardNumberDiv, [cardNumberErrorMessage, cardNumber]);
  setChildren(cardDateDiv, [cardDateErrorMessage, cardDate]);
  setChildren(cardCCVDiv, [cardCCVErrorMessage, cardCCV]);
  setChildren(cardEmailDiv, [cardEmailErrorMessage, cardEmail]);

  setChildren(form, [
    cardNumberDiv,
    cardDateDiv,
    cardCCVDiv,
    cardEmailDiv,
    cardFormButton,
  ]);
  const masknumberCard = Inputmask("9999 9999 9999 9999 [99]");
  masknumberCard.mask(cardNumber);

  const maskExpirationDate = Inputmask("99/99");
  maskExpirationDate.mask(cardDate);

  const maskNumberCvcCvv = Inputmask("999");
  maskNumberCvcCvv.mask(cardCCV);

  const maskEmail = Inputmask({
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    greedy: false,
    onBeforePaste(pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      "*": {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        casing: "lower",
      },
    },
  });
  maskEmail.mask(cardEmail);

  return {
    form,
    cardNumberDiv,
    cardEmailDiv,
    cardDateDiv,
    cardCCVDiv,
    cardNumber,
    cardNumberErrorMessage,
    cardDate,
    cardDateErrorMessage,
    cardCCV,
    cardCCVErrorMessage,
    cardEmail,
    cardEmailErrorMessage,
    cardFormButton,
  };
}
