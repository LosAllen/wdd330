// Dynamically load header and footer from external HTML files
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
  });
  
  // Function to dynamically load the header
  function loadHeader() {
    fetch('/partials/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('dynamic-header').innerHTML = data;
      });
  }
  
  function loadFooter() {
    fetch('/partials/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('dynamic-footer').innerHTML = data;
      });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
  });
  
  
  // Function to retrieve the cart from localStorage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
  
// Ensure the function is defined
function updateCartCount() {
  const cart = getCart(); // Assuming getCart is a function that retrieves the cart
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((count, item) => count + item.quantity, 0);
  }
}

// Export the function
export { updateCartCount };

  
  // Call this to update cart count after page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
  