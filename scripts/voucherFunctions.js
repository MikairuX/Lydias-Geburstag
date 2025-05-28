import { loadFromStorage, vouchers } from "../data/vouchers.js";

const container = document.querySelector('.js-container');

loadFromStorage();

function generateVouchers() {
  let containerHTML = '';

  vouchers.forEach((voucher) => {
    containerHTML += `
      <div class="voucher-card js-voucher-card ${voucher.quantity === 0 ? 'js-used-voucher-card' : ''}" 
           data-voucher-id="${voucher.name}">
        <div class="decor-top-left"></div>
        <div class="decor-bottom-right"></div>
        <div class="voucher-text">${voucher.name}</div>
        <div class="voucher-quantity">Übrige Gutscheine ${voucher.quantity}</div>
        <div class="validation-question" data-voucher-id="${voucher.name}"> 
          Bist du sicher dass du den Gutschein einlösen willst? 
          <button class="js-yes-button" data-voucher-id="${voucher.name}"> Ja </button>
          <button class="js-no-button" data-voucher-id="${voucher.name}"> Nein </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = containerHTML;

  // Add click handler to each voucher card to show validation
  document.querySelectorAll('.js-voucher-card').forEach((voucherCard) => {
    voucherCard.addEventListener('click', () => {
      const { voucherId } = voucherCard.dataset;
      const matchingVoucher = vouchers.find(voucher => voucher.name === voucherId);
      if (matchingVoucher) {
        askValidation(matchingVoucher);
      }
    });
  });

  // YES button: confirm redemption
  document.querySelectorAll('.js-yes-button').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const voucherId = button.dataset.voucherId;
      const matchingVoucher = vouchers.find(v => v.name === voucherId);
      if (matchingVoucher && matchingVoucher.quantity > 0) {
        matchingVoucher.quantity--;
        saveToStorage();
        generateVouchers();
      }
    });
  });

  // NO button: cancel redemption
  document.querySelectorAll('.js-no-button').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const voucherId = button.dataset.voucherId;
      const validationDiv = document.querySelector(`.validation-question[data-voucher-id="${voucherId}"]`);
      if (validationDiv) {
        validationDiv.classList.remove('validation-question-visible');
      }
    });
  });
}

function askValidation(matchingVoucher) {
  const validationQuestion = document.querySelector(`.validation-question[data-voucher-id="${matchingVoucher.name}"]`);
  if (validationQuestion) {
    validationQuestion.classList.add('validation-question-visible');
  } else {
    console.warn(`Validierungselement für ${matchingVoucher.name} nicht gefunden.`);
  }
}

function saveToStorage() {
  localStorage.setItem('vouchers', JSON.stringify(vouchers));
}

generateVouchers();

localStorage.clear()