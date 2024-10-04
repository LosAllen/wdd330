function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category, useApi = false) {
    this.category = category;
    this.useApi = useApi;
    // Set path dynamically depending on whether we are using local files or API
    this.path = useApi ? `/products/search/${this.category}` : `../json/${this.category}.json`;
  }

  // Fetch product data from either the local JSON or API endpoint
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .catch((error) => {
        console.error("Error fetching product data:", error);
        throw error;  // Propagate the error
      });
  }

  // Find a product by its ID (supports both JSON and API-based fetch)
  async findProductById(id) {
    // If using the API, adjust the endpoint to search by product ID
    const path = this.useApi ? `/product/${id}` : this.path;

    const products = await fetch(path)
      .then(convertToJson)
      .catch((error) => {
        console.error("Error finding product by ID:", error);
        throw error;  // Propagate the error
      });

    // If using a JSON file, find product from the array
    if (!this.useApi) {
      return products.find((item) => item.Id === id);
    }
    
    // If using the API, return the single product object directly
    return products;
  }
}
