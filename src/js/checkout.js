import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
const storedCartItems = getLocalStorage("so-cart") || [];
if (storedCartItems.length > 0) {
    cart.calculateListTotal(storedCartItems);  // Calculate total
}

cart.updateCartTotalDisplay();  // Directly display the total after calculation

cart.init();
