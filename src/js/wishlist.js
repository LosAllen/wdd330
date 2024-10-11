import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function wishlistItemTemplate(item) {
    return `<li class="wishlist-card" data-id="${item.id}">
        <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" />
        <h2>${item.name}</h2>
        <p>Price: $${item.price}</p>
        <button class="move-to-cart" data-id="${item.id}">Move to Cart</button>
        <button class="remove-wishlist" data-id="${item.id}">Remove</button>
    </li>`;
}

function renderWishlist() {
    const wishlistContents = getLocalStorage("wishlist") || [];
    const wishlistContainer = document.querySelector(".wishlist-list");
    
    if (wishlistContents.length > 0) {
        const wishlistHTML = wishlistContents.map(wishlistItemTemplate).join('');
        wishlistContainer.innerHTML = wishlistHTML;

        // Add event listeners for buttons
        document.querySelectorAll(".move-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const itemId = event.target.dataset.id;
                moveToCart(itemId);
            });
        });

        document.querySelectorAll(".remove-wishlist").forEach(button => {
            button.addEventListener("click", (event) => {
                const itemId = event.target.dataset.id;
                removeFromWishlist(itemId);
            });
        });
    } else {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    }
}

function moveToCart(itemId) {
    const wishlistContents = getLocalStorage("wishlist") || [];
    const itemToMove = wishlistContents.find(item => item.id === itemId);
    
    if (itemToMove) {
        // Add item to cart logic here, e.g., using the same method you use in the cart.
        // For example:
        let cartContents = getLocalStorage("so-cart") || [];
        cartContents.push(itemToMove);
        setLocalStorage("so-cart", cartContents);

        // Remove from wishlist
        removeFromWishlist(itemId);
    }
}

function removeFromWishlist(itemId) {
    let wishlistContents = getLocalStorage("wishlist") || [];
    wishlistContents = wishlistContents.filter(item => item.id !== itemId); // Remove item by id
    setLocalStorage("wishlist", wishlistContents);
    renderWishlist(); // Re-render the wishlist
}

// Initialize wishlist on page load
document.addEventListener("DOMContentLoaded", renderWishlist);
