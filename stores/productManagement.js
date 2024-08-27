import { defineStore } from 'pinia';
import { getProductBySku } from '@/services/productService';

export const useProductManagementStore = defineStore('productManagement', {
  state: () => ({
    products: [],
    currentProduct: null,
  }),
  actions: {
    async fetchProductBySKU(sku) {
      try {
        const product = await getProductBySku(sku);
        this.currentProduct = product;
        return product;
      } catch (error) {
        console.error('Failed to fetch product by SKU:', error);
      }
    },
  },
});
