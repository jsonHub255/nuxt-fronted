import { useNuxtApp } from '#app';

export function fetchProducts() {
  const { $api } = useNuxtApp();

  return $api.get('/products')
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch products:", error);
      throw error;
    });
}

export function getProductBySku(sku) {
  const { $api } = useNuxtApp();

  return $api.get(`/products/${sku}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to fetch product with SKU: ${sku}`, error);
      throw error;
    });
}

export function createProduct(productData) {
  const { $api } = useNuxtApp();

  return $api.post('/products', productData)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to create product:", error);
      throw error;
    });
}

export function updateProduct(sku, productData) {
  const { $api } = useNuxtApp();

  return $api.put(`/products/${sku}`, productData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to update product with SKU: ${sku}`, error);
      throw error;
    });
}

export function deleteProduct(sku) {
  const { $api } = useNuxtApp();

  return $api.delete(`/products/${sku}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to delete product with SKU: ${sku}`, error);
      throw error;
    });
}
