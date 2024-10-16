import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");

const storedCartItems = getLocalStorage("so-cart") || [];
if (storedCartItems.length > 0) {
    cart.renderCartContents(storedCartItems);  // Render items
    cart.calculateListTotal(storedCartItems);  // Calculate total
}

cart.init();

if (cart.total > 0) {
    document.querySelector(".list-footer").classList.remove("hide");
}
