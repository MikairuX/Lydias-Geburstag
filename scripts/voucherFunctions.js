/*import { loadFromStorage, vouchers } from "../data/vouchers.js"; //mein eigener Fehlgeschlagener versuch , weiter unten ist die Lösung von ChatGpT

const container = document.querySelector('.js-container');

loadFromStorage()

function generateVouchers() {
  let containerHTML = '';

  vouchers.forEach((voucher) => {
    containerHTML += `
      <div class="voucher-card js-voucher-card js-voucher-card-${voucher.name}
          ${voucher.quantity === 0 ? 'js-used-voucher-card' : ''}" 
           data-voucher-id="${voucher.name}">
        <div class="decor-top-left"></div>
        <div class="decor-bottom-right"></div>
        <div class="voucher-text">${voucher.name}</div>
        <div class="voucher-quantity">Übrige Gutscheine ${voucher.quantity}</div>
        <div class="validation-question js-validation-question" data-validation-id="${voucher.name}"> 
          Bist du sicher dass du den Gutschein einlösen willst? 
          <button class="js-yes-button" data-yes-button-id="${voucher.name}"> Ja </button>
          <button class="js-no-button" data-no-button-id="${voucher.name}"> Nein </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = containerHTML;

  
  document.querySelectorAll('.js-voucher-card').forEach((voucherCard) => {
    voucherCard.addEventListener('click', () => {
      const { voucherId } = voucherCard.dataset;
      const matchingVoucher = vouchers.find(voucher => voucher.name === voucherId);

      if (matchingVoucher) {
        let valid = askValidation(matchingVoucher)
        if (valid){
          if(matchingVoucher.quantity > 0){
                  matchingVoucher.quantity--
                  
                  generateVouchers()
                  saveToStorage()
                }

              }
        }
      
    });
  });
};

function saveToStorage(){
  localStorage.setItem('vouchers', JSON.stringify(vouchers));
};

generateVouchers();



function askValidation(matchingVoucher){

 let  matchigValidationQuestion;

  document.querySelectorAll('.js-validation-question').forEach((question)=>{
    const {validationId} = question.dataset
   
    if(validationId === matchingVoucher.name){

        matchigValidationQuestion = question;
        matchigValidationQuestion.classList.add('validation-question-visible')

    };
  
    
})
   findYesButton(matchingVoucher).addEventListener('click',()=>{
    return true
   });
   findNoButton(matchingVoucher).addEventListener('click',()=>{
    
    return false
   });;
};

function findYesButton(matchigVoucher){
  let matchingYesButton;
  document.querySelectorAll(`.js-yes-button`).forEach((button)=>{
    const {yesButtonId} = button.dataset;

    if(yesButtonId === matchigVoucher.name){
      matchingYesButton = button;
     console.log(matchingYesButton)
    };

   
 
  })
   return matchingYesButton;
};
function findNoButton(matchigVoucher){
  let matchingNoButton;
  document.querySelectorAll(`.js-no-button`).forEach((button)=>{
    const {noButtonId} = button.dataset;

    if(noButtonId === matchigVoucher.name){
      matchingNoButton = button;
     console.log(matchingNoButton)
    };

  
 
  })
    return matchingNoButton;
};*/ 

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
        <div class="validation-question js-validation-question" data-validation-id="${voucher.name}"> 
          Bist du sicher dass du den Gutschein einlösen willst? 
          <button class="js-yes-button" data-yes-button-id="${voucher.name}"> Ja </button>
          <button class="js-no-button" data-no-button-id="${voucher.name}"> Nein </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = containerHTML;

  document.querySelectorAll('.js-voucher-card').forEach((voucherCard) => {
    voucherCard.addEventListener('click', (e) => {
      const { voucherId } = voucherCard.dataset;
      const voucher = vouchers.find(v => v.name === voucherId);

      if (!voucher || voucher.quantity === 0) return;

      const validation = document.querySelector(`.js-validation-question[data-validation-id="${voucher.name}"]`);
      validation.classList.add('validation-question-visible');

      const yesButton = validation.querySelector(`.js-yes-button[data-yes-button-id="${voucher.name}"]`);
      const noButton = validation.querySelector(`.js-no-button[data-no-button-id="${voucher.name}"]`);

      yesButton.onclick = (event) => {
        event.stopPropagation(); // Prevent parent click
        voucher.quantity--;
        saveToStorage();
        generateVouchers();
      };

      noButton.onclick = (event) => {
        event.stopPropagation();
        validation.classList.remove('validation-question-visible');
      };
    });
  });
}

function saveToStorage() {
  localStorage.setItem('vouchers', JSON.stringify(vouchers));
}

generateVouchers();



