import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
import { updateCartCount } from './main.js'; // Import the updateCartCount function

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let cart = getLocalStorage('so-cart') || [];

  const existingProduct = cart.find(item => item.Id === product.Id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage('so-cart', cart);
  updateCartCount(); // Update the cart count after adding the item
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document.getElementById('addToCart').addEventListener('click', addToCartHandler);
