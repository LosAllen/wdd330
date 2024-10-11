import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  if (!item.id || !item.name || typeof item.price === "undefined") {
    return "";  // Skip rendering if essential properties are missing
  }

  const imageUrl = item.image || "https://via.placeholder.com/150";  // Fallback image URL
  const itemSubtotal = item.price * item.quantity;  // Calculate subtotal for the item

  return `<li class="cart-card divider" data-id="${item.id}">
    <a href="#" class="cart-card__image">
      <img src="${imageUrl}" alt="${item.name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.name}</h2>
    </a>
    <p class="cart-card__color">${item.color || "No color specified"}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">Price: $${item.price}</p>
    <p class="cart-card__subtotal">Subtotal: $${itemSubtotal.toFixed(2)}</p>
    <button class="remove-item" data-id="${item.id}">Remove</button>
    <button class="move-to-wishlist" data-id="${item.id}">Move to Wishlist</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key) || [];
    this.calculateListTotal(list);
    this.renderCartContents(list);

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        this.removeItem(itemId);
      });
    });

    // Add event listeners for move-to-wishlist buttons
    document.querySelectorAll(".move-to-wishlist").forEach(button => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        this.moveToWishlist(itemId);
      });
    });
  }

  moveToWishlist(itemId) {
    let cartContents = getLocalStorage(this.key) || [];
    const itemToMove = cartContents.find(item => item.id === itemId);

    if (itemToMove) {
      this.removeItem(itemId);  // Remove from cart
      this.addToWishlist(itemToMove);  // Add to wishlist
    }
  }

  addToWishlist(product) {
    let wishlistContents = getLocalStorage("wishlist") || [];
    const existingProduct = wishlistContents.find(item => item.id === product.id);

    if (!existingProduct) {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "https://via.placeholder.com/150"
      };
      wishlistContents.push(wishlistItem);
      setLocalStorage("wishlist", wishlistContents);
      console.log("Product added to wishlist:", wishlistItem);
    }
  }

  addToCart(item) {
    const cartItems = getLocalStorage(this.key) || [];
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      cartItems.push(item);
    }

    setLocalStorage(this.key, cartItems);
    this.calculateListTotal(cartItems);
    this.updateCartTotalDisplay();
  }

  removeItem(itemId) {
    let cartContents = getLocalStorage(this.key) || [];
    cartContents = cartContents.filter(item => item.id !== itemId);  // Remove item by id
    setLocalStorage(this.key, cartContents);
    this.renderCartContents(cartContents);  // Re-render cart after removal
    this.calculateListTotal(cartContents);  // Update total
  }

  calculateListTotal(list) {
    this.total = list.reduce((sum, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;
      return sum + (itemPrice * itemQuantity);
    }, 0);
  
    this.updateCartTotalDisplay();
    console.log("Calculated total:", this.total);  // Debug log
  }

  renderCartContents(list) {
    const container = document.querySelector(this.parentSelector);
    
    if (!container) {
      console.error(`Container with selector '${this.parentSelector}' not found.`);
      return;
    }
    
    const cartContent = list.map(cartItemTemplate).join('');
    container.innerHTML = cartContent;

    // Re-bind remove item events after re-rendering
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        this.removeItem(itemId);
      });
    });

    // Re-bind move to wishlist events
    document.querySelectorAll(".move-to-wishlist").forEach(button => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        this.moveToWishlist(itemId);
      });
    });
  }

  updateCartTotalDisplay() {
    console.log("Checkout total display updated:", this.total);  // Log confirmation
    const totalDisplayElements = document.querySelectorAll(".cart-total");
    totalDisplayElements.forEach(element => {
      element.textContent = `Total: $${this.total.toFixed(2)}`;
    });
  }  
}
