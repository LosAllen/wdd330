import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty!</p>';
    updateCartTotal(0);
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.id;
      removeFromCart(productId);
    });
  });

  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `
    <li class='cart-card divider'>
      <a href='#' class='cart-card__image'>
        <img src='${item.Image}' alt='${item.Name}' />
      </a>
      <a href='#'>
        <h2 class='card__name'>${item.Name}</h2>
      </a>
      <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
      <p class='cart-card__quantity'>qty: ${item.quantity}</p>
      <p class='cart-card__price'>$${item.FinalPrice}</p>
      <button class='remove-item-btn' data-id='${item.Id}'>Remove</button>
    </li>`;
  
  return newItem;
}

function removeFromCart(productId) {
  let cartItems = getLocalStorage('so-cart');
  cartItems = cartItems.filter(item => item.Id !== productId);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

function updateCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.quantity), 0);
  document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

renderCartContents();
