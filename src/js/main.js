// Dynamically load header and footer from external HTML files
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
  });
  
  // Function to dynamically load the header
  function loadHeader() {
    const headerElement = document.getElementById('dynamic-header');
    if (headerElement) {
      fetch('/partials/header.html')
        .then(response => response.text())
        .then(data => {
          headerElement.innerHTML = data;
        })
        .catch(error => {
          console.error('Error loading header:', error); // Allow the console for error handling
        });
    }
  }
  
  // Function to dynamically load the footer
  function loadFooter() {
    const footerElement = document.getElementById('dynamic-footer');
    if (footerElement) {
      fetch('/partials/footer.html')
        .then(response => response.text())
        .then(data => {
          footerElement.innerHTML = data;
        })
        .catch(error => {
          console.error('Error loading footer:', error); // Allow the console for error handling
        });
    }
  }
  
  // Function to retrieve the cart from localStorage
  function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  
  // Function to update cart icon count (for display in header)
  function updateCartCount() {
    const cart = getCart();
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    }
  }
  
  // Call this to update cart count after page load
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
  });
  