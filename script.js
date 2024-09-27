let cart = [];

// Load cart from localStorage if it exists
window.onload = () => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    } else {
        cart = []; // Ensure cart is initialized if no data exists
    }
};

function addToCart(itemName, itemPrice) {
    console.log("Adding item:", itemName, "Price:", itemPrice); // Debug log

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += itemPrice;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1, totalPrice: itemPrice });
    }

    console.log("Cart after adding:", cart); // Debug log

    // Save cart to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>No items in cart.</p>';
    } else {
        let total = 0;
        let cartHTML = '<ul>';
        cart.forEach((item, index) => {
            // Ensure totalPrice is a number and defined
            const itemTotalPrice = item.totalPrice ? item.totalPrice : 0;
            cartHTML += `<li>${item.name} x${item.quantity} - $${itemTotalPrice.toFixed(2)} <button onclick="removeItem(${index})">Remove</button></li>`;
            total += itemTotalPrice;
        });
        cartHTML += '</ul>';
        cartHTML += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
        cartHTML += '<button onclick="clearCart()">Clear Cart</button>';
        cartDiv.innerHTML = cartHTML;
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart)); // Update cart in localStorage
    updateCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem('shoppingCart', JSON.stringify(cart)); // Clear cart in localStorage
    updateCart();
}

function goToCartPage() {
    window.location.href = 'cart.html'; // Redirect to cart page
}
