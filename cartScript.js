window.onload = () => {
    const cartDetailsDiv = document.getElementById('cartDetails');
    const storedCart = localStorage.getItem('shoppingCart');
    let cartHTML = '';

    if (storedCart) {
        const cart = JSON.parse(storedCart);
        let total = 0;

        if (cart.length === 0) {
            cartHTML = '<p>No items in your cart.</p>';
        } else {
            cartHTML = '<ul>';
            cart.forEach((item, index) => {
                cartHTML += `<li>${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)} <button onclick="removeItem(${index})">Remove</button></li>`;
                total += item.totalPrice;
            });
            cartHTML += '</ul>';
            cartHTML += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
            cartHTML += '<button onclick="clearCart()">Clear Cart</button>';
        }
    } else {
        cartHTML = '<p>No items in your cart.</p>';
    }

    cartDetailsDiv.innerHTML = cartHTML;
};

function removeItem(index) {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        const cart = JSON.parse(storedCart);
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        window.location.reload(); // Reload the page to update the cart
    }
}

function clearCart() {
    localStorage.setItem('shoppingCart', JSON.stringify([])); // Clear cart in localStorage
    window.location.reload(); // Reload the page to update the cart
}

function goBack() {
    window.location.href = 'index.html'; // Redirect back to the shopping list
}

window.addEventListener('load', () => {
    const cartDetailsDiv = document.getElementById('cartDetails');
    const storedCart = localStorage.getItem('shoppingCart');
    let cartHTML = '';

    if (storedCart) {
        const cart = JSON.parse(storedCart);
        let total = 0;

        if (cart.length === 0) {
            cartHTML = '<p>No items in your cart.</p>';
        } else {
            cartHTML = '<ul>';
            cart.forEach((item, index) => {
                cartHTML += `<li>${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)} <button onclick="removeItem(${index})">Remove</button></li>`;
                total += item.totalPrice;
            });
            cartHTML += '</ul>';
            cartHTML += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
            cartHTML += '<button onclick="clearCart()">Clear Cart</button>';
        }
    } else {
        cartHTML = '<p>No items in your cart.</p>';
    }

    cartDetailsDiv.innerHTML = cartHTML;
});
