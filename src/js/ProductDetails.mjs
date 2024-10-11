import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> 
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      <button id="addToWishlist">Add to Wishlist</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    console.log("Initializing ProductDetails...");
    document.addEventListener("DOMContentLoaded", async () => {
      try {
        this.product = await this.dataSource.findProductById(this.productId);
        console.log("Product fetched:", this.product);
        const productContainer = document.querySelector(".product-detail");

        if (productContainer) {
          productContainer.innerHTML = productDetailsTemplate(this.product);
          console.log("Product details inserted into container.");

          const addToCartButton = document.getElementById("addToCart");
          if (addToCartButton) {
            addToCartButton.addEventListener("click", () => {
              this.addToCart(this.product);
              alert("Item added to cart!");
            });
          } else {
            console.error("Add to Cart button not found.");
          }

          const addToWishlistButton = document.getElementById("addToWishlist");
          if (addToWishlistButton) {
            addToWishlistButton.addEventListener("click", () => {
              this.addToWishlist(this.product);
              alert("Item added to wishlist!");
            });
          } else {
            console.error("Add to Wishlist button not found.");
          }
        } else {
          console.error("Product detail container not found in the DOM.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    });
  }

  addToCart(product) {
    let cartContents = getLocalStorage("so-cart") || [];
    const existingProduct = cartContents.find(item => item.id === product.Id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const cartItem = {
        id: product.Id,
        name: product.Name || "Unnamed Product",
        price: product.FinalPrice || 0,
        quantity: 1,
        image: product.Images.PrimaryMedium || "https://via.placeholder.com/150"
      };
      cartContents.push(cartItem);
    }

    setLocalStorage("so-cart", cartContents);
    this.flashCartIcon();
  }

  addToWishlist(product) {
    let wishlistContents = getLocalStorage("wishlist") || [];
    const existingProduct = wishlistContents.find(item => item.id === product.Id);

    if (!existingProduct) {
      const wishlistItem = {
        id: product.Id,
        name: product.Name,
        price: product.FinalPrice,
        image: product.Images.PrimaryMedium || "https://via.placeholder.com/150"
      };
      wishlistContents.push(wishlistItem);
      setLocalStorage("wishlist", wishlistContents);
      console.log("Product added to wishlist:", wishlistItem);
    }
  }

  flashCartIcon() {
    const cartIcon = document.querySelector(".cart");
    console.log("Flashing cart icon:", cartIcon);
    if (cartIcon) {
      cartIcon.classList.add("flash");
      setTimeout(() => {
        cartIcon.classList.remove("flash");
      }, 500);
    } else {
      console.error("Cart icon not found.");
    }
  }
}
