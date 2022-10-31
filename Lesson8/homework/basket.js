'use strict';

const basketCountEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotalValue');
const basketTotal = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');
const cartIconEl = document.querySelector('.cartIconWrap');

cartIconEl.addEventListener('click',()=>{
    basketEl.classList.toggle('hidden');
})

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', (event)=>{
    if(! (event.target.classList.contains('addToCart') || event.target.tagName =="IMG" && event.target.parentElement.classList.contains('addToCart'))){
        return;
    }
    const fi = event.target.closest('.featuredItem');
    const id = +fi.dataset.id;
    const name = fi.dataset.name;
    const price = +fi.dataset.price;
    addToCart(id, name, price);
})

function addToCart(id, name, price){

        if(!(id in basket)){
            basket[id] = {
                id: id, 
                name: name, 
                price: price, 
                count: 0};
        };

        basket[id].count++;   
        basketCountEl.textContent = getTotal();
        basketTotalEl.textContent = getTotalPrice().toFixed(2);
        renderNewProduct(id);
}

function getTotal(){
    //return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
    const productArr = Object.values(basket);
    let total = 0;
    for(const product of productArr){
        total += product.count;
    }
    return total;
}

function getTotalPrice(){
    const productArr = Object.values(basket);
    let total = 0;
    for(const product of productArr){
        total += product.price*product.count;
    }
    return total;
}

function renderNewProduct(id){
    renderNewProductInBasket(id);
}

function renderNewProduct(productId) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
      return;
    }
    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl.querySelector('.productTotalRow').textContent = (product.price * product.count).toFixed(2);
  }

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
      basketTotal.insertAdjacentHTML("beforebegin", productRow);
  }