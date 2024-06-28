const container = document.querySelector(".container");
const minus = document.querySelector(".minus-box");
const amount = document.getElementById("amount");
const plus = document.querySelector(".plus-box");
const stock = document.querySelector(".stock");
const checkoutBtn = document.querySelector(".gift");
const promoBox = document.querySelector(".promo-box");
const promoInput = document.getElementById("promo");
const sendPromoBtn = document.querySelector(".send-promo");
const promoApplied = document.querySelector(".applied");

const vat = document.querySelector(".VAT");
const nok = document.querySelector(".NOK");

let vatValueDefault = 879;
let nokValueDefault = 4395;

let free = false;

plus.addEventListener("click",()=>{
    if(amount.value<10){
        amount.value ++;
        if(amount.value !== 0 && free === false){
            vat.innerHTML = `${vatValueDefault*amount.value},-`;
            nok.innerHTML = `${nokValueDefault*amount.value},-`;
        }
    }
    if(amount.value == 10){
        stock.style.backgroundColor ="#BE3144";
        stock.innerHTML = "out of stock";
    }
})

minus.addEventListener("click",()=>{
    if(amount.value>0){
        amount.value --;
        if(amount.value !== 0 && free === false){
            vat.innerHTML = `${vatValueDefault*amount.value},-`;
            nok.innerHTML = `${nokValueDefault*amount.value},-`;
        }
    }
    stock.style.backgroundColor = "#83bd46";
    stock.innerHTML = "In stock";
})

checkoutBtn.addEventListener("click", ()=>{
    if(!promoInput.classList.contains("applied")){
        container.style.opacity = ".5";
        container.style.pointerEvents = "none";
        promoBox.style.opacity = "1";
        promoBox.style.display = "flex";
    }
})
sendPromoBtn.addEventListener("click",()=>{
    if(promoInput.value.length >=1){
        container.style.opacity = "1";
        container.style.pointerEvents = "auto";
        promoBox.style.opacity = "0";
        promoBox.style.display = "none";
        promoInput.classList.add("applied");
        promoApplied.style.opacity = "1";
        promoApplied.style.display = "block"
        vat.innerHTML = `It's free for you`;
        nok.innerHTML = `It's free for you`;
        free = true;
    }
})